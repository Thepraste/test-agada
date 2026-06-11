/**
 * Agada Initiative - Full-Stack Express Server with Vite Integration
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to resolve client paths in build production stage
const rootDir = process.cwd();
const dataDir = path.join(rootDir, "src", "data");
const dbFilePath = path.join(dataDir, "submissions.json");

// Verify data directory & empty dataset exist for local development tracking
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, JSON.stringify({
    volunteers: [],
    donations: [],
    partnerships: [],
    program_applications: [],
    contacts: [],
    newsletters: []
  }, null, 2), "utf-8");
}

// -----------------------------------------------------------------
// FIREBASE FIRESTORE SYNC & PERSISTENCE MANAGEMENT ENGINE
// -----------------------------------------------------------------
enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: "Server-Agent",
      email: "praiseoti3@gmail.com",
      emailVerified: true,
      isAnonymous: false
    },
    operationType,
    path
  };
  console.error("[Firebase] Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let db: any = null;
try {
  const configPath = path.join(rootDir, "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    const firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    console.log(`[Firebase] Initialized connection successfully! Database ID: ${firebaseConfig.firestoreDatabaseId}`);
  } else {
    console.warn("[Firebase] Warning: firebase-applet-config.json was not found at root.");
  }
} catch (error) {
  console.error("[Firebase] Fatal initialization exception:", error);
}

// Write helper for cloud sync writes
async function saveToFirestore(collectionPath: string, docId: string, record: any) {
  if (!db) {
    console.warn(`[Firebase] Cloud offline - skipping Firestore write for '${collectionPath}/${docId}'`);
    return;
  }
  try {
    const docRef = doc(db, collectionPath, docId);
    await setDoc(docRef, record);
    console.log(`[Firebase] Successfully mirrored '${collectionPath}/${docId}' into cloud Firestore.`);
  } catch (error: any) {
    handleFirestoreError(error, OperationType.WRITE, `${collectionPath}/${docId}`);
  }
}

// Read helper for cloud sync batch queries
async function fetchFromFirestore(collectionPath: string): Promise<any[]> {
  if (!db) return [];
  try {
    const colRef = collection(db, collectionPath);
    const snap = await getDocs(colRef);
    const results: any[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data());
    });
    // Sort by createdAt descending
    results.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    return results;
  } catch (error: any) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
    return [];
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse standard requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ==========================================
  // 1. BACKEND ROUTE: READ SYSTEM DATABASE (ADMIN USE)
  // ==========================================
  app.get("/api/admin/submissions", async (req, res) => {
    try {
      // 1. Core local storage fallback file backup reading
      let localDB: any = {
        volunteers: [],
        donations: [],
        partnerships: [],
        program_applications: [],
        contacts: [],
        newsletters: []
      };
      if (fs.existsSync(dbFilePath)) {
        try {
          const rawData = fs.readFileSync(dbFilePath, "utf-8");
          localDB = JSON.parse(rawData);
        } catch (e) {
          console.error("Local submissions.json read exception:", e);
        }
      }

      // 2. Fetch live data from Firestore cloud database (if initialized)
      if (db) {
        console.log("[Firebase] Refreshing and synchronizing cloud collections with Express admin panel...");
        const [volunteers, donations, partnerships, program_applications, contacts, newsletters] = await Promise.all([
          fetchFromFirestore("volunteers").catch(() => []),
          fetchFromFirestore("donations").catch(() => []),
          fetchFromFirestore("partnerships").catch(() => []),
          fetchFromFirestore("program_applications").catch(() => []),
          fetchFromFirestore("contacts").catch(() => []),
          fetchFromFirestore("newsletters").catch(() => [])
        ]);

        // Helper to combine lists, deduping by submission unique ID reference
        const mergeLists = (localList: any[], cloudList: any[]) => {
          const map = new Map();
          (localList || []).forEach(item => {
            if (item && item.id) map.set(item.id, item);
          });
          (cloudList || []).forEach(item => {
            if (item && item.id) map.set(item.id, item);
          });
          return Array.from(map.values()).sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
        };

        const mergeNewsletters = (localList: any[], cloudList: any[]) => {
          const map = new Map();
          (localList || []).forEach(item => {
            const m = item && (item.email || item.subscriberEmail);
            if (m) map.set(m, item);
          });
          (cloudList || []).forEach(item => {
            const m = item && (item.email || item.subscriberEmail);
            if (m) map.set(m, item);
          });
          return Array.from(map.values()).sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
        };

        const merged = {
          volunteers: mergeLists(localDB.volunteers, volunteers),
          donations: mergeLists(localDB.donations, donations),
          partnerships: mergeLists(localDB.partnerships, partnerships),
          program_applications: mergeLists(localDB.program_applications, program_applications),
          contacts: mergeLists(localDB.contacts, contacts),
          newsletters: mergeNewsletters(localDB.newsletters, newsletters)
        };

        // Cache the merged database back to submissions.json so both models are in high-fidelity harmony
        try {
          fs.writeFileSync(dbFilePath, JSON.stringify(merged, null, 2), "utf-8");
        } catch (e) {
          console.error("Local DB sync update execution failed:", e);
        }

        return res.json(merged);
      }

      res.json(localDB);
    } catch (error: any) {
      console.error("Error reading admin submissions DB:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // ==========================================
  // 2. BACKEND ROUTE: CLEAR SYSTEM DATABASE
  // ==========================================
  app.post("/api/admin/reset", (req, res) => {
    try {
      const emptyState = {
        volunteers: [],
        donations: [],
        partnerships: [],
        program_applications: [],
        contacts: [],
        newsletters: []
      };
      fs.writeFileSync(dbFilePath, JSON.stringify(emptyState, null, 2), "utf-8");
      res.json({ success: true, message: "Database wiped master reset completed." });
    } catch (error: any) {
      console.error("Error resetting database:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // ==========================================
  // 3. BACKEND ROUTE: STANDARDIZED API STRUCTURE FOR FORM SUBMISSIONS
  // ==========================================
  app.post("/api/contact", async (req, res) => {
    const { formType, data } = req.body;

    // A. Input Validation and Sanitization
    if (!formType || !data) {
      return res.status(400).json({
        success: false,
        message: "Bad Request. Required form data payload is missing."
      });
    }

    // Basic sanitization routine (escapes < > " ' & to protect against XSS injections)
    const sanitize = (val: any): any => {
      if (typeof val === "string") {
        return val
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;");
      }
      if (Array.isArray(val)) {
        return val.map(sanitize);
      }
      return val;
    };

    const sanitizedData: Record<string, any> = {};
    for (const [key, val] of Object.entries(data)) {
      sanitizedData[key] = sanitize(val);
    }

    // Assign standard unique identifier if missing
    if (!sanitizedData.id) {
      sanitizedData.id = `${formType.toLowerCase().substring(0, 3)}_${Math.random().toString(36).substring(2, 11)}`;
    }
    if (!sanitizedData.createdAt) {
      sanitizedData.createdAt = new Date().toISOString();
    }
    if (!sanitizedData.status && formType !== "Newsletter Subscriber" && formType !== "Donation") {
      sanitizedData.status = "Pending";
    }

    // B. Server-Side Storage State Synchronization & Cloud Firestore Mirroring
    try {
      const rawDB = fs.readFileSync(dbFilePath, "utf-8");
      const localDB = JSON.parse(rawDB);

      // Determine Firestore collection path and newsletter keys
      let collectionPath = "";
      if (formType === "Volunteer / Intern Application") {
        localDB.volunteers.push(sanitizedData);
        collectionPath = "volunteers";
      } else if (formType === "Donation / Contribution") {
        localDB.donations.push(sanitizedData);
        collectionPath = "donations";
      } else if (formType === "Partnership Proposal") {
        localDB.partnerships.push(sanitizedData);
        collectionPath = "partnerships";
      } else if (formType === "Program Hub Admission") {
        localDB.program_applications.push(sanitizedData);
        collectionPath = "program_applications";
      } else if (formType === "Direct Contact Inquiry") {
        localDB.contacts.push(sanitizedData);
        collectionPath = "contacts";
      } else if (formType === "Weekly Newsletter Subscription") {
        localDB.newsletters.push(sanitizedData);
        collectionPath = "newsletters";
        const emailVal = sanitizedData.email || sanitizedData.subscriberEmail;
        if (!sanitizedData.id && emailVal) {
          sanitizedData.id = emailVal;
        }
      }

      fs.writeFileSync(dbFilePath, JSON.stringify(localDB, null, 2), "utf-8");
      console.log(`[Local Sync] Saved record to local fallback file for form type: ${formType}`);

      // Perform background async Firestore cloud synchronization
      if (collectionPath) {
        const documentId = sanitizedData.id;
        saveToFirestore(collectionPath, documentId, sanitizedData)
          .then(() => {
            console.log(`[Firebase Sync] Successfully logged '${formType}' record under document ID: ${documentId}`);
          })
          .catch((fsErr) => {
            console.error(`[Firebase Sync] Cloud error for ${formType}:`, fsErr);
          });
      }
    } catch (err) {
      console.error("Failed to commit submission to database storage:", err);
    }

    // C. Mail Dispatching to Operations Lead: praiseoti3@gmail.com
    const recipientEmail = "praiseoti3@gmail.com";
    const subjectLine = `[Agada Initiative] New ${formType} Submission`;

    // Construct highly legible HTML Body
    let emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>${subjectLine}</title>
          <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
              .wrapper { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
              .header { background-color: #065f46; color: #ffffff; padding: 28px 24px; text-align: center; }
              .header h2 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.025em; }
              .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
              .body { padding: 32px 24px; }
              .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              .table th, .table td { text-align: left; padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }
              .table th { width: 35%; font-weight: 600; color: #4b5563; background-color: #f9fafb; }
              .table td { color: #1f2937; word-break: break-all; }
              .meta-badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: bold; border-radius: 6px; background-color: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
              .footer { background-color: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #f1f5f9; }
              .footer p { margin: 4px 0; }
          </style>
      </head>
      <body>
          <div class="wrapper">
              <div class="header">
                  <h2>Agada Initiative Dispatch</h2>
                  <p>Production Secure Form System Notification</p>
              </div>
              <div class="body">
                  <p style="font-size: 15px; margin-top: 0; line-height: 1.5; color: #374151;">
                    A brand new verified student, partner, or community record has been submitted on the platform. The complete details are structured below:
                  </p>
                  <table class="table">
                      <tr>
                          <th>Category Type</th>
                          <td><span class="meta-badge">${formType}</span></td>
                      </tr>
                      <tr>
                          <th>Record ID Reference</th>
                          <td style="font-family: monospace; font-size: 12px; color: #4b5563;">${sanitizedData.id}</td>
                      </tr>
                      <tr>
                          <th>Server Record Stamp</th>
                          <td>${new Date(sanitizedData.createdAt).toLocaleString("en-US", { timeZone: "UTC" })} UTC</td>
                      </tr>
    `;

    // Append table representation of user inputs
    for (const [key, value] of Object.entries(sanitizedData)) {
      if (key === "id" || key === "createdAt" || key === "status") continue;

      const userFriendlyLabel = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/_/g, " ");

      let displayValue = "";
      if (Array.isArray(value)) {
        displayValue = value.join(", ");
      } else if (typeof value === "object" && value !== null) {
        displayValue = JSON.stringify(value);
      } else if (typeof value === "number" && key.toLowerCase().includes("amount")) {
        displayValue = `₦${value.toLocaleString()}`;
      } else {
        displayValue = String(value);
      }

      emailHtml += `
                      <tr>
                          <th>${userFriendlyLabel}</th>
                          <td>${displayValue.replace(/\n/g, "<br>")}</td>
                      </tr>
      `;
    }

    emailHtml += `
                  </table>
              </div>
              <div class="footer">
                  <p>This email was dispatched securely via Node.js Express SMTP client.</p>
                  <p>&copy; ${new Date().getFullYear()} The Agada Initiative. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    // Initialize Mailer configuration with strict quote-stripping and trimming
    const stripQuotes = (str: string) => {
      let s = str.trim();
      if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
        s = s.substring(1, s.length - 1).trim();
      }
      return s;
    };

    const host = stripQuotes(process.env.SMTP_HOST || "");
    const portStr = stripQuotes(process.env.SMTP_PORT || "587");
    const port = parseInt(portStr, 10);
    const user = stripQuotes(process.env.SMTP_USER || "");
    
    // Clean and normalize password
    let pass = stripQuotes(process.env.SMTP_PASS || "");
    if (pass.replace(/\s+/g, "").length === 16) {
      pass = pass.replace(/\s+/g, "");
    }
    
    const sender = stripQuotes(process.env.SMTP_SENDER || "noreply@agada-initiative.org");

    const hasSmtpConfig = !!(host && user && pass);
    let emailStatus = { sent: false, method: hasSmtpConfig ? "SMTP" : "Local Log (No Config)", error: null as string | null };

    if (hasSmtpConfig) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
          timeout: 10000 // 10 second timeout
        } as any);

        await transporter.sendMail({
          from: `"The Agada Initiative Platform" <${sender}>`,
          to: recipientEmail,
          subject: subjectLine,
          html: emailHtml
        });
        console.log(`[SMTP Mailer Success] Dispatched submission to ${recipientEmail}`);
        emailStatus.sent = true;
      } catch (mailError: any) {
        const passLen = (process.env.SMTP_PASS || "").length;
        const processedPassLen = pass.length;

        // Custom safe masking function for client notification
        const maskStr = (str: string, isPassword = false) => {
          if (!str) return "[empty]";
          if (isPassword) {
            if (str.length <= 4) return "*".repeat(str.length);
            return str.substring(0, 2) + "*".repeat(str.length - 4) + str.substring(str.length - 2);
          } else {
            const parts = str.split("@");
            if (parts.length === 2) {
              const name = parts[0];
              const domain = parts[1];
              const mName = name.length <= 2 ? name[0] + "*" : name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
              return `${mName}@${domain}`;
            }
            if (str.length <= 4) return "*".repeat(str.length);
            return str.substring(0, 2) + "*".repeat(str.length - 4) + str.substring(str.length - 2);
          }
        };

        const maskedUser = maskStr(user, false);
        const maskedPass = maskStr(pass, true);

        const debugMsg = `${mailError.message} (Host: '${host}', Port: ${port}, User: '${maskedUser}', Pass: '${maskedPass}', Raw Pass Len: ${passLen}, Cleaned Pass Len: ${processedPassLen})`;
        console.error("[SMTP Mailer Error] " + debugMsg);
        emailStatus.error = debugMsg;
      }
    } else {
      console.log(`\n=======================================================`);
      console.log(`[SMTP MAIL DISPATCH LOGGER - NO SMTP CREDENTIALS PROVIDED]`);
      console.log(`To: ${recipientEmail}`);
      console.log(`Subject: ${subjectLine}`);
      console.log(`Fields:`, sanitizedData);
      console.log(`=======================================================\n`);
      emailStatus.error = "No SMTP credentials set up in .env yet.";
    }

    // D. Respond back standard format with SMTP statuses
    if (emailStatus.sent) {
      return res.status(200).json({
        success: true,
        message: `Excellent! Your details have been saved, and praiseoti3@gmail.com was notified successfully via email.`,
        recordId: sanitizedData.id,
        emailStatus
      });
    } else {
      return res.status(200).json({
        success: true,
        message: `Your details were saved successfully, but there was an email dispatch issue: ${emailStatus.error || "Unconfigured SMTP credentials."}`,
        recordId: sanitizedData.id,
        emailStatus
      });
    }
  });

  // ==========================================
  // 4. FRONTEND SERVING (VITE / STATIC ASSETS)
  // ==========================================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT, host: "0.0.0.0" },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Agada Full-Stack Server] running on http://localhost:${PORT}`);
  });
}

startServer();
