import {
  Heart,
  Brain,
  Baby,
  Stethoscope,
  Bone,
  Eye,
  Activity,
  Pill,
  Microscope,
  Smile,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

export const services = [
  {
    slug: "cardiology",
    title: "Cardiology",
    icon: Heart,
    color: "from-rose-400 to-pink-500",
    image: "/img/services/service-01-770x770.jpg",
    short: "Advanced heart care, diagnostics & interventions.",
    description:
      "Comprehensive cardiac evaluation, non-invasive imaging, angioplasty, and rehabilitation programmes led by senior consultants.",
  },
  {
    slug: "neurology",
    title: "Neurology",
    icon: Brain,
    color: "from-indigo-400 to-violet-500",
    image: "/img/services/service-02-770x770.jpg",
    short: "Brain, spine & nervous system specialists.",
    description:
      "Diagnosis and treatment of stroke, epilepsy, migraine, movement disorders, neuropathy and complex neurological conditions.",
  },
  {
    slug: "pediatrics",
    title: "Pediatrics",
    icon: Baby,
    color: "from-amber-300 to-orange-400",
    image: "/img/services/service-03-770x770.jpg",
    short: "Gentle care for infants, children & teens.",
    description:
      "Newborn screening, vaccinations, growth tracking, paediatric specialty clinics and adolescent counselling.",
  },
  {
    slug: "orthopedics",
    title: "Orthopedics",
    icon: Bone,
    color: "from-emerald-300 to-teal-500",
    image: "/img/services/service-04-770x770.jpg",
    short: "Joint replacement, sports injury & spine.",
    description:
      "From sprains to joint replacement and arthroscopic procedures, with a focused rehab pathway.",
  },
  {
    slug: "ophthalmology",
    title: "Ophthalmology",
    icon: Eye,
    color: "from-sky-400 to-cyan-500",
    image: "/img/services/service-05-770x770.jpg",
    short: "Vision care, retina, cataract & LASIK.",
    description:
      "End-to-end eye care including phaco cataract, retina, cornea, glaucoma and refractive surgery.",
  },
  {
    slug: "general-medicine",
    title: "General Medicine",
    icon: Stethoscope,
    color: "from-fuchsia-400 to-pink-500",
    image: "/img/services/service-06-770x770.jpg",
    short: "Family physicians for everyday care.",
    description:
      "Preventive screening, chronic illness management, infections, and lifestyle counselling.",
  },
  {
    slug: "dentistry",
    title: "Dentistry",
    icon: Smile,
    color: "from-yellow-300 to-amber-500",
    image: "/img/services/service-07-770x770.jpg",
    short: "Smile design, implants & cosmetic dentistry.",
    description:
      "Routine and cosmetic dentistry — fillings, implants, orthodontics, root canal and pediatric dentistry.",
  },
  {
    slug: "diagnostics",
    title: "Diagnostics & Labs",
    icon: Microscope,
    color: "from-purple-400 to-indigo-500",
    image: "/img/services/service-08-770x770.jpg",
    short: "Imaging, pathology & home sample collection.",
    description:
      "Modern imaging (MRI, CT, USG), in-house pathology, and doorstep sample collection.",
  },
  {
    slug: "pulmonology",
    title: "Pulmonology",
    icon: Activity,
    color: "from-sky-400 to-blue-500",
    image: "/img/services/service-09-770x770.jpg",
    short: "Asthma, sleep & respiratory care.",
    description:
      "Comprehensive lung-care including asthma, COPD, sleep medicine, bronchoscopy and pulmonary rehab.",
  },
] as const;

export const doctors = [
  {
    slug: "dr-arjun-mehra",
    name: "Dr. Arjun Mehra",
    specialty: "Cardiologist",
    qualification: "MBBS, MD, DM (Cardiology)",
    experience: 18,
    image: "/img/doctors/testimonial-01.jpg",
    fees: 800,
    days: ["Mon", "Wed", "Fri"],
    time: "10:00 AM - 2:00 PM",
    bio: "Senior interventional cardiologist with expertise in complex angioplasty and structural heart procedures.",
  },
  {
    slug: "dr-neha-kapoor",
    name: "Dr. Neha Kapoor",
    specialty: "Neurologist",
    qualification: "MBBS, MD (Internal Med), DM (Neurology)",
    experience: 12,
    image: "/img/doctors/testimonial-02.jpg",
    fees: 900,
    days: ["Tue", "Thu", "Sat"],
    time: "11:00 AM - 4:00 PM",
    bio: "Specialised in stroke care, epilepsy and headache disorders with a research-driven approach.",
  },
  {
    slug: "dr-ishaan-rao",
    name: "Dr. Ishaan Rao",
    specialty: "Pediatrician",
    qualification: "MBBS, MD (Pediatrics)",
    experience: 10,
    image: "/img/doctors/testimonial-03.jpg",
    fees: 600,
    days: ["Mon", "Tue", "Thu", "Sat"],
    time: "9:00 AM - 1:00 PM",
    bio: "Child-friendly paediatrician focused on developmental screening and adolescent care.",
  },
  {
    slug: "dr-sanya-iyer",
    name: "Dr. Sanya Iyer",
    specialty: "Dermatologist",
    qualification: "MBBS, MD (Dermatology)",
    experience: 8,
    image: "/img/doctors/testimonial-04.jpg",
    fees: 700,
    days: ["Mon", "Wed", "Fri", "Sat"],
    time: "12:00 PM - 6:00 PM",
    bio: "Cosmetic and clinical dermatology including acne, pigmentation, laser and aesthetic procedures.",
  },
  {
    slug: "dr-vikram-sharma",
    name: "Dr. Vikram Sharma",
    specialty: "Orthopedic Surgeon",
    qualification: "MBBS, MS (Ortho), Fellow Joint Replacement",
    experience: 15,
    image: "/img/doctors/testimonial-05.jpg",
    fees: 850,
    days: ["Tue", "Thu", "Sat"],
    time: "10:00 AM - 3:00 PM",
    bio: "Joint replacement and sports injury specialist with thousands of successful surgeries.",
  },
  {
    slug: "dr-priya-nair",
    name: "Dr. Priya Nair",
    specialty: "Gynecologist",
    qualification: "MBBS, MS (Obs & Gynae)",
    experience: 14,
    image: "/img/doctors/testimonial-06.jpg",
    fees: 800,
    days: ["Mon", "Wed", "Fri"],
    time: "9:00 AM - 12:00 PM",
    bio: "High-risk pregnancies, laparoscopic surgery and wellness clinics for women.",
  },
] as const;

export const stats = [
  { label: "Expert Doctors", value: "120+" },
  { label: "Specialties", value: "24" },
  { label: "Happy Patients", value: "85K+" },
  { label: "Years of Trust", value: "20" },
] as const;

export const testimonials = [
  {
    name: "Riya Sharma",
    role: "Patient · Cardiology",
    quote:
      "From appointment to discharge — every step felt thoughtful. Dr. Mehra and the team simply went above and beyond.",
    image: "P",
  },
  {
    name: "Aman Verma",
    role: "Father · Pediatrics",
    quote:
      "The kids actually look forward to their check-ups now. The paediatric wing is warm, gentle and beautifully designed.",
    image: "A",
  },
  {
    name: "Megha Iyer",
    role: "Patient · Dermatology",
    quote:
      "Modern, premium, but never intimidating. I felt safe, informed and in good hands throughout my treatment plan.",
    image: "M",
  },
] as const;

export const features = [
  {
    icon: ShieldCheck,
    title: "Patient-First Safety",
    desc: "Strict infection-control, transparent pricing, and ethical second-opinion programme.",
  },
  {
    icon: HeartPulse,
    title: "24/7 Emergency",
    desc: "Round-the-clock ER with rapid triage, ambulance dispatch, and trauma response.",
  },
  {
    icon: Pill,
    title: "Pharmacy & Home Care",
    desc: "In-house pharmacy, doorstep medicine delivery and post-op home nursing.",
  },
  {
    icon: Activity,
    title: "Digital Health Records",
    desc: "Your reports, prescriptions and history — always one tap away.",
  },
];

export const gallery = [
  { src: "/img/gallery/project-01-770x770.jpg", title: "Complete Surgery", category: "Surgery" },
  { src: "/img/gallery/project-02-770x770.jpg", title: "Medical Scanner", category: "Diagnostics" },
  { src: "/img/gallery/project-03-770x770.jpg", title: "Lab Research", category: "Laboratory" },
  { src: "/img/gallery/project-04-770x770.jpg", title: "Patient Care", category: "Wards" },
  { src: "/img/gallery/project-05-770x770.jpg", title: "Cardiology Unit", category: "Cardiology" },
  { src: "/img/gallery/project-06-770x770.jpg", title: "ICU & Critical", category: "ICU" },
  { src: "/img/gallery/project-07-770x770.jpg", title: "Operation Theatre", category: "OT" },
  { src: "/img/gallery/project-08-770x770.jpg", title: "Pediatric Wing", category: "Pediatrics" },
  { src: "/img/gallery/project-09-770x770.jpg", title: "Reception", category: "Lobby" },
];

export const blogPosts = [
  {
    slug: "5-tips-healthy-heart",
    title: "5 daily habits for a healthier heart",
    image: "/img/blog/blog-01-770x500.jpg",
    excerpt: "Small daily choices compound — here's what our cardiology team recommends to keep your heart strong, year after year.",
    date: "May 24, 2026",
    category: "Cardiology",
    author: "Dr. Arjun Mehra",
  },
  {
    slug: "pediatric-vaccination-guide",
    title: "Pediatric vaccination — the complete 2026 guide",
    image: "/img/blog/blog-02-770x500.jpg",
    excerpt: "A clear, updated walkthrough of every vaccine your child needs from birth to age 12, with timing tips and what to expect.",
    date: "May 12, 2026",
    category: "Pediatrics",
    author: "Dr. Ishaan Rao",
  },
  {
    slug: "sleep-better-tonight",
    title: "Sleep better tonight — what science actually says",
    image: "/img/blog/blog-03-770x500.jpg",
    excerpt: "Forget the fads. Here's the evidence-backed routine our sleep clinic uses with patients struggling with insomnia.",
    date: "Apr 28, 2026",
    category: "Wellness",
    author: "Dr. Neha Kapoor",
  },
];

export const clients = [
  "/img/clients/client-logo-01.png",
  "/img/clients/client-logo-02.png",
  "/img/clients/client-logo-03.png",
  "/img/clients/client-logo-04.png",
  "/img/clients/client-logo-05.png",
  "/img/clients/client-logo-06.png",
];

export const faqs = [
  {
    q: "How do I book an appointment online?",
    a: "Use the Book Appointment button in the header, choose a department, doctor, date and time slot. You'll receive an instant confirmation by email.",
  },
  {
    q: "Do you offer telemedicine?",
    a: "Yes. Several specialties offer secure video consultations — select 'Online Consult' while booking.",
  },
  {
    q: "Are emergency services available?",
    a: "Our ER operates 24/7 with on-call specialists across cardiology, neurology and trauma.",
  },
  {
    q: "Do you accept insurance?",
    a: "We work with most major insurers and TPAs. Please share your policy details at check-in for cashless processing.",
  },
];
