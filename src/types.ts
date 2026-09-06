export type PageType = 'home' | 'about' | 'services' | 'service-detail' | 'contact';

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  category: string;
  symptoms: string[];
  treatmentApproach: string[];
  whenToConsult: string[];
  iconName: string;
  procedures?: string[];
  detailedOverview?: string;
  commonCauses?: string[];
  diagnosticSteps?: string[];
  surgicalOptions?: string[];
  recoveryTimeline?: string;
  faqs?: ServiceFaq[];
}

export interface ProblemItem {
  id: string;
  title: string;
  category: 'Ear' | 'Nose' | 'Throat' | 'General';
  description: string;
  iconName: string;
  commonSigns: string;
}

export interface ReviewItem {
  id: string;
  patientName: string;
  location: string;
  rating: number;
  condition: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface AppointmentFormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  service: string;
  preferredDate?: string;
  message?: string;
}
