export interface CompanyData {
  companyName: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contact: {
    phone: string;
    phoneFormatted: string;
    officePhone: string;
    officePhoneFormatted: string;
    email: string;
  };
  registrations: {
    gstNo: string;
    isoNo: string;
    msmeNo: string;
    fssai: string;
  };
  location: {
    latitude: number;
    longitude: number;
    mapsEmbedUrl: string;
  };
  assets: {
    branding: {
      logo: string;
      office: string;
    };
    management: {
      seniorManagerAnjaliNayar: string;
    };
    team: string[];
    events: string[];
  };
}

export interface RegistrationItem {
  id: string;
  title: string;
  code: string;
  authority: string;
  description: string;
  status: string;
  badgeColor: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: 'Celebration' | 'Team Gathering' | 'Corporate Milestone' | 'Annual Event';
  image: string;
  date: string;
  description: string;
}

export interface ContactMessage {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  quote: string;
  highlight?: string;
  role?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}
