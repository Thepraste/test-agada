import React, { useState } from "react";
import { Menu, X, HeartHandshake, Settings, Coins, Award, CheckCircle } from "lucide-react";
import { NGO_DETAILS } from "../data";

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  donationProgress: { raised: number; goal: number };
}

export default function Navigation({ currentPage, setCurrentPage, donationProgress }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "programs", label: "Programs" },
    { id: "projects", label: "Projects & Gallery" },
    { id: "testimonials", label: "Testimonials" },
    { id: "volunteer", label: "Volunteer" },
    { id: "donate", label: "Donate" },
    { id: "contact", label: "Contact Us" }
  ];

  const percentage = Math.round((donationProgress.raised / donationProgress.goal) * 100);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Dynamic Top Announcement Ticker */}
      <div className="bg-emerald-900 text-white text-xs py-2 px-4 flex flex-wrap items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-emerald-950 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
            Alert
          </span>
          <span>Next Event: <strong>Youth Tech Career Day & Panel (July 12)</strong> is filling quickly!</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage("volunteer")}
            className="underline hover:text-amber-300 transition-colors cursor-pointer"
          >
            RSVP or Register Now
          </button>
          <div className="hidden md:flex items-center gap-1.5 opacity-90 border-l border-emerald-800 pl-4">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Q2 Impact: <strong>{percentage}%</strong> of budget raised</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav id="navbar-main" className="bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Elegant Branding Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                setCurrentPage("home");
                setIsOpen(false);
              }}
            >
              <div className="w-11 h-11 bg-gradient-to-tr from-emerald-700 to-teal-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-200 group-hover:scale-105 transition-all duration-300">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-emerald-950 tracking-tight leading-none">
                  THE AGADA
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold tracking-widest uppercase leading-none mt-1">
                  Initiative
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-emerald-800 bg-emerald-50/75 shadow-sm border border-emerald-100/50"
                        : "text-gray-600 hover:text-emerald-800 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Administrative Entry Point */}
              <div className="h-4 w-[1px] bg-gray-200 mx-2" />
              <button
                id="nav-link-admin"
                onClick={() => setCurrentPage("admin")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  currentPage === "admin"
                    ? "bg-emerald-900 border-emerald-900 text-white shadow-sm"
                    : "border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title="NGO Administration View"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Admin DB</span>
              </button>
            </div>

            {/* CTA Shortcut Button */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                id="nav-cta-donate"
                onClick={() => setCurrentPage("donate")}
                className="bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-emerald-700/15 hover:bg-emerald-800 hover:scale-[1.02] transform transition-all cursor-pointer"
              >
                Donate Now
              </button>
            </div>

            {/* Mobile Menu Actions Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setCurrentPage("admin")}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                title="NGO Admin Portal"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-emerald-900 hover:bg-emerald-50 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Height and Content for Animated Mobile Menu Slider */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all ${
                      isActive
                        ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/10"
                        : "text-gray-700 hover:bg-gray-50 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="h-[1px] bg-gray-100 my-3" />
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setCurrentPage("admin");
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold border transition-all ${
                    currentPage === "admin"
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "border-gray-200 text-gray-600 bg-gray-50"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("donate");
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center py-3 rounded-xl text-sm font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-sm"
                >
                  Donate ₦
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
