export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  duration: string;
  focusArea: string;
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: "Community Support" | "Tech Workshops" | "Widow Outreach" | "Education" | "Entrepreneurship";
  date: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: "Beneficiary" | "Partner" | "Volunteer" | "Donor";
  quote: string;
  avatar: string;
  program?: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  slots: number;
  registeredCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Donations" | "Programs" | "Volunteering";
}

export interface VolunteerSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string;
  motivation: string;
  type: "Volunteer" | "Intern";
  status: "Pending" | "Onboarding Scheduled" | "Approved";
  createdAt: string;
}

export interface DonationSubmission {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  allocation: string;
  paymentMethod: "Bank Transfer" | "Credit Card" | "USSD" | "QR Scanner";
  status: "Pending Verification" | "Completed";
  createdAt: string;
}

export interface PartnershipSubmission {
  id: string;
  orgName: string;
  contactPerson: string;
  email: string;
  phone: string;
  partnershipType: string;
  proposal: string;
  status: "Reviewing" | "Accepted";
  createdAt: string;
}

export interface ProgramApplicationSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  programId: string;
  educationLevel: string;
  motivation: string;
  status: "Applied" | "Interview Scheduled" | "Admitted";
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface NewsletterSubmission {
  email: string;
  createdAt: string;
}
