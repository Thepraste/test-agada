/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { DonationSubmission } from "./types";
import {
  HomeView, AboutView, ProgramsView, ProjectsGalleryView, TestimonialsView,
  VolunteerPartnerView, DonateView, ContactView, BlogNewsView, EventsCalendarView, FAQPageView
} from "./components/Views";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [donationProgress, setDonationProgress] = useState({ raised: 5230000, goal: 10000000 });
  const [donorCount, setDonorCount] = useState(142);

  // Recalculates sandbox statistics on system mount or updates
  const recalculateStats = () => {
    try {
      const db: DonationSubmission[] = JSON.parse(localStorage.getItem("donations") || "[]");
      const localSum = db.reduce((acc, curr) => acc + curr.amount, 0);
      setDonationProgress({ raised: 5230000 + localSum, goal: 10000000 });
      setDonorCount(142 + db.length);
    } catch (e) {
      console.error("Local database sync exception:", e);
    }
  };

  useEffect(() => {
    recalculateStats();

    // Scroll to top on page switches for pristine visual focus
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleDonationAdded = (amount: number) => {
    recalculateStats();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between selection:bg-emerald-250 selection:text-emerald-950">
      
      {/* 1. Sticky Glassmorphic Navigation Menu */}
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        donationProgress={donationProgress}
      />

      {/* 2. Main High-Fidelity Router Block with Smooth Exit/Entrance transitions */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {currentPage === "home" && (
              <HomeView
                setCurrentPage={setCurrentPage}
                donationProgress={donationProgress}
                donorCount={donorCount}
              />
            )}
            
            {currentPage === "about" && <AboutView />}

            {currentPage === "programs" && (
              <ProgramsView onApplyClick={() => setCurrentPage("volunteer")} />
            )}

            {currentPage === "projects" && <ProjectsGalleryView />}

            {currentPage === "testimonials" && <TestimonialsView />}

            {currentPage === "volunteer" && <VolunteerPartnerView />}

            {currentPage === "donate" && (
              <DonateView
                onDonationAdded={handleDonationAdded}
                donationProgress={donationProgress}
                donorCount={donorCount}
              />
            )}

            {currentPage === "contact" && <ContactView />}

            {currentPage === "blog" && <BlogNewsView />}

            {currentPage === "events" && <EventsCalendarView />}

            {currentPage === "faq" && <FAQPageView />}

            {currentPage === "admin" && (
              <AdminDashboard onRefreshStats={recalculateStats} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Auxiliary Mini Route Access Hub above standard footer */}
      <section className="bg-emerald-900/5 py-8 border-t border-emerald-900/10 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-850 font-black">
          <button onClick={() => setCurrentPage("blog")} className="hover:text-emerald-950 hover:underline cursor-pointer">
            Latest News & Blog
          </button>
          <span>•</span>
          <button onClick={() => setCurrentPage("events")} className="hover:text-emerald-950 hover:underline cursor-pointer">
            2026 Events Calendar
          </button>
          <span>•</span>
          <button onClick={() => setCurrentPage("faq")} className="hover:text-emerald-950 hover:underline cursor-pointer">
            Help & FAQ Desk
          </button>
        </div>
      </section>

      {/* 3. Universal Footer Block with Newsletter integrations */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
