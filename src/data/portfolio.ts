import portfolio from './portfolio.json';

export interface Skill {
  id: number;
  name: string;
  category: string;
  icon_key?: string | null;
  sort_order?: number;
}

export interface Organization {
  name: string;
  url: string;
}

export interface Credential {
  kind: 'Certification' | 'Recognition';
  title: string;
  description: string;
  status?: 'Certified' | 'In progress';
  proof_urls?: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  client?: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
  company_logo_path?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  result: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin_url: string;
  github_url: string | null;
  bio: string;
  image_path: string;
  experience: ExperienceItem[];
  education: EducationItem[];
}

export interface PortfolioPayload {
  profile: Profile;
  skills: Skill[];
  organizations: Organization[];
  credentials: Credential[];
}

export const PORTFOLIO = portfolio as PortfolioPayload;

export function getEmailComposeUrl(email: string, subject = 'Portfolio inquiry') {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: email, su: subject });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
