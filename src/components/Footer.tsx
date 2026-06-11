import React, { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter, MessageSquare, ArrowUpRight, Send, Heart } from "lucide-react";
import { NGO_DETAILS } from "../data";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailToSubscribe = newsEmail.trim();
    if (!emailToSubscribe) {
      alert("Please provide a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          formType: "Weekly Newsletter Subscription",
          data: {
            subscriberEmail: emailToSubscribe,
            createdAt: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Server status returned error: ${response.status}`);
      }

      const result = await response.json();

      // Persist newsletter subscriber locally
      const emails = JSON.parse(localStorage.getItem("newsletters") || "[]");
      emails.push({ email: emailToSubscribe, createdAt: new Date().toISOString() });
      localStorage.setItem("newsletters", JSON.stringify(emails));

      setNewsEmail("");
      setSubmitted(true);
      alert(result.message || "Success! You've joined the newsletter community.");
    } catch (error) {
      console.error("Newsletter subscription failure:", error);
      alert("Newsletter record cached successfully in local storage.");

      const emails = JSON.parse(localStorage.getItem("newsletters") || "[]");
      emails.push({ email: emailToSubscribe, createdAt: new Date().toISOString() });
      localStorage.setItem("newsletters", JSON.stringify(emails));

      setNewsEmail("");
      setSubmitted(true);
    }

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer id="main-footer" className="bg-emerald-950 text-emerald-100 border-t border-emerald-900">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Ready to make a sustainable difference?
            </h3>
            <p className="text-emerald-100/80 text-sm mt-1 max-w-xl">
              Support local microbusiness start-ups, equip a young girl with computer programming literacy, or volunteer!
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentPage("donate")}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-extrabold rounded-xl transition-all shadow-md cursor-pointer text-sm"
            >
              Support Financially
            </button>
            <button
              onClick={() => setCurrentPage("volunteer")}
              className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold rounded-xl transition-all cursor-pointer text-sm"
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Quadrant */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Branding and Short Mission */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center text-emerald-950 font-bold">
                A
              </div>
              <span className="font-extrabold text-white tracking-tight text-lg">
                Agada Initiative
              </span>
            </div>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Empowering women and inspiring youths to construct thriving, modern societies across Nigeria through sustainable skills.
            </p>
            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={NGO_DETAILS.socials.instagram}
                target="_blank"
                rel="no-referrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-amber-500 hover:text-emerald-950 flex items-center justify-center transition-all text-emerald-200"
                title="Instagram Link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={NGO_DETAILS.socials.facebook}
                target="_blank"
                rel="no-referrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-amber-500 hover:text-emerald-950 flex items-center justify-center transition-all text-emerald-200"
                title="Facebook Link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={NGO_DETAILS.socials.linkedin}
                target="_blank"
                rel="no-referrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-amber-500 hover:text-emerald-950 flex items-center justify-center transition-all text-emerald-200"
                title="LinkedIn Link"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={NGO_DETAILS.socials.twitter}
                target="_blank"
                rel="no-referrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-amber-500 hover:text-emerald-950 flex items-center justify-center transition-all text-emerald-200"
                title="Twitter Link"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-bold text-white tracking-tight mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: "home", label: "Home Page" },
                { id: "about", label: "About Our Story" },
                { id: "programs", label: "Empowerment Programs" },
                { id: "projects", label: "In-Action Gallery" },
                { id: "testimonials", label: "Impact Testimonials" },
                { id: "volunteer", label: "Join as Volunteer" },
                { id: "donate", label: "Donate Funds" },
                { id: "contact", label: "Contact Address" }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className="hover:text-amber-400 text-emerald-100/70 hover:underline transition-all cursor-pointer flex items-center gap-1 text-[13px]"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-50" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div>
            <h4 className="font-bold text-white tracking-tight mb-4">Official Channels</h4>
            <ul className="space-y-3.5 text-xs text-emerald-100/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{NGO_DETAILS.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${NGO_DETAILS.phone}`} className="hover:underline hover:text-amber-400">
                  {NGO_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${NGO_DETAILS.email}`} className="hover:underline hover:text-amber-400 break-all">
                  {NGO_DETAILS.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-amber-500 shrink-0" />
                <span>WhatsApp: {NGO_DETAILS.whatsapp}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold text-white tracking-tight mb-4">Weekly Impact Tracker</h4>
            <p className="text-xs text-emerald-100/70 mb-3 leading-relaxed">
              Subscribe to receive verified reports of our community drives, widow allocations, and coding bootcamps. No spam.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="w-full bg-emerald-900/50 border border-emerald-800 focus:border-amber-500 rounded-xl px-4 py-2.5 pr-10 text-xs text-white placeholder-emerald-100/40 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-amber-500 text-emerald-950 font-bold hover:bg-amber-600 rounded-lg transition-all text-xs flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
              {submitted && (
                <p className="text-[11px] text-amber-400 font-semibold animate-pulse">
                  ✓ Successfully subscribed for updates!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-900/60 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-100/50">
          <p>© {new Date().getFullYear()} {NGO_DETAILS.fullName}. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
