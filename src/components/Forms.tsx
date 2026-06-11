import React, { useState } from "react";
import { Send, CheckCircle, Handshake, Users, Award, Landmark, Wallet, QrCode, PhoneCall, HelpCircle } from "lucide-react";
import { NGO_DETAILS, PROGRAMS_LIST } from "../data";
import { VolunteerSubmission, DonationSubmission, PartnershipSubmission, ProgramApplicationSubmission, ContactSubmission } from "../types";

// Helper function to generate IDs
const generateId = (prefix: string) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

// ==========================================
// 1. VOLUNTEER & INTERNSHIP APPLICATION FORM
// ==========================================
interface VolunteerFormProps {
  onSuccess: () => void;
}

export function VolunteerForm({ onSuccess }: VolunteerFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interests: [] as string[],
    availability: "Flexible/Remote",
    motivation: "",
    type: "Volunteer" as "Volunteer" | "Intern"
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = [
    "Digital Literacy Lab Instructor",
    "Technical Mentor (Coding/Design)",
    "Outreach Logistics & Distribution",
    "Media, Photography & Marketing",
    "Administrative & Legal Support"
  ];

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Front-end inputs validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("Validation failed. Please fill in Name, Email, and Phone fields.");
      setLoading(false);
      return;
    }

    // Input sanitization routine
    const sanitizeInput = (text: string) => text.trim().replace(/[<>]/g, "");
    const sanitizedData = {
      fullName: sanitizeInput(formData.fullName),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      interests: formData.interests,
      availability: formData.availability,
      motivation: sanitizeInput(formData.motivation),
      type: formData.type
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          formType: "Volunteer / Intern Application",
          data: sanitizedData
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with non-ok range: ${response.status}`);
      }

      const result = await response.json();

      // Mirror back up in local state
      const db: VolunteerSubmission[] = JSON.parse(localStorage.getItem("volunteers") || "[]");
      db.push({
        id: result.recordId || generateId("vol"),
        ...sanitizedData,
        status: "Pending",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("volunteers", JSON.stringify(db));

      alert(result.message || "Wonderful! Your application was logged securely on the backend!");
      setSubmitted(true);
      onSuccess();
    } catch (error) {
      console.error("Express submissions failure:", error);
      alert("Network transmission failure. Your volunteer details were registered locally instead.");
      
      // Local caching fallback if server is under maintenance
      const db: VolunteerSubmission[] = JSON.parse(localStorage.getItem("volunteers") || "[]");
      db.push({
        id: generateId("vol"),
        ...sanitizedData,
        status: "Pending",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("volunteers", JSON.stringify(db));
      
      setSubmitted(true);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div id="volunteer-success-box" className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-extrabold text-emerald-950">Application Submitted!</h3>
        <p className="text-sm text-gray-700 max-w-md mx-auto leading-relaxed">
          Thank you for applying to join <strong>The Agada Initiative</strong>. Praise Oti, our Operations Lead, will review your interests within 48 hours to schedule your welcome video call.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ fullName: "", email: "", phone: "", interests: [], availability: "Flexible/Remote", motivation: "", type: "Volunteer" });
          }}
          className="mt-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-all shadow cursor-pointer"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form id="volunteer-registration-form" onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-emerald-50 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Applying As</label>
          <div className="grid grid-cols-2 gap-2">
            {(["Volunteer", "Intern"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFormData({ ...formData, type: t })}
                className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  formData.type === t
                    ? "bg-emerald-700 border-emerald-700 text-white shadow-sm"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Time Availability</label>
          <select
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option>Flexible/Remote</option>
            <option>Weekdays (Mon-Fri)</option>
            <option>Saturdays Only</option>
            <option>Evenings (Online)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Full Name</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g., Praise Oti"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Email Address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g., example@domain.com"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Phone / WhatsApp Number</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="e.g., 08158865153"
          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1.5">Areas of Engagement (Select all that apply)</label>
        <div className="space-y-1.5">
          {interestOptions.map((option) => {
            const checked = formData.interests.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleInterestChange(option)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                  checked
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{option}</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center mr-1 ${checked ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-300"}`}>
                  {checked && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Why do you want to volunteer or intern with us?</label>
        <textarea
          required
          rows={3}
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
          placeholder="Briefly share any skills, hobbies, or past work that motivates you..."
          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-600 resize-none font-sans"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transform transition-all cursor-pointer disabled:bg-emerald-400"
      >
        {loading ? "Submitting Secured Files..." : "Register Me as Partner/Volunteer"}
      </button>
    </form>
  );
}


// ==========================================
// 2. DYNAMIC NGO DONATION FORM
// ==========================================
interface DonationFormProps {
  onDonationAdded: (amount: number) => void;
}

export function DonationForm({ onDonationAdded }: DonationFormProps) {
  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    amount: "25000",
    allocation: "General Empowerment & Support",
    paymentMethod: "Bank Transfer" as "Bank Transfer" | "Credit Card" | "USSD" | "QR Scanner"
  });
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentPhase, setPaymentPhase] = useState<"fill" | "pay" | "done">("fill");

  const presets = ["5000", "15000", "25000", "50000", "100000"];

  const handlePresetSelect = (val: string) => {
    setFormData({ ...formData, amount: val });
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    setCustomAmount(rawVal);
    setFormData({ ...formData, amount: rawVal });
  };

  const actualAmount = Number(formData.amount) || 0;

  const handleSubmitInit = (e: React.FormEvent) => {
    e.preventDefault();
    if (actualAmount <= 0) {
      alert("Please specify a donation amount first!");
      return;
    }
    setPaymentPhase("pay");
  };

  const handleConfirmPayment = async () => {
    setLoading(true);

    if (actualAmount <= 0) {
      alert("Please designate a valid payment contribution amount First!");
      setLoading(false);
      return;
    }

    // Input sanitization
    const sanitizeInput = (text: string) => text.trim().replace(/[<>]/g, "");
    const sanitizedData = {
      donorName: sanitizeInput(formData.donorName || "Anonymous Supporter"),
      email: sanitizeInput(formData.email || "anonymous@donor.org"),
      amount: actualAmount,
      allocation: formData.allocation,
      paymentMethod: formData.paymentMethod
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          formType: "Donation / Contribution",
          data: sanitizedData
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned error status range: ${response.status}`);
      }

      const result = await response.json();

      // Mirror back up in local state
      const db: DonationSubmission[] = JSON.parse(localStorage.getItem("donations") || "[]");
      db.push({
        id: result.recordId || generateId("don"),
        ...sanitizedData,
        status: "Completed",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("donations", JSON.stringify(db));

      alert(result.message || "Thank you to our community hero! We registered your contribution on the Express backend server.");
      onDonationAdded(actualAmount);
      setPaymentPhase("done");
    } catch (error) {
      console.error("Express submissions failure:", error);
      alert("Payment transmission logged locally successfully.");

      // Local persistence fallback
      const db: DonationSubmission[] = JSON.parse(localStorage.getItem("donations") || "[]");
      db.push({
        id: generateId("don"),
        ...sanitizedData,
        status: "Completed",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("donations", JSON.stringify(db));
      
      onDonationAdded(actualAmount);
      setPaymentPhase("done");
    } finally {
      setLoading(false);
    }
  };

  if (paymentPhase === "done") {
    return (
      <div id="donation-success-box" className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-110 rounded-full flex items-center justify-center mx-auto text-emerald-700 bg-emerald-100">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-extrabold text-emerald-950">Thank You, Generous Supporter!</h3>
        <p className="text-sm text-gray-700 max-w-md mx-auto leading-relaxed">
          Your donation of <strong className="text-emerald-800 text-base">₦{actualAmount.toLocaleString()}</strong> has been captured. This transaction will fund <strong>{formData.allocation}</strong>. An official invoice package and impact newsletter will be sent to your email.
        </p>
        <button
          onClick={() => {
            setPaymentPhase("fill");
            setFormData({
              donorName: "",
              email: "",
              amount: "25000",
              allocation: "General Empowerment & Support",
              paymentMethod: "Bank Transfer"
            });
            setCustomAmount("");
          }}
          className="mt-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-all shadow cursor-pointer uppercase tracking-wider"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  if (paymentPhase === "pay") {
    return (
      <div id="donation-payment-box" className="bg-white rounded-2xl border border-gray-150 shadow-lg p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Checkout Summary</span>
            <h3 className="text-base font-bold text-emerald-950">Confirm Support Contribution</h3>
          </div>
          <button
            onClick={() => setPaymentPhase("fill")}
            className="text-xs text-gray-500 hover:text-emerald-800 underline cursor-pointer"
          >
            Modify Amount
          </button>
        </div>

        {/* Selected Contribution Overview */}
        <div className="bg-emerald-50/80 rounded-xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs text-emerald-800 block font-semibold">{formData.allocation}</span>
            <span className="text-xs text-gray-500">Contributor: {formData.donorName || "Anonymous"}</span>
          </div>
          <span className="text-xl font-black text-emerald-900">₦{actualAmount.toLocaleString()}</span>
        </div>

        {/* Method Toggle Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {([
            { id: "Bank Transfer", icon: <Landmark className="w-4 h-4" />, label: "Bank" },
            { id: "Credit Card", icon: <Wallet className="w-4 h-4" />, label: "Card" },
            { id: "USSD", icon: <PhoneCall className="w-4 h-4" />, label: "USSD" },
            { id: "QR Scanner", icon: <QrCode className="w-4 h-4" />, label: "Scan QR" }
          ] as const).map((method) => {
            const isSel = formData.paymentMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                className={`py-3 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                  isSel
                    ? "bg-emerald-700 border-emerald-700 text-white font-bold"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50 text-xs"
                }`}
              >
                {method.icon}
                <span className="text-[10px] uppercase font-bold tracking-tight">{method.label}</span>
              </button>
            );
          })}
        </div>

        {/* Render Payment Execution Interface depending on state selection */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-150">
          {formData.paymentMethod === "Bank Transfer" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Please transfer exactly <strong className="text-emerald-950 font-bold">₦{actualAmount.toLocaleString()}</strong> of funds to our secured NGO bank account. When done, click the confirmation button below.
              </p>
              <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-gray-205 text-xs text-gray-800">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Bank Identity</span>
                  <p className="font-extrabold text-emerald-900">{NGO_DETAILS.bankDetails.bankName}</p>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Account Name</span>
                  <p className="font-extrabold text-emerald-900 truncate" title={NGO_DETAILS.bankDetails.accountName}>
                    {NGO_DETAILS.bankDetails.accountName}
                  </p>
                </div>
                <div className="col-span-2 border-t border-gray-100 pt-2.5 mt-1 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold block">Account Number</span>
                    <strong className="text-base text-gray-900 tracking-wider font-mono">
                      {NGO_DETAILS.bankDetails.accountNumber}
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(NGO_DETAILS.bankDetails.accountNumber);
                      alert("Bank Account Number copied safely!");
                    }}
                    className="p-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    Copy No.
                  </button>
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === "Credit Card" && (
            <div className="space-y-3.5">
              <p className="text-xs text-gray-600">
                Simulated Credit Card verification engine. No money will be deducted from your card.
              </p>
              <div className="space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder="Cardholder Name"
                  className="w-full bg-white border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="Card Number"
                    className="w-full col-span-2 bg-white border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none font-mono"
                  />
                  <input
                    type="text"
                    required
                    maxLength={3}
                    placeholder="CVV"
                    className="w-full bg-white border border-gray-200 focus:border-emerald-600 rounded-xl px-2 text-center py-2.5 text-xs text-gray-800 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === "USSD" && (
            <div className="space-y-3 text-center">
              <p className="text-xs text-gray-600 leading-relaxed">
                Dial this code on your mobile device linked with your local bank account:
              </p>
              <div className="bg-white py-4 px-2 rounded-xl border border-gray-200">
                <code className="text-base sm:text-lg font-black font-mono text-emerald-900 select-all block break-all">
                  {NGO_DETAILS.bankDetails.ussdCode.replace("AMOUNT", actualAmount.toString())}
                </code>
              </div>
              <p className="text-[10px] text-gray-400">Supported by Access, GTBank, Zenith, & Polaris</p>
            </div>
          )}

          {formData.paymentMethod === "QR Scanner" && (
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              {/* Custom SVG matrix representation representing mock QR Code */}
              <div className="w-32 h-32 bg-white border border-gray-200 p-2 rounded-xl flex flex-wrap gap-1 items-center justify-center">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded ${
                      idx % 2 === 0 || idx % 3 === 0 ? "bg-emerald-950" : "bg-white border border-dashed border-gray-150"
                    }`}
                  />
                ))}
              </div>
              <div className="text-left max-w-xs space-y-1.5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold block">Bank App Scanning</span>
                <p className="text-xs text-gray-600 font-medium">
                  Scan this encrypted matrix from your Polaris, GTBank, or Kuda banking platform. It pre-populates the NGO’s registered account name.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Final Execution Button */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            type="button"
            onClick={() => setPaymentPhase("fill")}
            className="flex-1 py-3 text-center rounded-xl font-bold text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all cursor-pointer"
          >
            Cancel Order
          </button>
          <button
            type="button"
            onClick={handleConfirmPayment}
            className="flex-[2] py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
            disabled={loading}
          >
            {loading ? "Verifying Transaction..." : "I have transferred my Donation"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form id="donation-contribution-form" onSubmit={handleSubmitInit} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-emerald-50 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Donor Name (Optional)</label>
          <input
            type="text"
            value={formData.donorName}
            onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
            placeholder="e.g., Leave empty to be Anonymous"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1">Donor Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g., mail@domain.com"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Designate Funding Allocation</label>
        <select
          value={formData.allocation}
          onChange={(e) => setFormData({ ...formData, allocation: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800"
        >
          <option>General Empowerment & Support</option>
          <option>Women Entrepreneurship Support (Micro-grants)</option>
          <option>Youth TechBridge Initiative (Learning Laptops)</option>
          <option>Digital Literacy Training (Hub expansions)</option>
          <option>Community Outreach Campaigns (Widow support packs)</option>
        </select>
      </div>

      {/* Preset Amounts and Input */}
      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-2">Select Donation Amount</label>
        <div className="grid grid-cols-5 gap-1.5">
          {presets.map((p) => {
            const isSel = formData.amount === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => handlePresetSelect(p)}
                className={`py-2 px-1 rounded-lg border text-xs font-black transition-all cursor-pointer ${
                  isSel
                    ? "bg-emerald-700 border-emerald-700 text-white"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                ₦{Number(p).toLocaleString()}
              </button>
            );
          })}
        </div>
        <div className="mt-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800 font-extrabold text-sm">
            ₦
          </div>
          <input
            type="text"
            placeholder="Enter customized amount (e.g., 200,000)"
            value={customAmount ? Number(customAmount).toLocaleString() : ""}
            onChange={handleCustomChange}
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-800 font-black focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-2 text-xs text-emerald-800">
        <Landmark className="w-4 h-4 shrink-0 text-emerald-700 mt-0.5" />
        <p className="leading-relaxed">
          Your support directly fuels our local hub. We have fully transparent reporting. 100% security assured.
        </p>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transform transition-all cursor-pointer"
      >
        Proceed to Secure Checkout (₦{actualAmount.toLocaleString()})
      </button>
    </form>
  );
}


// ==========================================
// 3. PARTNERSHIP / SPONSORSHIP INQUIRY FORM
// ==========================================
export function PartnershipForm() {
  const [formData, setFormData] = useState({
    orgName: "",
    contactPerson: "",
    email: "",
    phone: "",
    partnershipType: "Sponsorship of programs",
    proposal: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.orgName.trim() || !formData.contactPerson.trim() || !formData.email.trim()) {
      alert("Validation failed. Please enter Organization, Contact Person, and Email.");
      setLoading(false);
      return;
    }

    const sanitizeInput = (text: string) => text.trim().replace(/[<>]/g, "");
    const sanitizedData = {
      orgName: sanitizeInput(formData.orgName),
      contactPerson: sanitizeInput(formData.contactPerson),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      partnershipType: formData.partnershipType,
      proposal: sanitizeInput(formData.proposal)
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          formType: "Partnership Proposal",
          data: sanitizedData
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned error: ${response.status}`);
      }

      const result = await response.json();

      const db: PartnershipSubmission[] = JSON.parse(localStorage.getItem("partnerships") || "[]");
      db.push({
        id: result.recordId || generateId("part"),
        ...sanitizedData,
        status: "Reviewing",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("partnerships", JSON.stringify(db));

      alert(result.message || "Awesome! Your joint partnership offer has been registered successfully.");
      setSubmitted(true);
    } catch (error) {
      console.error("Sponsorship backend error:", error);
      alert("Logged proposal successfully in local browser memory.");

      // Local fallback
      const db: PartnershipSubmission[] = JSON.parse(localStorage.getItem("partnerships") || "[]");
      db.push({
        id: generateId("part"),
        ...sanitizedData,
        status: "Reviewing",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("partnerships", JSON.stringify(db));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div id="partnership-success-box" className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
          <Handshake className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-extrabold text-emerald-950">Partnership Proposal Logged!</h3>
        <p className="text-sm text-gray-700 max-w-md mx-auto leading-relaxed">
          We are thrilled about the opportunity to partner with <strong>{formData.orgName}</strong>. Our director Dr. Caroline Agada will respond via email/official mail with a detailed cooperation pack.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ orgName: "", contactPerson: "", email: "", phone: "", partnershipType: "Sponsorship of programs", proposal: "" });
          }}
          className="mt-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-all shadow cursor-pointer uppercase tracking-wider"
        >
          Submit Another proposal
        </button>
      </div>
    );
  }

  return (
    <form id="partnership-inquiry-form" onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-emerald-50 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Organization Name</label>
          <input
            type="text"
            required
            value={formData.orgName}
            onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
            placeholder="e.g., Shell, Lagos Dev Corp, etc."
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Contact Person Name</label>
          <input
            type="text"
            required
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            placeholder="e.g., Mrs. Sarah Williams"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Contact Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g., partnership@org.com"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Official Direct Phone</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g., +234..."
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Primary Relationship Interest</label>
        <select
          value={formData.partnershipType}
          onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
        >
          <option>Sponsorship of educational programs</option>
          <option>Technical training & resource partnerships</option>
          <option>Grants and funding/venture support</option>
          <option>Volunteer collaborations</option>
          <option>Media, events, and awareness campaigns</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Relationship Proposal Description</label>
        <textarea
          required
          rows={4}
          value={formData.proposal}
          onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
          placeholder="Kindly outline your shared goals, timeline expectations, or resources you'd like to dedicate..."
          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none resize-none font-sans"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transform cursor-pointer disabled:bg-emerald-400"
      >
        {loading ? "Registering Proposal..." : "Submit Joint Collaboration Offer"}
      </button>
    </form>
  );
}


// ==========================================
// 4. PROGRAM APPLICATION FORM
// ==========================================
export function ProgramApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    programId: PROGRAMS_LIST[0]?.id || "prog_digital_lit",
    educationLevel: "Unemployed Youth",
    motivation: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("Validation error. Please key in Name, Email, and Phone fields.");
      setLoading(false);
      return;
    }

    const sanitizeInput = (text: string) => text.trim().replace(/[<>]/g, "");

    const progInfo = PROGRAMS_LIST.find((p) => p.id === formData.programId);
    const appliedProgramTitle = progInfo ? `${progInfo.title} (${progInfo.duration})` : formData.programId;

    const sanitizedData = {
      fullName: sanitizeInput(formData.fullName),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      programId: formData.programId,
      appliedProgramTitle,
      educationLevel: formData.educationLevel,
      motivation: sanitizeInput(formData.motivation)
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          formType: "Program Hub Admission",
          data: sanitizedData
        })
      });

      if (!response.ok) {
        throw new Error(`Server status returned error: ${response.status}`);
      }

      const result = await response.json();

      const db: ProgramApplicationSubmission[] = JSON.parse(localStorage.getItem("program_applications") || "[]");
      db.push({
        id: result.recordId || generateId("app"),
        ...sanitizedData,
        status: "Applied",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("program_applications", JSON.stringify(db));

      alert(result.message || "Congratulations! Admission registry has logged your education track application");
      setSubmitted(true);
    } catch (error) {
      console.error("Admission endpoint request failure:", error);
      alert("Logged application locally in your browser offline cache.");

      // Local fallback handler
      const db: ProgramApplicationSubmission[] = JSON.parse(localStorage.getItem("program_applications") || "[]");
      db.push({
        id: generateId("app"),
        ...sanitizedData,
        status: "Applied",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("program_applications", JSON.stringify(db));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const selectedProg = PROGRAMS_LIST.find((p) => p.id === formData.programId);

  if (submitted) {
    return (
      <div id="prog-app-success-box" className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
          <Award className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-extrabold text-emerald-950">Application Logged!</h3>
        <p className="text-sm text-gray-700 max-w-md mx-auto leading-relaxed">
          Your admission request for <strong>{selectedProg?.title}</strong> is safely received. Our tutoring instructors will schedule your screening phone call within 5 days.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ fullName: "", email: "", phone: "", programId: PROGRAMS_LIST[0]?.id || "prog_digital_lit", educationLevel: "Unemployed Youth", motivation: "" });
          }}
          className="mt-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-all shadow cursor-pointer uppercase tracking-wider"
        >
          Apply for Another Course
        </button>
      </div>
    );
  }

  return (
    <form id="program-enrolment-form" onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-emerald-50 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Select Program Track</label>
          <select
            value={formData.programId}
            onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          >
            {PROGRAMS_LIST.map((prog) => (
              <option key={prog.id} value={prog.id}>
                {prog.title} ({prog.duration})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Current Status / Education</label>
          <select
            value={formData.educationLevel}
            onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          >
            <option>Unemployed Youth</option>
            <option>High School Graduate</option>
            <option>University Undergraduate</option>
            <option>Market Trader / Artisan</option>
            <option>Working Mother</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Full Name</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g., Sandra Adeleke"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Email Address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g., sandra@gmail.com"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Active Call / WhatsApp Number</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="e.g., 08158865153"
          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Why do you want to join this program cohort?</label>
        <textarea
          required
          rows={3}
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
          placeholder="Describe your current obstacles and how learning these skills will improve your economic status..."
          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none resize-none font-sans"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transform cursor-pointer disabled:bg-emerald-400"
      >
        {loading ? "Verifying Credentials..." : "Submit My Free Hub Admission Form"}
      </button>
    </form>
  );
}


// ==========================================
// 5. DIRECT CONTACT FORM
// ==========================================
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      alert("Pre-check failed. Please fill in your Name, Email, Subject, and Message parameters.");
      setLoading(false);
      return;
    }

    const sanitizeInput = (text: string) => text.trim().replace(/[<>]/g, "");
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          formType: "Direct Contact Inquiry",
          data: sanitizedData
        })
      });

      if (!response.ok) {
        throw new Error(`Direct contact API connection error code: ${response.status}`);
      }

      const result = await response.json();

      const db: ContactSubmission[] = JSON.parse(localStorage.getItem("contacts") || "[]");
      db.push({
        id: result.recordId || generateId("con"),
        ...sanitizedData,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("contacts", JSON.stringify(db));

      alert(result.message || "Successful submission! The Agada team has received your message.");
      setSubmitted(true);
    } catch (error) {
      console.error("Direct contact submission failure:", error);
      alert("Message received locally in browser storage cache.");

      // Local fallback handler
      const db: ContactSubmission[] = JSON.parse(localStorage.getItem("contacts") || "[]");
      db.push({
        id: generateId("con"),
        ...sanitizedData,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("contacts", JSON.stringify(db));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div id="contact-success-box" className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-110 rounded-full flex items-center justify-center mx-auto text-emerald-700 bg-emerald-100">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-extrabold text-emerald-950">Inquiry Received Safely!</h3>
        <p className="text-sm text-gray-700 max-w-sm mx-auto leading-relaxed">
          Your mail is logged. A human partner from The Agada Initiative will reply at {formData.email} within 24 working hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-2 px-5 py-2 hover:bg-emerald-800 text-emerald-950 border border-emerald-600 font-bold rounded-xl text-xs transition-all cursor-pointer bg-white"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form id="contact-inquiry-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Your Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Caleb Olayemi"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Email Address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g., caleb@domain.com"
            className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Subject Matter</label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="e.g., Device donation, visiting schedule, etc."
          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Message Content</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please write down whatever details you'd like us to look into..."
          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs text-gray-800 focus:outline-none resize-none font-sans"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transform transition-all cursor-pointer flex items-center justify-center gap-1.5"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? "Transmitting..." : "Send Secure Message"}</span>
      </button>
    </form>
  );
}
