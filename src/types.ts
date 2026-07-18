export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface ConsultationResponse {
  analysis: string;
  techStack: string[];
}

export enum SectionId {
  HERO = "hero",
  SERVICES = "services",
  CONTACT = "contact",
}
