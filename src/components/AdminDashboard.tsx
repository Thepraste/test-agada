import React, { useState, useEffect } from "react";
import { Users, Landmark, FileText, Mail, Settings, RefreshCw, Trash2, ShieldCheck, Heart, User } from "lucide-react";
import { VolunteerSubmission, DonationSubmission, PartnershipSubmission, ProgramApplicationSubmission, ContactSubmission } from "../types";

interface AdminDashboardProps {
  onRefreshStats: () => void;
}

export default function AdminDashboard({ onRefreshStats }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"volunteers" | "donations" | "programs" | "partners" | "contacts">("volunteers");
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([]);
  const [donations, setDonations] = useState<DonationSubmission[]>([]);
  const [programApplications, setProgramApplications] = useState<ProgramApplicationSubmission[]>([]);
  const [partners, setPartners] = useState<PartnershipSubmission[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [newsletters, setNewsletters] = useState<{ email: string; createdAt: string }[]>([]);

  // Function to load all lists from server, falling back silently to localStorage
  const loadDatabase = async () => {
    try {
      const response = await fetch("/api/admin/submissions");
      if (response.ok) {
        const db = await response.json();
        setVolunteers(db.volunteers || []);
        setDonations(db.donations || []);
        setProgramApplications(db.program_applications || []);
        setPartners(db.partnerships || []);
        setContacts(db.contacts || []);
        setNewsletters(db.newsletters || []);

        // Keep browser localStorage synchronized with backend state
        localStorage.setItem("volunteers", JSON.stringify(db.volunteers || []));
        localStorage.setItem("donations", JSON.stringify(db.donations || []));
        localStorage.setItem("program_applications", JSON.stringify(db.program_applications || []));
        localStorage.setItem("partnerships", JSON.stringify(db.partnerships || []));
        localStorage.setItem("contacts", JSON.stringify(db.contacts || []));
        localStorage.setItem("newsletters", JSON.stringify(db.newsletters || []));

        onRefreshStats();
        return;
      }
    } catch (e) {
      console.warn("Backend submissions API unavailable, reading local memory backup:", e);
    }

    // Fallback block if backend database service is in transition
    setVolunteers(JSON.parse(localStorage.getItem("volunteers") || "[]"));
    setDonations(JSON.parse(localStorage.getItem("donations") || "[]"));
    setProgramApplications(JSON.parse(localStorage.getItem("program_applications") || "[]"));
    setPartners(JSON.parse(localStorage.getItem("partnerships") || "[]"));
    setContacts(JSON.parse(localStorage.getItem("contacts") || "[]"));
    setNewsletters(JSON.parse(localStorage.getItem("newsletters") || "[]"));
    onRefreshStats();
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  // Simulated state alterations for administrative workflow
  const updateVolunteerStatus = (id: string, newStatus: "Pending" | "Onboarding Scheduled" | "Approved") => {
    const db: VolunteerSubmission[] = JSON.parse(localStorage.getItem("volunteers") || "[]");
    const updated = db.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
    localStorage.setItem("volunteers", JSON.stringify(updated));
    setVolunteers(updated);
  };

  const updateProgramAppStatus = (id: string, newStatus: "Applied" | "Interview Scheduled" | "Admitted") => {
    const db: ProgramApplicationSubmission[] = JSON.parse(localStorage.getItem("program_applications") || "[]");
    const updated = db.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
    localStorage.setItem("program_applications", JSON.stringify(updated));
    setProgramApplications(updated);
  };

  const deleteRecord = (key: string, id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this grassroots application record?")) return;
    const db = JSON.parse(localStorage.getItem(key) || "[]");
    const filtered = db.filter((item: any) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
    loadDatabase();
  };

  const clearWholeDatabase = async () => {
    if (!window.confirm("CRITICAL WARNING: This will immediately wipe all central server configurations, newsletters, and custom financial transactions! Do you wish to continue?")) return;
    try {
      await fetch("/api/admin/reset", { method: "POST" });
    } catch (error) {
      console.warn("Remote reset failed, wiping browser cache:", error);
    }
    localStorage.removeItem("volunteers");
    localStorage.removeItem("donations");
    localStorage.removeItem("program_applications");
    localStorage.removeItem("partnerships");
    localStorage.removeItem("contacts");
    localStorage.removeItem("newsletters");
    loadDatabase();
  };

  const totalSumDonated = donations.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
        
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-emerald-50 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 px-2.5 bg-rose-100 text-rose-700 rounded-full font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secure Console
              </span>
              <span className="text-xs text-gray-400">Authenticated: Administrator</span>
            </div>
            <h2 className="text-2xl font-black text-emerald-950 tracking-tight">NGO Admin Database & Logs</h2>
            <p className="text-gray-500 text-xs lines-relaxed">
              Real-time persistent state monitor representing database tables. Review system registrations, adjust workflow statuses.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadDatabase}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Tables</span>
            </button>
            <button
              onClick={clearWholeDatabase}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Database</span>
            </button>
          </div>
        </div>

        {/* Dynamic Multi-Table Overview Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { id: "volunteers", label: "Volunteers", count: volunteers.length, color: "text-emerald-700 bg-emerald-50", icon: <Users className="w-4 h-4" /> },
            { id: "programs", label: "Students", count: programApplications.length, color: "text-purple-700 bg-purple-50", icon: <FileText className="w-4 h-4" /> },
            { id: "donations", label: "Donation Logs", count: donations.length, color: "text-blue-700 bg-blue-50", icon: <Landmark className="w-4 h-4" /> },
            { id: "partners", label: "Partners", count: partners.length, color: "text-amber-700 bg-amber-50", icon: <Heart className="w-4 h-4" /> },
            { id: "contacts", label: "Direct Inquiries", count: contacts.length, color: "text-rose-700 bg-rose-50", icon: <Mail className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                activeTab === tab.id
                  ? "bg-white border-emerald-500 shadow-md scale-105"
                  : "bg-white border-gray-150 hover:border-emerald-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`p-1.5 rounded-lg ${tab.color}`}>{tab.icon}</span>
                <span className="text-xl font-extrabold text-gray-900">{tab.count}</span>
              </div>
              <p className="text-xs font-semibold text-gray-500 mt-3">{tab.label}</p>
            </button>
          ))}
        </div>

        {/* Total Financial Contribution Highlight card */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-900/40">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Live Budget Contributions Ledger</span>
            <h3 className="text-xl font-bold tracking-tight">Interactive User Transactions Sum</h3>
            <p className="text-xs text-white/50">
              Captures all validated bank routing and card presets from this browser sandbox.
            </p>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-[10px] text-emerald-300 font-mono tracking-wider block">Total Raised Locally</span>
            <div className="text-2xl font-black text-amber-400">
              ₦{totalSumDonated.toLocaleString()}
            </div>
            <span className="text-[9px] text-emerald-100/50">({donations.length} total payouts validated)</span>
          </div>
        </div>

        {/* Content Render Grid */}
        <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden min-h-[350px]">
          {/* Active Title bar */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">
              {activeTab} Registry Table
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {activeTab === "volunteers" && `${volunteers.length} Records`}
              {activeTab === "programs" && `${programApplications.length} Records`}
              {activeTab === "donations" && `${donations.length} Records`}
              {activeTab === "partners" && `${partners.length} Records`}
              {activeTab === "contacts" && `${contacts.length} Records`}
            </span>
          </div>

          <div className="p-6">
            {/* VOLUNTEERS REGISTER */}
            {activeTab === "volunteers" && (
              <div className="space-y-4">
                {volunteers.length === 0 ? (
                  <div className="text-center py-10 space-y-2 text-gray-400">
                    <Users className="w-12 h-12 mx-auto stroke-1" />
                    <p className="text-sm">No volunteer registrations found. Submit via the Volunteer Form!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {volunteers.map((vol) => (
                      <div key={vol.id} className="border border-gray-150 p-4 rounded-xl space-y-3 bg-slate-50/50 relative">
                        <button
                          onClick={() => deleteRecord("volunteers", vol.id)}
                          className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Submission"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-emerald-950">{vol.fullName}</h4>
                            <span className="text-[10px] font-bold bg-amber-500/20 text-amber-800 px-1.5 py-0.5 rounded uppercase">
                              {vol.type}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 block font-mono">{vol.id} | {new Date(vol.createdAt).toLocaleString()}</span>
                        </div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li><strong>Email:</strong> {vol.email}</li>
                          <li><strong>Phone:</strong> {vol.phone}</li>
                          <li><strong>Frequency:</strong> {vol.availability}</li>
                          <li>
                            <strong className="block mb-0.5">Focus Interests:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {vol.interests.map((int, i) => (
                                <span key={i} className="bg-emerald-50 text-emerald-800 text-[9px] font-semibold px-2 py-0.5 rounded border border-emerald-100">
                                  {int}
                                </span>
                              ))}
                              {vol.interests.length === 0 && <span className="text-gray-400">None selected</span>}
                            </div>
                          </li>
                          <li className="pt-1.5 border-t border-gray-100 mt-1">
                            <strong>Motivation statement:</strong>
                            <p className="text-gray-500 italic text-[11px] mt-0.5 font-sans leading-relaxed">“{vol.motivation}”</p>
                          </li>
                        </ul>
                        <div className="pt-2 border-t border-gray-100 mt-1.5 flex flex-wrap items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            vol.status === "Approved" ? "bg-green-100 text-green-800" :
                            vol.status === "Onboarding Scheduled" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            Status: {vol.status}
                          </span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => updateVolunteerStatus(vol.id, "Onboarding Scheduled")}
                              className="px-2 py-1 bg-white border border-gray-200 hover:border-amber-400 text-[10px] text-amber-700 font-bold rounded transition-colors cursor-pointer"
                            >
                              Call Onboard
                            </button>
                            <button
                              onClick={() => updateVolunteerStatus(vol.id, "Approved")}
                              className="px-2 py-1 bg-white border border-gray-200 hover:border-green-400 text-[10px] text-green-700 font-bold rounded transition-colors cursor-pointer"
                            >
                              Approve
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROGRAMS / OUTREACH COHORT ENROLLMENT */}
            {activeTab === "programs" && (
              <div className="space-y-4">
                {programApplications.length === 0 ? (
                  <div className="text-center py-10 space-y-2 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto stroke-1" />
                    <p className="text-sm">No cohort enrollments logged. Sign up inside the Programs Page!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {programApplications.map((app) => (
                      <div key={app.id} className="border border-gray-150 p-4 rounded-xl space-y-3 bg-slate-50/50 relative">
                        <button
                          onClick={() => deleteRecord("program_applications", app.id)}
                          className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Registration"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div>
                          <h4 className="font-extrabold text-sm text-emerald-950">{app.fullName}</h4>
                          <span className="text-[10px] text-gray-400 block font-mono">{app.id} | {new Date(app.createdAt).toLocaleString()}</span>
                        </div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li><strong>Course Target ID:</strong> <span className="font-mono text-emerald-750 font-bold">{app.programId}</span></li>
                          <li><strong>Email Address:</strong> {app.email}</li>
                          <li><strong>Mobile Phone:</strong> {app.phone}</li>
                          <li><strong>Demographics:</strong> {app.educationLevel}</li>
                          <li className="pt-1.5 border-t border-gray-100 mt-1">
                            <strong>Applicant Motivation:</strong>
                            <p className="text-gray-500 italic text-[11px] mt-0.5 leading-relaxed font-sans">“{app.motivation}”</p>
                          </li>
                        </ul>
                        <div className="pt-2 border-t border-gray-100 mt-1.5 flex justify-between items-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            app.status === "Admitted" ? "bg-purple-100 text-purple-800" :
                            app.status === "Interview Scheduled" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            Admissions: {app.status}
                          </span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => updateProgramAppStatus(app.id, "Interview Scheduled")}
                              className="px-2 py-1 bg-white border border-gray-200 hover:border-amber-400 text-[10px] text-amber-700 font-bold rounded transition-colors cursor-pointer"
                            >
                              Invite Panel
                            </button>
                            <button
                              onClick={() => updateProgramAppStatus(app.id, "Admitted")}
                              className="px-2 py-1 bg-white border border-gray-200 hover:border-purple-450 text-[10px] text-purple-700 font-bold rounded transition-colors cursor-pointer"
                            >
                              Admit To Hub
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* DONATIONS LEDGER */}
            {activeTab === "donations" && (
              <div className="space-y-4">
                {donations.length === 0 ? (
                  <div className="text-center py-10 space-y-2 text-gray-400">
                    <Landmark className="w-12 h-12 mx-auto stroke-1" />
                    <p className="text-sm">No donations logged in local database yet. Test via the Donate tab!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-gray-600 border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50 text-[10px] uppercase font-extrabold text-gray-400">
                          <th className="py-3 px-3">Donor Name</th>
                          <th className="py-3 px-3">Allocation Track</th>
                          <th className="py-3 px-3">Payout Method</th>
                          <th className="py-3 px-3">Date Submitted</th>
                          <th className="py-3 px-3 text-right">Fund sum</th>
                          <th className="py-3 px-3 text-center">Wipe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donations.map((don) => (
                          <tr key={don.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                            <td className="py-3.5 px-3 font-bold text-gray-900">{don.donorName}</td>
                            <td className="py-3.5 px-3 font-medium text-emerald-800">{don.allocation}</td>
                            <td className="py-3.5 px-3 font-mono">{don.paymentMethod}</td>
                            <td className="py-3.5 px-3 text-gray-400">{new Date(don.createdAt).toLocaleString()}</td>
                            <td className="py-3.5 px-3 text-right font-black text-rose-700">₦{don.amount.toLocaleString()}</td>
                            <td className="py-3.5 px-3 text-center">
                              <button
                                onClick={() => deleteRecord("donations", don.id)}
                                className="p-1 text-gray-400 hover:text-red-600 rounded"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* CORPORATE PARTNERS */}
            {activeTab === "partners" && (
              <div className="space-y-4">
                {partners.length === 0 ? (
                  <div className="text-center py-10 space-y-2 text-gray-400">
                    <Heart className="w-12 h-12 mx-auto stroke-1 text-rose-450" />
                    <p className="text-sm">No partnership requests found. Submit a proposal from Volunteer/Partner!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {partners.map((part) => (
                      <div key={part.id} className="border border-gray-150 p-4 rounded-xl bg-slate-50/50 relative">
                        <button
                          onClick={() => deleteRecord("partnerships", part.id)}
                          className="absolute right-3 top-3 p-1 text-gray-400 hover:text-red-700 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-extrabold text-[#111827] text-sm">{part.orgName}</h4>
                            <span className="text-[10px] text-gray-400 block font-mono">{part.id} | {new Date(part.createdAt).toLocaleString()}</span>
                          </div>
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {part.partnershipType}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100 mt-2">
                          <p><strong>Contact Admin:</strong> {part.contactPerson}</p>
                          <p><strong>Email:</strong> {part.email}</p>
                          <p><strong>Phone:</strong> {part.phone}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-205 mt-2.5">
                          <span className="text-[9px] text-gray-400 uppercase tracking-wider font-extrabold block mb-0.5">Grassroots Partnership Proposal</span>
                          <p className="text-xs text-gray-500 italic font-sans leading-relaxed">“{part.proposal}”</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* DIRECT CONTACT CORRESPONDENCES */}
            {activeTab === "contacts" && (
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <div className="text-center py-10 space-y-2 text-gray-400">
                    <Mail className="w-12 h-12 mx-auto stroke-1" />
                    <p className="text-sm">No general contact inquiries currently logged. Test out Contact Us Page!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {contacts.map((con) => (
                      <div key={con.id} className="border border-gray-150 p-4 rounded-xl bg-slate-50/50 relative space-y-2">
                        <button
                          onClick={() => deleteRecord("contacts", con.id)}
                          className="absolute right-3 top-3 p-1 text-gray-400 hover:text-red-700 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <h4 className="font-extrabold text-[#111827]">{con.name}</h4>
                            <span className="text-[10px] text-emerald-800">{con.email}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">{new Date(con.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-gray-700 bg-white p-2.5 rounded-lg border border-gray-200">
                          <strong className="block text-emerald-950 font-black">Subject: {con.subject}</strong>
                          <p className="text-gray-500 mt-1 lines-relaxed font-sans">“{con.message}”</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Subscribers Log Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-black text-emerald-950">Active Newsletter Subscribers Table</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Collected from footer forms. Real list representation.</p>
            </div>
            <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
              {newsletters.length} subscriptions
            </span>
          </div>

          {newsletters.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-6">No newsletter subscribers logged. Join via footer subscribe!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {newsletters.map((sub, idx) => (
                <div key={idx} className="bg-slate-50 border border-gray-120 p-2.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span className="text-xs font-mono text-gray-800 truncate max-w-[200px]" title={sub.email}>
                      {sub.email}
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono">{new Date(sub.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
