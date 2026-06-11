import React, { useState } from "react";
import {
  Heart, Users, Award, BookOpen, MapPin, Phone, Mail, MessageCircle, ExternalLink, Calendar, Clock, ArrowRight,
  TrendingUp, Star, HelpCircle, ArrowUpRight, CheckCircle2, ChevronRight, HelpCircle as HelpIcon, FileText, Bookmark, BookMarked, Handshake
} from "lucide-react";
import {
  NGO_DETAILS, CORE_VALUES, AREAS_OF_FOCUS, TEAM_MEMBERS, PROGRAMS_LIST,
  GALLERY_PROJECTS, TESTIMONIALS_LIST, UPCOMING_EVENTS, BLOG_POSTS, FAQS_LIST
} from "../data";
import { VolunteerForm, DonationForm, PartnershipForm, ProgramApplicationForm, ContactForm } from "./Forms";
import InteractiveTracker from "./InteractiveTracker";

// ==========================================
// 1. HOME VIEW
// ==========================================
interface HomeViewProps {
  setCurrentPage: (page: string) => void;
  donationProgress: { raised: number; goal: number };
  donorCount: number;
}

export function HomeView({ setCurrentPage, donationProgress, donorCount }: HomeViewProps) {
  // Mini Blog highlight
  const latestBlog = BLOG_POSTS[0];

  return (
    <div className="space-y-16 py-8">
      {/* High-Concept Modern Hero Panel */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[550px] flex items-center">
        {/* Abstract Background Accents */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-900/80 to-teal-950/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop"
          alt="Young women training in technical hub in Nigeria"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 filter brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 py-16 text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-widest mx-auto animate-pulse">
            <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Fully Accredited Lagos NGO
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight uppercase font-sans">
            Empowering <span className="text-emerald-400">Women</span>.<br />
            Inspiring <span className="text-amber-400">Youths</span>.<br />
            Transforming <span className="text-teal-300">Communities</span>.
          </h1>
          <p className="text-sm sm:text-lg text-gray-250 font-medium max-w-3xl mx-auto leading-relaxed">
            Welcome to <strong className="text-white">{NGO_DETAILS.fullName}</strong> — a grassroots non-profit organization dedicated to creating sustainable pathways out of poverty through quality career education, digital literacy training, and economic intervention.
          </p>
          
          {/* Main Hero CTA triggers page routing */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setCurrentPage("donate")}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Donate Funds Now
            </button>
            <button
              onClick={() => setCurrentPage("volunteer")}
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Volunteer With Us
            </button>
            <button
              onClick={() => setCurrentPage("volunteer")}
              className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Partner With Us
            </button>
            <button
              onClick={() => setCurrentPage("programs")}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Join Our Programs
            </button>
          </div>
        </div>
      </section>

      {/* Reactive Tracker Panel & Impacts */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-3xl font-black text-emerald-950 tracking-tight">Our Running Impact Tracker</h2>
          <p className="text-xs text-gray-500 max-w-xl mx-auto font-medium">
            Empowerment is an exact science. See our certified community outreach statistics, ongoing technical campaigns, and live sandbox donations.
          </p>
        </div>
        <InteractiveTracker donationProgress={donationProgress} donorCount={donorCount} />
      </section>

      {/* Featured Core Programs Grid */}
      <section className="space-y-8 bg-emerald-50/50 -mx-4 px-4 sm:-mx-8 sm:px-8 py-16 rounded-3xl border border-emerald-50">
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 max-w-7xl mx-auto">
          <div>
            <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold">Accredited tracks</span>
            <h2 className="text-3xl font-black text-emerald-950 tracking-tight mt-1">Featured Programs</h2>
          </div>
          <button
            onClick={() => setCurrentPage("programs")}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View All Programs Syllabus</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PROGRAMS_LIST.slice(0, 4).map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-emerald-100 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
            >
              <div className="h-44 relative bg-gray-100">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 bg-emerald-900/90 text-white font-bold text-[10px] px-2.5 py-1 rounded">
                  {prog.duration}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[9px] text-[#059669] uppercase font-bold tracking-widest">{prog.focusArea}</span>
                  <h3 className="font-extrabold text-sm text-emerald-950 tracking-tight leading-snug">{prog.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{prog.description}</p>
                </div>
                <button
                  onClick={() => setCurrentPage("programs")}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-800 rounded-xl text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <span>Apply Free Admission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors & Partners Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold">Joint Collaborations</span>
          <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Sponsors & Key Partners</h2>
          <p className="text-xs text-gray-500 max-w-xl mx-auto font-medium">
            We welcome collaborations with organizations, brands, institutions, and individuals who share our passion for expanding tech literacy and financial safety networks.
          </p>
        </div>

        {/* Dynamic Partner Logo Strip Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {[
            { name: "Lagos Tech Council", logo: "LTC" },
            { name: "Polaris Microfinance", logo: "PMF" },
            { name: "Welfare Africa Alliance", logo: "WAA" },
            { name: "Sapphire Trust Fund", logo: "STF" },
            { name: "STEM Guild Nigeria", logo: "SGN" },
            { name: "EcoBank Dev Agency", logo: "EDA" }
          ].map((partner, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-150 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-1.5 hover:bg-white hover:shadow-md hover:border-emerald-250 transition-all cursor-default"
            >
              <div className="w-10 h-10 bg-slate-900 rounded-lg text-amber-400 font-black flex items-center justify-center text-xs tracking-wider">
                {partner.logo}
              </div>
              <span className="text-[11px] font-bold text-gray-700 tracking-tight">{partner.name}</span>
            </div>
          ))}
        </div>

        <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed text-center md:text-left">
            <strong>Sponsorship Channels open:</strong> Grants & funding support, technical equipment donations (laptops, screen routers), mentor support networks, or cooperative media collaborations.
          </p>
          <button
            onClick={() => setCurrentPage("volunteer")}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap"
          >
            Inquire Collaboration
          </button>
        </div>
      </section>

      {/* Featured Blog Highlight */}
      {latestBlog && (
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-slate-800">
          <div className="space-y-4">
            <span className="p-1 px-2.5 bg-amber-500/10 text-amber-400 border border-amber-400/20 rounded-full font-bold text-[10px] uppercase tracking-widest inline-block">
              Latest Impact News
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight uppercase font-sans">
              {latestBlog.title}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">{latestBlog.summary}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
              <span>Author: <strong>{latestBlog.author}</strong></span>
              <span>•</span>
              <span>{latestBlog.date}</span>
            </div>
            <button
              onClick={() => setCurrentPage("projects")}
              className="text-xs font-bold text-amber-400 hover:text-amber-500 flex items-center gap-1 cursor-pointer hover:underline"
            >
              <span>Read Full Article inside Blog Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-56 sm:h-72 bg-slate-800 rounded-2xl overflow-hidden shadow-inner">
            <img
              src={latestBlog.image}
              alt={latestBlog.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>
      )}
    </div>
  );
}


// ==========================================
// 2. ABOUT US VIEW
// ==========================================
export function AboutView() {
  return (
    <div className="space-y-16 py-8">
      {/* Introduction Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
          Who We Are
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight leading-tight uppercase">
          Empowering Grassroots Innovation
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">
          The Agada Initiative for Women and Youths is a professional social impact organization committed to addressing unemployment, gender inequality, and digital exclusion across Lagos.
        </p>
      </section>

      {/* Mission & Vision split */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50 border border-emerald-100/50 p-6 sm:p-8 rounded-3xl space-y-3 shadow-sm">
          <span className="w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-extrabold text-sm shadow">M</span>
          <h3 className="text-lg font-black text-emerald-950 tracking-tight">Our Mission</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium">
            {NGO_DETAILS.mission}
          </p>
        </div>
        <div className="bg-amber-50/50 border border-amber-200/30 p-6 sm:p-8 rounded-3xl space-y-3 shadow-sm">
          <span className="w-10 h-10 bg-amber-500 text-emerald-950 rounded-xl flex items-center justify-center font-extrabold text-sm shadow">V</span>
          <h3 className="text-lg font-black text-emerald-950 tracking-tight">Our Vision</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium">
            {NGO_DETAILS.vision}
          </p>
        </div>
      </section>

      {/* Objectives Call-out card */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6">
        <h3 className="text-lg font-black uppercase tracking-wider text-amber-500 text-center">Core Objectives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Equip Practical Skills", desc: "Train young people and vulnerable mothers in concrete programming languages, desktop spreadsheets, bookkeeping, and crafts." },
            { num: "02", title: "Promote Independence", desc: "Extend interest-free microbusiness seed funding up to ₦150,000 to enable market women to establish thriving stands." },
            { num: "03", title: "Encourage Innovation", desc: "Build state-of-the-art power-secured technical hubs offering free gig work access to students." }
          ].map((obj, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2.5">
              <span className="text-base font-black text-emerald-400 font-mono">{obj.num}</span>
              <h4 className="font-bold text-sm">{obj.title}</h4>
              <p className="text-[11px] text-gray-300 leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold">Operating Pillars</span>
          <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_VALUES.map((val, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-150 p-5 space-y-3 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600 mr-1" />
              <h3 className="font-extrabold text-sm text-[#111827]">{val.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team roster */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-[#047857] uppercase tracking-widest font-extrabold">Leadership & Coordinators</span>
          <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Our Dedicated Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl border border-gray-150 overflow-hidden hover:shadow-lg transition-all">
              <div className="h-56 bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="font-extrabold text-sm text-emerald-950 tracking-tight">{member.name}</h3>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold block w-fit">
                  {member.role}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed pt-1.5 border-t border-gray-100-mt-1">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


// ==========================================
// 3. OUR PROGRAMS VIEW
// ==========================================
interface ProgramsViewProps {
  onApplyClick: () => void;
}

export function ProgramsView({ onApplyClick }: ProgramsViewProps) {
  const [activeCourse, setActiveCourse] = useState<string | null>(PROGRAMS_LIST[0]?.id || null);

  return (
    <div className="space-y-16 py-8">
      {/* Syllabi Title card */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold">Accredited Curricula</span>
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight leading-tight uppercase font-sans">
          Fully Funded Skills Academy
        </h2>
        <p className="text-xs text-gray-505 text-gray-500 leading-relaxed font-semibold">
          All our technical bootcamps are fully subsidized by corporate donors, giving marginalized students access to professional hardware hubs without tuition barriers.
        </p>
      </section>

      {/* Main syllabus card focus split toggle */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Selector rail on Left */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase block px-1">Select Study Program</span>
          {PROGRAMS_LIST.map((prog) => (
            <button
              key={prog.id}
              onClick={() => setActiveCourse(prog.id)}
              className={`w-full text-left p-4 rounded-xl border flex flex-col items-start gap-1.5 transition-all text-sm font-bold cursor-pointer ${
                activeCourse === prog.id
                  ? "bg-emerald-900 border-emerald-900 text-white shadow-md"
                  : "bg-white border-gray-150 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className={`text-[9px] uppercase tracking-wider font-extrabold ${activeCourse === prog.id ? "text-amber-400" : "text-emerald-700"}`}>
                {prog.focusArea}
              </span>
              <span>{prog.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Course Sylabus details on Right */}
        <div className="lg:col-span-8">
          {PROGRAMS_LIST.map((prog) => {
            if (prog.id !== activeCourse) return null;
            return (
              <div
                key={prog.id}
                className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-6 animate-in fade-in duration-300"
              >
                <div className="h-56 sm:h-72 rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-bold block">{prog.focusArea}</span>
                    <h3 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">{prog.title}</h3>
                  </div>
                  <span className="px-3.5 py-1 bg-amber-400 font-black text-emerald-950 rounded-full text-xs">
                    Class Duration: {prog.duration}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-650 text-gray-600 leading-relaxed">{prog.description}</p>

                {/* Core Syllabus Syllabus lists */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">What you will learn & benefits:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
                    {prog.benefits.map((benefit, i) => (
                      <div key={i} className="flex gap-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/30">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Prompt box */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-xs font-bold text-gray-800">Admission Status: Ongoing Intake</p>
                    <p className="text-[10px] text-gray-400">Applications are open to youths and mothers.</p>
                  </div>
                  <button
                    onClick={onApplyClick}
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer transition-all"
                  >
                    Submit Free Enrolment Form
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}


// ==========================================
// 4. PROJECTS & GALLERY VIEW
// ==========================================
export function ProjectsGalleryView() {
  const [filter, setFilter] = useState<"All" | "Widow Outreach" | "Education" | "Tech Workshops" | "Entrepreneurship" | "Community Support">("All");

  const filterOptions = ["All", "Widow Outreach", "Education", "Tech Workshops", "Entrepreneurship", "Community Support"] as const;

  const filteredItems = GALLERY_PROJECTS.filter((item) => filter === "All" || item.category === filter);

  return (
    <div className="space-y-16 py-8">
      {/* Title cards */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold font-sans">Verified Interventions</span>
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight leading-tight uppercase font-sans">
          Project Gallery & Archives
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
          Explore photographic archives and detailed documentation of our physical campaigns, widow distribution drives, and technical hackathons in local communities.
        </p>
      </section>

      {/* Filter Selector Row */}
      <section className="flex flex-wrap items-center justify-center gap-1.5">
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              filter === opt
                ? "bg-emerald-905 bg-emerald-900 border-emerald-900 text-white"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </section>

      {/* Renders Filtered Cards List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-gray-150 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="h-52 relative bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-slate-900/90 text-white font-bold text-[9px] px-2 py-0.5 rounded">
                Category: {item.category}
              </span>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                <span>Date: {item.date}</span>
                <span className="font-mono text-emerald-700">{item.id}</span>
              </div>
              <h3 className="font-extrabold text-[#111827] text-sm tracking-tight leading-snug">{item.title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed font-sans">{item.description}</p>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            <Bookmark className="w-12 h-12 mx-auto stroke-1" />
            <p className="text-sm mt-1">No community projects archived under this category yet.</p>
          </div>
        )}
      </section>

      {/* Focus Area list highlighting detailed user message */}
      <section className="bg-emerald-50 rounded-3xl p-6 sm:p-10 space-y-6">
        <h3 className="text-base font-black text-emerald-950 uppercase text-center tracking-wider">Historical Scope Indicators</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { metric: "100+", desc: "Widows Supported directly" },
            { metric: "60%", desc: "Student Laptop placement ratio" },
            { metric: "₦2.3M", desc: "Seed business microbursaries disbursed" },
            { metric: "5 Districts", desc: "Empowerment reach coverages" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-emerald-100">
              <p className="text-2xl font-black text-emerald-900">{stat.metric}</p>
              <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-tight">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


// ==========================================
// 5. TESTIMONIALS VIEW
// ==========================================
export function TestimonialsView() {
  const [list, setList] = useState<any[]>(TESTIMONIALS_LIST);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<"Beneficiary" | "Partner" | "Volunteer">("Beneficiary");
  const [newQuote, setNewQuote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Allow users to submit their own real success story
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newQuote.trim()) return;

    const added = {
      id: `custom_${Date.now()}`,
      name: newName,
      role: newRole,
      quote: newQuote,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
      program: newRole === "Beneficiary" ? "Subsidized Empowerment Track" : undefined
    };

    setList([added, ...list]);
    setNewName("");
    setNewQuote("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-16 py-8">
      {/* Narrative title card */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold">Words of hope</span>
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight leading-tight uppercase font-sans">
          Impact Testimonials
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
          Listen to stories told in the voices of widows who restarted business standings, young youth software coders, and dedicated partner coordinators.
        </p>
      </section>

      {/* Grid render of impact reviews */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((test) => (
          <div
            key={test.id}
            className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
          >
            <div className="space-y-4">
              {/* Star Rating decoration */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-[13px] text-gray-700 italic leading-relaxed font-sans">“{test.quote}”</p>
            </div>

            <div className="flex items-center gap-3 pt-5 border-t border-gray-100 mt-6 shrink-0">
              <img
                src={test.avatar}
                alt={test.name}
                className="w-11 h-11 rounded-full object-cover border border-emerald-100 shrink-0"
              />
              <div>
                <dt className="font-extrabold text-sm text-emerald-950 leading-none">{test.name}</dt>
                <dd className="text-[10px] text-gray-400 font-bold tracking-tight uppercase mt-1">
                  Type: {test.role} {test.program && `| ${test.program}`}
                </dd>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Form Submission Module to add new reviews */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-lg font-black uppercase tracking-wider text-amber-500 font-sans">Share Your Success Story</h3>
          <p className="text-xs text-gray-300">Have we empowered you or have you collaborated with us? Log your testimony directly!</p>
        </div>

        <form onSubmit={handleAddTestimonial} className="space-y-4 max-w-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-350 uppercase tracking-widest mb-1 text-gray-300">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g., Sandra Peters"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-350 uppercase tracking-widest mb-1 text-gray-300">Association Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Beneficiary">Program Beneficiary</option>
                <option value="Volunteer">NGO Volunteer</option>
                <option value="Partner">Cooperating Sponsor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-350 uppercase tracking-widest mb-1 text-gray-300">Success Testimony</label>
            <textarea
              required
              rows={3}
              placeholder="Tell us what changes or opportunities we supported you with..."
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none resize-none font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow cursor-pointer"
          >
            Publish Testimony On-Page
          </button>
          {submitted && (
            <p className="text-[11px] text-emerald-400 font-semibold text-center mt-1 animate-pulse">
              ✓ Successfully updated! Your testimony is listed at the top.
            </p>
          )}
        </form>
      </section>
    </div>
  );
}


// ==========================================
// 6. VOLUNTEER & PARTNER VIEW
// ==========================================
export function VolunteerPartnerView() {
  const [activeFormType, setActiveFormType] = useState<"volunteer" | "partnership">("volunteer");

  return (
    <div className="space-y-16 py-8">
      {/* Intro details */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold font-sans">Human Capital & Collaboration</span>
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight leading-tight uppercase font-sans">
          Join Hands with The Agada Initiative
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
          Whether you want to dedicate your technical instructing hours, sponsor a laptop hub campaign, or consult on operational committees, there is a place for you.
        </p>
      </section>

      {/* Grid detailing perks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[9px] text-[#059669] uppercase font-bold tracking-widest">Two channels of collaboration</span>
            <h3 className="text-xl font-black text-emerald-950 tracking-tight">How You Can Participate</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 bg-white border border-gray-150 p-4 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 font-bold" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-xs text-emerald-950">Volunteer/Intern Packages</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Join our weekly computer laboratory mentoring hours, assist during monthly widows distribution campaigns, or coordinate communication.
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-white border border-gray-150 p-4 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#10b981] flex items-center justify-center shrink-0 animate-pulse">
                <Handshake className="w-5 h-5 font-bold" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-xs text-emerald-950">Strategic Partnership Opportunities</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Companies, financial groups, or local government agencies can supply grants, allocate hardware resources, or issue student bursaries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Selector and Box rendering */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 bg-emerald-900/10 p-1.5 rounded-2xl border border-emerald-900/5">
            <button
              onClick={() => setActiveFormType("volunteer")}
              className={`py-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeFormType === "volunteer"
                  ? "bg-emerald-900 text-white shadow-md font-black"
                  : "text-emerald-900 hover:bg-emerald-50"
              }`}
            >
              Volunteer / Intern Application
            </button>
            <button
              onClick={() => setActiveFormType("partnership")}
              className={`py-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeFormType === "partnership"
                  ? "bg-emerald-900 text-white shadow-md font-black"
                  : "text-emerald-900 hover:bg-emerald-50"
              }`}
            >
              Partnership Inquiry
            </button>
          </div>

          <div className="transition-all duration-300">
            {activeFormType === "volunteer" ? (
              <VolunteerForm onSuccess={() => {}} />
            ) : (
              <PartnershipForm />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


// ==========================================
// 7. DONATE VIEW
// ==========================================
interface DonateViewProps {
  onDonationAdded: (amount: number) => void;
  donationProgress: { raised: number; goal: number };
  donorCount: number;
}

export function DonateView({ onDonationAdded, donationProgress, donorCount }: DonateViewProps) {
  return (
    <div className="space-y-16 py-8">
      {/* Header title */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full text-[10px] font-extrabold uppercase tracking-widest block w-fit mx-auto">
          Fund True Impact
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight leading-tight uppercase">
          Empower Vulnerable Communities Today
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
          Your support helps us empower women, educate youths, and create lasting impact in underserved communities across Nigeria.
        </p>
      </section>

      {/* Grid: Details on left, Form on right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Core accountability detail points on Left */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg border border-emerald-800">
            <h3 className="font-extrabold text-base text-amber-400">Where Your Funding Goes:</h3>
            <ul className="space-y-4 text-xs font-medium text-emerald-100">
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>₦50,000 purchases modern web development manuals and learning software routers.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>₦100,000 provides interest-free seed credits for 2 local market vendors.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>₦450,000 equips a youth student with a fast development laptop core.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>₦1,000,000 finances an entire 20-student basic Digital Literacy cohort.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-150 p-6 space-y-4">
            <h4 className="font-extrabold text-sm text-emerald-950">Official Bank Credentials:</h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Bank Name</span>
                <span className="text-emerald-900 font-bold">{NGO_DETAILS.bankDetails.bankName}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Account No.</span>
                <span className="text-emerald-900 font-black font-mono">{NGO_DETAILS.bankDetails.accountNumber}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Recipient</span>
                <span className="text-emerald-800 font-bold">{NGO_DETAILS.bankDetails.accountName}</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 text-center italic">
              “Annual auditing records are compiled and emailed to all verified sponsors.”
            </p>
          </div>
        </div>

        {/* Dynamic Payment/Transfer form on Right */}
        <div className="lg:col-span-7">
          <DonationForm onDonationAdded={onDonationAdded} />
        </div>
      </section>

      {/* Meter widget on bottom */}
      <section className="pt-6 border-t border-gray-150">
        <InteractiveTracker donationProgress={donationProgress} donorCount={donorCount} />
      </section>
    </div>
  );
}


// ==========================================
// 8. CONTACT US VIEW
// ==========================================
export function ContactView() {
  return (
    <div className="space-y-16 py-8">
      {/* Title block */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] text-[#047857] uppercase tracking-widest font-extrabold">Open Communication channels</span>
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight leading-tight uppercase font-sans">
          Connect With Our Operations Hub
        </h2>
        <p className="text-xs text-gray-400 leading-relaxed font-semibold">
          Have an inquiry about training admissions, device donation scheduling, or visiting routines? Check details or submit direct letters below.
        </p>
      </section>

      {/* Split layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Detail credentials card list on Left */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-6">
            <h3 className="font-extrabold text-sm text-[#065f46] uppercase tracking-wider">Lagos Office Channels</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold block">Location Landmark</span>
                  <p className="text-xs text-gray-800 font-bold leading-relaxed">{NGO_DETAILS.address}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold block">Call Line / Whatsapp</span>
                  <p className="text-xs text-gray-800 font-bold font-mono">
                    <a href={`tel:${NGO_DETAILS.phone}`} className="hover:underline">{NGO_DETAILS.phone}</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold block">Email Correspondence</span>
                  <p className="text-xs text-gray-800 font-bold tracking-tight">
                    <a href={`mailto:${NGO_DETAILS.email}`} className="hover:underline">{NGO_DETAILS.email}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels display */}
            <div className="pt-6 border-t border-gray-100">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold block mb-3">Join Social Communities</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {Object.entries(NGO_DETAILS.socials).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="no-referrer"
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 hover:bg-emerald-900 hover:text-white rounded-lg font-bold uppercase tracking-tight transition-all text-gray-500 cursor-pointer"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map Simulation - Pristine CSS placeholder showing directions, estates, and route coordinates */}
          <div className="bg-emerald-950 text-emerald-100 rounded-3xl p-5 border border-emerald-900 flex flex-col justify-between h-56 relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 opacity-10 font-mono text-[9px] pointer-events-none select-none overflow-hidden scrollbar-none whitespace-pre leading-none">
              {Array.from({ length: 40 }).map((_, idx) => (
                <div key={idx}>LAT: 6.4674° N, LON: 3.6190° E LAGOS HIGHWAY SECTOR ROADWAYS...</div>
              ))}
            </div>
            <div className="relative z-10 space-y-1.5">
              <span className="text-[9px] bg-emerald-800 text-emerald-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider">Awoyaya District Map</span>
              <h4 className="font-black text-sm text-white tracking-tight">Sapphire Garden Estate Gate</h4>
              <p className="text-[11px] text-emerald-100/70 leading-relaxed">
                Take Lekki-Epe Expressway down to Sapphire Garden Gate, turning right onto Alexandrite drive. Hub office sits cleanly at No. 24 with registered structural banners visible.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=24+Alexandrite+drive,+Sapphire+Garden+Estate,+Awoyaya,+Lagos"
              target="_blank"
              rel="no-referrer"
              className="relative z-10 bg-amber-500 text-emerald-950 font-bold py-2.5 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-1 cursor-pointer hover:bg-amber-600 transition-colors"
            >
              <span>Get Highway Navigation Coordinates</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Dynamic Contact Form on Right */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 shadow-sm">
          <h3 className="font-extrabold text-sm text-[#065f46] uppercase tracking-wider mb-4">Transmit a Secured Letter</h3>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}


// ==========================================
// 9. BLOG / NEWS UPDATES VIEW
// ==========================================
export function BlogNewsView() {
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  return (
    <div className="space-y-16 py-8">
      {/* Page headers */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold font-sans">Grassroots Reports</span>
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight leading-tight uppercase font-sans">
          Stories, Updates & Technical Insights
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
          Follow detailed field reporting from program leads, operations analysis from founder Dr. Caroline Agada, and student learning updates.
        </p>
      </section>

      {/* Grid listing */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl border border-gray-150 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="h-48 bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-mono uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-extrabold text-emerald-950 text-sm tracking-tight leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3 font-sans">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 mt-2">
              <button
                onClick={() => setActiveArticle(post)}
                className="w-full py-2.5 bg-gray-50 hover:bg-emerald-800 hover:text-white text-emerald-800 font-bold rounded-xl text-xs transition-all cursor-pointer text-center"
              >
                Read Article Curricula ({post.readTime})
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Full Article Modal window */}
      {activeArticle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto space-y-6 p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute right-4 top-4 p-2 bg-gray-100 hover:bg-emerald-800 hover:text-white text-gray-650 rounded-full transition-all cursor-pointer font-bold text-xs"
              title="Close Article"
            >
              ╳ Close
            </button>

            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded font-mono text-[10px] uppercase font-bold tracking-wider">
              {activeArticle.category}
            </span>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight leading-snug">
                {activeArticle.title}
              </h3>
              <p className="text-xs text-gray-400">
                Logged on <strong>{activeArticle.date}</strong> by <strong>{activeArticle.author}</strong> ({activeArticle.readTime})
              </p>
            </div>

            <div className="h-56 bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-xs sm:text-sm text-gray-700 space-y-4 leading-relaxed whitespace-pre-wrap font-sans">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-gray-100 text-center">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-3">Share this grassroots impact story</p>
              <div className="flex justify-center gap-1.5">
                {["Twitter/X", "Facebook", "LinkedIn", "WhatsApp"].map((social, i) => (
                  <button
                    key={i}
                    onClick={() => alert(`Simulated link copied! Copy other credentials to share ${activeArticle.title}.`)}
                    className="p-2 py-1.5 border border-gray-200 text-gray-500 hover:border-emerald-700 hover:bg-emerald-50 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ==========================================
// 10. EVENTS CALENDAR VIEW
// ==========================================
export function EventsCalendarView() {
  const [events, setEvents] = useState<any[]>(UPCOMING_EVENTS);
  const [userRsvp, setUserRsvp] = useState<string[]>([]);

  const handleRsvp = (id: string, idx: number) => {
    if (userRsvp.includes(id)) {
      alert("You have already RSVP'd for this event cohort! We look forward to meeting you.");
      return;
    }

    const updated = [...events];
    if (updated[idx].registeredCount >= updated[idx].slots) {
      alert("Apologies, all slots have been fully booked! Mail us via Contact Us to be placed on a standby backup list.");
      return;
    }

    // Increment count
    updated[idx].registeredCount += 1;
    setEvents(updated);
    setUserRsvp([...userRsvp, id]);
  };

  return (
    <div className="space-y-16 py-8">
      {/* Intro headers */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold font-sans">Community gatherings</span>
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight leading-tight uppercase font-sans">
          Upcoming Events & Assembly
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
          RSVP online to book your free seat or training coordinates. Learn about vocational drills, digital hackathons, and widows support distributions.
        </p>
      </section>

      {/* Grid listing */}
      <section className="space-y-6">
        {events.map((evt, idx) => {
          const rsvpd = userRsvp.includes(evt.id);
          const percentBooked = Math.round((evt.registeredCount / evt.slots) * 100);
          return (
            <div
              key={evt.id}
              className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:shadow-lg transition-all duration-300"
            >
              {/* Date Block */}
              <div className="md:col-span-3 text-center md:text-left space-y-1 text-emerald-900 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                <span className="p-1 px-2 text-[9px] font-bold bg-amber-400 text-emerald-950 rounded uppercase">Free Attendance</span>
                <p className="text-base font-extrabold tracking-tight mt-1">{evt.date}</p>
                <div className="flex items-center justify-center md:justify-start gap-1 text-[11px] text-gray-450 text-gray-400 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{evt.time}</span>
                </div>
              </div>

              {/* Summary Description block */}
              <div className="md:col-span-6 space-y-2.5">
                <div className="flex items-center justify-center md:justify-start gap-1 text-[10px] text-[#059669] font-black uppercase">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{evt.location}</span>
                </div>
                <h3 className="text-lg font-black text-emerald-950 tracking-tight leading-tight uppercase text-center md:text-left">
                  {evt.title}
                </h3>
                <p className="text-xs text-gray-550 text-gray-550 leading-relaxed text-center md:text-left font-sans font-medium">
                  {evt.description}
                </p>

                {/* Progress slots bar */}
                <div className="space-y-1.5 pt-1.5">
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>Slots Booked: {evt.registeredCount} / {evt.slots}</span>
                    <span>{percentBooked}% Capacity Full</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentBooked}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* RSVP Action */}
              <div className="md:col-span-3 flex justify-center md:justify-end">
                <button
                  onClick={() => handleRsvp(evt.id, idx)}
                  className={`px-6 py-3.5 rounded-xl font-bold text-xs uppercase cursor-pointer transition-all ${
                    rsvpd
                      ? "bg-emerald-50 text-emerald-800 border-2 border-emerald-300 font-black"
                      : "bg-emerald-700 hover:bg-emerald-800 hover:scale-103 text-white shadow"
                  }`}
                >
                  {rsvpd ? "✓ Registered Successfully" : "RSVP FREE SEAT NOW"}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}


// ==========================================
// 11. FAQ PAGE VIEW
// ==========================================
export function FAQPageView() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<"All" | "General" | "Donations" | "Programs" | "Volunteering">("All");

  const categories = ["All", "General", "Donations", "Programs", "Volunteering"] as const;

  const filteredFaqs = FAQS_LIST.filter((faq) => activeCategory === "All" || faq.category === activeCategory);

  return (
    <div className="space-y-16 py-8">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-extrabold px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full block w-fit mx-auto">
          Help Desk Center
        </span>
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight leading-tight uppercase font-sans">
          Frequently Answered Queries
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
          Find precise informative answers on how to register for classes, audit donated assets, or schedule administrative office visits.
        </p>
      </section>

      {/* Category Selection Row */}
      <section className="flex flex-wrap items-center justify-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              activeCategory === cat
                ? "bg-emerald-905 bg-emerald-900 border-emerald-900 text-white"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat} FAQs
          </button>
        ))}
      </section>

      {/* Accordion list */}
      <section className="max-w-3xl mx-auto space-y-3.5">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = activeIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-150 rounded-2xl overflow-hidden transition-all duration-350"
            >
              <button
                onClick={() => setActiveIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 flex justify-between items-center transition-all cursor-pointer font-bold text-sm text-[#111827] hover:bg-gray-50/50"
              >
                <span className="flex items-center gap-2">
                  <HelpIcon className="w-4 h-4 text-emerald-700 shrink-0" />
                  {faq.question}
                </span>
                <span className="text-xl text-emerald-800 font-extrabold">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-650 text-gray-550 border-t border-gray-100/50 leading-relaxed font-sans font-medium">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
