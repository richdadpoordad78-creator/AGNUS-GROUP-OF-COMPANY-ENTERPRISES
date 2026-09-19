import { CompanyData, RegistrationItem, GalleryItem, TestimonialItem, FaqItem } from '../types';

export const companyData: CompanyData = {
  companyName: "AGNUS GROUP OF COMPANY ENTERPRISES",
  tagline: "Excellence in Enterprise, Commitment to Quality & Community Leadership",
  address: "Old Karur Road, N S Nagar, Dindigul, Tamil Nadu - 624001",
  city: "Dindigul",
  state: "Tamil Nadu",
  pincode: "624001",
  contact: {
    phone: "8778333526",
    phoneFormatted: "+91 87783 33526",
    officePhone: "9655133564",
    officePhoneFormatted: "+91 96551 33564",
    email: "agnusgroup057@gmail.com"
  },
  registrations: {
    gstNo: "33DHEPM0071H1ZO",
    isoNo: "INQ209016/8016",
    msmeNo: "UDYAM-TN-06-0030256",
    fssai: "2241904200630"
  },
  location: {
    latitude: 10.389104789737106,
    longitude: 77.99487687503647,
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3060.8341255351324!2d77.99487687503647!3d10.389104789737106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDIzJzIwLjgiTiA3N8KwNTknNTAuOCJF!5e1!3m2!1sen!2sin!4v1789723527497!5m2!1sen!2sin"
  },
  assets: {
    branding: {
      logo: "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/logo.jpeg?raw=true",
      office: "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/office.jpeg?raw=true"
    },
    management: {
      seniorManagerAnjaliNayar: "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/seniour%20manager%20ajnali%20nayar.jpg?raw=true"
    },
    team: [
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/team1.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/team2.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/team3.jpeg?raw=true"
    ],
    events: [
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event1.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event2.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event3.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event4.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event5.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event6.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event7.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event8.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event9.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event10.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event11.jpeg?raw=true",
      "https://github.com/rmccollage/AGNUS-GROUP-OF-COMPANY-assets/blob/main/event12.jpeg?raw=true"
    ]
  }
};

export const corporateRegistrations: RegistrationItem[] = [
  {
    id: "gst",
    title: "GST Registration",
    code: "33DHEPM0071H1ZO",
    authority: "Goods and Services Tax Network, Govt. of India (TN State 33)",
    description: "Officially registered taxpayer entity authorized for inter-state and intra-state commercial operations across India.",
    status: "Active & Verified",
    badgeColor: "emerald"
  },
  {
    id: "iso",
    title: "ISO Certification",
    code: "INQ209016/8016",
    authority: "International Organization for Standardization Accredited Body",
    description: "Certified for standardized quality management, operational safety protocols, and rigorous business process adherence.",
    status: "Certified & Audited",
    badgeColor: "blue"
  },
  {
    id: "msme",
    title: "MSME Udyam Registration",
    code: "UDYAM-TN-06-0030256",
    authority: "Ministry of Micro, Small & Medium Enterprises, Govt. of India",
    description: "Recognized MSME enterprise in Tamil Nadu region contributing to sustainable regional employment and industrial growth.",
    status: "Government Recognized",
    badgeColor: "amber"
  },
  {
    id: "fssai",
    title: "FSSAI License",
    code: "2241904200630",
    authority: "Food Safety and Standards Authority of India",
    description: "Statutory license validating food safety, hygiene protocols, and consumer health standards conformity.",
    status: "Licensed & Compliant",
    badgeColor: "teal"
  }
];

export const corporateEvents: GalleryItem[] = [
  {
    id: 1,
    title: "Annual Grand Corporate Gala",
    category: "Annual Event",
    image: companyData.assets.events[0],
    date: "Annual Assembly",
    description: "Commemorating organizational milestones, team achievements, and outstanding dedication among all branches."
  },
  {
    id: 2,
    title: "Corporate Celebration & Award Ceremony",
    category: "Celebration",
    image: companyData.assets.events[1],
    date: "Company Celebration",
    description: "Recognizing high performance, long-standing employee commitment, and operational excellence."
  },
  {
    id: 3,
    title: "Strategic Management Leadership Summit",
    category: "Corporate Milestone",
    image: companyData.assets.events[2],
    date: "Leadership Conference",
    description: "Management symposium charting expansion roadmaps and service quality enhancements."
  },
  {
    id: 4,
    title: "Festival Celebration & Cultural Meet",
    category: "Celebration",
    image: companyData.assets.events[3],
    date: "Festive Assembly",
    description: "Bringing together the company family in traditional harmony and celebratory festive spirit."
  },
  {
    id: 5,
    title: "Team Building & Skill Enrichment Workshop",
    category: "Team Gathering",
    image: companyData.assets.events[4],
    date: "Training Program",
    description: "Upskilling staff with best operational methodologies and collaborative team exercises."
  },
  {
    id: 6,
    title: "Executive Recognition & Honors Banquet",
    category: "Annual Event",
    image: companyData.assets.events[5],
    date: "Awards Evening",
    description: "Honoring visionary team members and operational drivers who shape the Agnus Group legacy."
  },
  {
    id: 7,
    title: "Regional Partners & Community Meet",
    category: "Corporate Milestone",
    image: companyData.assets.events[6],
    date: "Partnership Forum",
    description: "Fostering long-term relationships with local vendors, distributors, and community stakeholders in Dindigul."
  },
  {
    id: 8,
    title: "Group Milestones Commemoration",
    category: "Celebration",
    image: companyData.assets.events[7],
    date: "Milestone Day",
    description: "Celebrating institutional growth and customer satisfaction achievements over the operational year."
  },
  {
    id: 9,
    title: "Departmental Coordination & Review",
    category: "Team Gathering",
    image: companyData.assets.events[8],
    date: "Review Meet",
    description: "Synchronizing operations between logistics, quality management, administrative, and frontline teams."
  },
  {
    id: 10,
    title: "Annual Staff Appreciation Gathering",
    category: "Annual Event",
    image: companyData.assets.events[9],
    date: "Staff Appreciation",
    description: "A heartfelt ceremony expressing gratitude to all staff members for their relentless work ethic."
  },
  {
    id: 11,
    title: "Youth Leadership & Field Excellence",
    category: "Team Gathering",
    image: companyData.assets.events[10],
    date: "Field Meet",
    description: "Encouraging emerging young leaders to embrace leadership challenges and community initiatives."
  },
  {
    id: 12,
    title: "Year-End Grand Assembly & Future Vision",
    category: "Corporate Milestone",
    image: companyData.assets.events[11],
    date: "Vision Assembly",
    description: "Unveiling new technological and operational horizons for AGNUS GROUP OF COMPANY ENTERPRISES."
  }
];

export const teamDepartments = [
  {
    id: "team1",
    name: "Operations & Quality Assurance",
    image: companyData.assets.team[0],
    highlight: "Process Excellence & Rigorous Quality Standards",
    description: "Honoring our Operations & Quality team for outstanding performance and compliance standards."
  },
  {
    id: "team2",
    name: "Client Relations & Business Development",
    image: companyData.assets.team[1],
    highlight: "Client Satisfaction & Strategic Partnerships",
    description: "Collaborating closely to nurture trusted partnerships and exceptional regional client satisfaction."
  },
  {
    id: "team3",
    name: "Administration & Field Operations",
    image: companyData.assets.team[2],
    highlight: "Reliable Distribution & Rapid Field Execution",
    description: "Managing administrative coordination, corporate governance, and essential internal support."
  }
];

export const clientTestimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Afsal Rahman",
    quote: "Excellent product quality and reliable service. The team was professional and responsive throughout.",
    highlight: "Professionalism & Responsiveness",
    role: "Client Partner"
  },
  {
    id: 2,
    name: "Fathima Shirin",
    quote: "Very happy with the overall experience. The products are of great quality and delivered on time.",
    highlight: "Timely Delivery & Quality",
    role: "Verified Client"
  },
  {
    id: 3,
    name: "Niyas Ahmed",
    quote: "Good-quality products and dependable service. Everything was handled smoothly and efficiently.",
    highlight: "Smooth & Efficient Execution",
    role: "Commercial Partner"
  },
  {
    id: 4,
    name: "Shahana Kareem",
    quote: "Impressed with the product quality and customer support. They understood our requirements perfectly.",
    highlight: "Customer Support & Precision",
    role: "Business Associate"
  },
  {
    id: 5,
    name: "Junaid Basheer",
    quote: "Professional team, quality products, and quick support. A great experience overall.",
    highlight: "Quick Support & Team Excellence",
    role: "Verified Client"
  },
  {
    id: 6,
    name: "Sameera Nazeer",
    quote: "Reliable service and consistent quality. We are very satisfied with the overall experience.",
    highlight: "Consistent Quality & Reliability",
    role: "Long-term Partner"
  }
];

export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "What products do you offer?",
    answer: "We offer a range of quality products designed to meet the needs of businesses and customers, with a focus on reliability and consistent standards."
  },
  {
    id: 2,
    question: "Do you provide delivery services?",
    answer: "Yes, we provide reliable delivery and distribution services to ensure products reach customers safely and on time."
  },
  {
    id: 3,
    question: "How can I place an order?",
    answer: "You can contact our team through the website or available contact details to discuss your requirements and place an order."
  },
  {
    id: 4,
    question: "Do you accept bulk orders?",
    answer: "Yes, we can accommodate bulk and business orders. Contact our team to discuss your quantity and specific requirements."
  },
  {
    id: 5,
    question: "How can I get more information about a product?",
    answer: "You can contact our support team for detailed product information, availability, pricing, and other requirements."
  },
  {
    id: 6,
    question: "How can I contact your team?",
    answer: "You can reach us through the contact form, phone number, or email provided on our website. Our team will be happy to assist you."
  }
];
