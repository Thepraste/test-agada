import { TeamMember, Program, ProjectItem, Testimonial, UpcomingEvent, BlogPost, FAQItem } from "./types";

export const NGO_DETAILS = {
  name: "The Agada Initiative",
  fullName: "The Agada Initiative for Women and Youths",
  mission: "To empower women and youths through education, digital literacy, entrepreneurship, advocacy, mentorship, and community development programs that create sustainable opportunities and positive social impact.",
  vision: "To build a society where women and youths are equipped with the knowledge, skills, confidence, and opportunities needed to thrive and contribute meaningfully to their communities.",
  address: "24 Alexandrite drive, Sapphire Garden Estate, Awoyaya, Lagos, Nigeria",
  phone: "08158865153",
  whatsapp: "08158865153",
  email: "theagadainitiative@gmail.com",
  bankDetails: {
    bankName: "Access Bank",
    accountName: "The Agada Initiative for Women & Youths",
    accountNumber: "1588651531",
    ussdCode: "*901*2*1588651531*AMOUNT#"
  },
  socials: {
    instagram: "https://instagram.com/theagadainitiative",
    facebook: "https://facebook.com/theagadainitiative",
    linkedin: "https://linkedin.com/company/theagadainitiative",
    tiktok: "https://tiktok.com/@theagadainitiative",
    twitter: "https://twitter.com/theagadainit"
  }
};

export const CORE_VALUES = [
  { name: "Empowerment", desc: "Providing tools, support, and resources that help women and youth build their independent futures." },
  { name: "Inclusivity", desc: "Serving everyone regardless of social status, gender, or tribal backgrounds." },
  { name: "Integrity", desc: "Being accountable, transparent, and strictly honest in our resource management and relationships." },
  { name: "Innovation", desc: "Using tech-forward, modern solutions and current resources to solve persistent social problems." },
  { name: "Community Service", desc: "Committed to serving the collective and uplifting underserved communities near us." },
  { name: "Sustainability", desc: "Designing long-lasting educational and financial loops that keep beneficiaries independent." }
];

export const AREAS_OF_FOCUS = [
  "Women empowerment",
  "Youth development",
  "Digital literacy training",
  "Entrepreneurship support",
  "Advocacy and awareness campaigns",
  "Educational support initiatives",
  "Community outreach programs",
  "Career and leadership development"
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team_1",
    name: "Dr. (Mrs.) Caroline Agada",
    role: "Founder & Executive Director",
    bio: "A passionate social advocate and community leader with over 15 years of experience in championing women’s empowerment, youth development, and inclusive education across Nigeria.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "team_2",
    name: "Praise Oti",
    role: "Head of programs & Operations",
    bio: "Vast experience organizing skill bootcamps, managing grant distributions, and ensuring each digital literacy cohort achieves 100% completion.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "team_3",
    name: "Chinyere Nwosu",
    role: "Volunteer Lead & Digital Literacy Instructor",
    bio: "Ex-tech instructor specializing in simplifying software systems. Leads our community tech bootcamps with infectious enthusiasm.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "team_4",
    name: "David Adeleke",
    role: "Media & Communications Coordinator",
    bio: "Digital strategist who translates NGO impact stories into compelling multimedia, connecting our grassroots efforts with global partners.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
  }
];

export const PROGRAMS_LIST: Program[] = [
  {
    id: "prog_digital_lit",
    title: "Digital Literacy Training",
    description: "Foundational computer operations, internet safety, productivity tools, and soft digital skills tailored for women and youths stepping into the digital workspace.",
    benefits: [
      "Certified 8-week structured practical computer training",
      "One-on-one lab instructions and hands-on digital tools practice",
      "Confidence building, online business management, and resume setup support",
      "Access to private tech communities and remote gig platforms"
    ],
    duration: "8 Weeks",
    focusArea: "Digital Literacy",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "prog_techbridge",
    title: "Youth TechBridge Initiative",
    description: "Bridge the technical skills gap by training ambitious youths in coding, web development, UI/UX design, data storytelling, and freelance techniques.",
    benefits: [
      "Rigorous hands-on coding (HTML/CSS, JS, React) or product design tracks",
      "Mentorship from experienced international software professionals",
      "Capstone real-world client simulation and interview preparation",
      "Direct pipeline to local tech internships and remote career events"
    ],
    duration: "12 Weeks (intensive)",
    focusArea: "Youth Technology Education",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "prog_women_ent",
    title: "Women Entrepreneurship Support",
    description: "Empower local female traders and small business owners through comprehensive financial planning courses, business setup toolkits, and micro-grant programs.",
    benefits: [
      "Vocational crafts training with financial literacy modules",
      "Micro-grant allocations (up to ₦150,000) for qualifying business proposals",
      "Mentorship match with thriving female entrepreneurs",
      "Accounting/bookkeeping software tools training"
    ],
    duration: "4 Weeks + 6 Months Post-Mentoring",
    focusArea: "Vulnerable Women Economic Inclusion",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "prog_outreach",
    title: "Community Outreach Campaigns",
    description: "A comprehensive support net ensuring basic human needs like nutrition, hygiene supplies, free community medical checks, and widow grants are satisfied.",
    benefits: [
      "Sanitary pad distribution drives for adolescent schoolgirls",
      "Widows financial support nets & seasonal food supply packaging",
      "Free medical camps including blood sugar checks and basic medication",
      "Collaborations with health officers on sustainable community awareness"
    ],
    duration: "Continuous (Monthly drives)",
    focusArea: "Health, Welfare, and Advocacy",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop"
  }
];

export const GALLERY_PROJECTS: ProjectItem[] = [
  {
    id: "proj_1",
    title: "New Year Outreach for Widows",
    description: "Distributed food security packs, personal hygiene baskets, and micro-seed grants of ₦50,000 each to 100+ community widows to restart their micro-trades in standard Lagos markets.",
    category: "Widow Outreach",
    date: "January 2026",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "proj_2",
    title: "Digital Boot Camp for Girl Child",
    description: "Equipped 50 out-of-school teenage girls with fundamental web editing skills and digital security tools, ending with a collaborative project showcase.",
    category: "Education",
    date: "April 2026",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "proj_3",
    title: "Awoyaya Tech Summit & Hackathon",
    description: "Youths designed community solving dashboards, using high-performance web systems and API logic. Prizes included modern laptops and learning bursaries.",
    category: "Tech Workshops",
    date: "March 2026",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "proj_4",
    title: "Market Traders Micro-Credit Support",
    description: "Trained 35 local market market-women in simple mobile spreadsheet tracking and allocated non-collateral interest-free loans to boost business supplies.",
    category: "Entrepreneurship",
    date: "February 2026",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "proj_5",
    title: "Sanitary Pad & Hygiene Campaign",
    description: "We visited two public schools in Lagos districts, distributing re-usable hygiene kits and hosting open panel sessions with specialized female health advocates.",
    category: "Community Support",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
  }
];

export const TESTIMONIALS_LIST: Testimonial[] = [
  {
    id: "test_1",
    name: "Chioma Nduka",
    role: "Beneficiary",
    quote: "Before joining the Youth TechBridge Initiative, coding felt like magic. Now, not only can I write custom React applications, but I am also currently working on a remote web design contract that helps support my education costs. This initiative is a life-changer!",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&auto=format&fit=crop",
    program: "Youth TechBridge coding bootcamp"
  },
  {
    id: "test_2",
    name: "Mrs. Risikat Shola",
    role: "Beneficiary",
    quote: "My food-ingredient stand was on the verge of collapsing due to heavy capital issues and inflation. The Agada Initiative didn't just give me ₦100,000 grant, they paired me with a business mentor who taught me how to separate store expenses and record daily profits.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    program: "Women Entrepreneurship Support"
  },
  {
    id: "test_3",
    name: "Joshua Peters",
    role: "Beneficiary",
    quote: "Being a part of the Digital Literacy Cohort opened doors I didn't know existed. I can confidently draft professional formal presentations, manage folders, use digital maps, and protect my devices. Dr. Caroline Agada took me in like a son, and I am highly grateful.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    program: "Digital Literacy Training"
  },
  {
    id: "test_4",
    name: "Tobi Akin-Emmanuel",
    role: "Volunteer",
    quote: "Volunteering with the NGO as a technical mentor gives me immense joy. The sheer hunger to learn in these Lagos communities is unparalleled. Highly organized management, genuine impact metrics, and completely transparent financial distributions.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop"
  }
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "evt_1",
    title: "Youth Tech Career Day & Panel",
    date: "July 12, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Awoyaya Community Center, Lagos",
    description: "A free interactive seminar matching tech employers, local startups, and experienced software mentors with our promising digital literacy and engineering graduates.",
    slots: 120,
    registeredCount: 88
  },
  {
    id: "evt_2",
    title: "August Digital Camp for Schoolchildren",
    date: "August 3, 2026",
    time: "9:00 AM - 1:00 PM Daily",
    location: "The Agada Training Hub, Lagos",
    description: "An intensive fun-filled workshop introducing children aged 10-15 to game rules, basic algorithmic thinking, visual scratch programming, and hardware.",
    slots: 40,
    registeredCount: 31
  },
  {
    id: "evt_3",
    title: "Empowered Widows Empowerment Assembly",
    date: "September 15, 2026",
    time: "11:00 AM - 4:00 PM",
    location: "Main Auditorium, Sapphire Estate Complex, Lagos",
    description: "Empowerment session involving distribution of microbusiness starting packs, vocational cooking showcases, and legal advice booths on land/property rights.",
    slots: 200,
    registeredCount: 145
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog_1",
    title: "The Silent Tech Revolution in Lagos Suburbs",
    summary: "How community-led computer training centers are transforming unemployable young youths into high-demand remote digital specialists.",
    content: `In the heart of communities like Awoyaya, young people are defying obstacles to gain access to the global economy. Access to internet connectivity and high-performance computing centers is transforming lives.\n\nThe Agada Initiative team has spent the last year establishing local digital labs, creating physical platforms where marginalized young boys and girls can practice daily coding, system design, and computer administration. Results are surfacing fast, with graduates landing their first consulting Gigs.`,
    author: "Praise Oti",
    date: "May 28, 2026",
    readTime: "4 min read",
    category: "Education",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "blog_2",
    title: "Empowering Mothers: The Microfinance Formula for True Sustainable Growth",
    summary: "Why traditional direct cash handouts fail, and how pairing structured business mentorship with micro-grants changes the community trajectory.",
    content: `Direct welfare distributions provide vital temporary relief, but lack the structural capacity to break generation-spanning poverty loops.\n\nOur 'Women Entrepreneurship Project' utilizes a customized formula: beneficiaries must attend a 4-week class covering cost-calculation, digital bookkeeping, and inventory strategy before receiving interest-free grants. Followed by a 6-month mentorship review, this structure boasts a 92% business survival rate across Lagos communities.`,
    author: "Dr. Caroline Agada",
    date: "June 1, 2026",
    readTime: "6 min read",
    category: "Women Empowerment",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "blog_3",
    title: "Breaking Barriers: Supporting Girls in Tech STEM Education",
    summary: "Overcoming stereotype dynamics to ensure girls occupy critical spaces in programming, network systems, and robotics initiatives.",
    content: `Statistics globally indicate female software leadership remains at a distinct minority. In Nigeria's growing tech capital, we are committed to rewriting the narrative.\n\nBy offering girls-only classes, child care during study hours, and mentoring networks composed of senior female developers, we are raising a brand-new generation of tech-literate leaders ready to innovate.`,
    author: "Chinyere Nwosu",
    date: "June 5, 2026",
    readTime: "5 min read",
    category: "STEM Outreach",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop"
  }
];

export const FAQS_LIST: FAQItem[] = [
  {
    category: "General",
    question: "Where is the Agada Initiative office located?",
    answer: "Our physical training training hub and administrative office is at 24 Alexandrite drive, Sapphire Garden Estate, Awoyaya, Lagos, Nigeria. We welcome scheduled visits!"
  },
  {
    category: "Programs",
    question: "Who is eligible to enroll in any of your free training bootcamps?",
    answer: "Our programs prioritize young women and youths (ages 15-30) living in underserved communities who lack the financial means to access premium technical academies or college programs. Application files are reviewed for passion and commitment."
  },
  {
    category: "Donations",
    question: "How are public and corporate donation funds allocated?",
    answer: "Transparency is our highest operating virtue. 85% of each donation goes directly into hardware hubs, student internet stipends, micro-grant capital, and instructional material packs. 15% covers administrative logistics, hub maintenance, and utilities. We publish public audit reports annually."
  },
  {
    category: "Volunteering",
    question: "Can I volunteer remotely, or must I be physically present in Lagos?",
    answer: "Both! We support remote volunteering, including remote tech mentoring (UI/UX design reviews, software code evaluations), curriculum development, translation services, or social writing roles, in addition to hands-on bootcamps."
  }
];
