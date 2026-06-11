import React from "react";
import { Coins, Users, CalendarCheck, BookOpen, Sparkles, TrendingUp } from "lucide-react";

interface InteractiveTrackerProps {
  donationProgress: { raised: number; goal: number };
  donorCount: number;
}

export default function InteractiveTracker({ donationProgress, donorCount }: InteractiveTrackerProps) {
  const percentage = Math.min(100, Math.round((donationProgress.raised / donationProgress.goal) * 100));

  // Structured impact statistics
  const coreImpactStats = [
    {
      id: "stat_1",
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      value: "1,200+",
      label: "Women & Youths Empowered",
      desc: "Graduated from skill courses or directly received micro-grants."
    },
    {
      id: "stat_2",
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      value: "450+",
      label: "Digital Certificates Issued",
      desc: "Foundational and advanced tech certifications."
    },
    {
      id: "stat_3",
      icon: <CalendarCheck className="w-5 h-5 text-emerald-600" />,
      value: "15+",
      label: "Community Outreach Drives",
      desc: "Delivered widow aid baskets and public school hygiene kits."
    }
  ];

  // Specific funds allocation calculation
  const allocationBreakdown = [
    { category: "Youth TechBridge Hub & Laptops", percent: 45, color: "bg-emerald-600" },
    { category: "Women Micro-Grants & Mentorship", percent: 30, color: "bg-teal-500" },
    { category: "Community Widow Food Packages", percent: 15, color: "bg-amber-500" },
    { category: "Awoyaya Hub Running & Internet Utilities", percent: 10, color: "bg-slate-400" }
  ];

  return (
    <div className="space-y-10">
      {/* 3 Grid Core NGO Highlighting Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coreImpactStats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-6 border border-emerald-50 hover:shadow-lg transition-all hover:-translate-y-0.5 duration-300"
          >
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              {stat.icon}
            </div>
            <h4 className="text-3xl font-extrabold text-emerald-950 tracking-tight">{stat.value}</h4>
            <p className="font-bold text-sm text-gray-800 mt-1">{stat.label}</p>
            <p className="text-xs text-gray-500 mt-1 lines-relaxed">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Goal Track Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-white/5 rounded-full" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main summary */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              Active Q2 Budget Campaign
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Awoyaya Skill Hub Expansion Project
            </h3>
            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-xl">
              We are expanding our physical capacity to host 100 concurrent students, procuring 35 new high-performance learning laptops, and funding our 2026 interest-free seed credits for community vendors.
            </p>

            {/* Interactive allocation display */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                How funds are allocated:
              </span>
              <div className="space-y-2">
                {allocationBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-emerald-100/90 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/10 transition-all">
                    <span>{item.category}</span>
                    <span className="font-bold">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress gauge card */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-inner">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-emerald-200 uppercase tracking-widest font-semibold block">Raised so far</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">
                    ₦{donationProgress.raised.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-200 uppercase tracking-widest font-semibold block">Strategic Goal</span>
                  <span className="text-base font-bold text-white">
                    ₦{donationProgress.goal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="w-full bg-emerald-950/60 rounded-full h-4 overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-emerald-200 font-semibold">
                  <span>{percentage}% reached</span>
                  <span>{100 - percentage}% remaining</span>
                </div>
              </div>

              {/* Supporter Badge Count */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-emerald-100">Verified Supporters:</span>
                <span className="bg-amber-400 text-emerald-950 font-extrabold px-3 py-1 rounded-full text-[11px] shadow">
                  {donorCount} Donors
                </span>
              </div>

              <div className="bg-emerald-800/40 p-3 rounded-xl border border-emerald-700/30 text-[11px] text-center text-emerald-100 italic">
                “Every ₦50,000 provides high-speed internet & power to a youth coder for 6 Full Months.”
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
