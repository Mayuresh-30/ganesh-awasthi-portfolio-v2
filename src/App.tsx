import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { CredentialsSection } from './sections/CredentialsSection';
import { EducationSection } from './sections/EducationSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { HeroSection } from './sections/HeroSection';
import { OrganizationsSection } from './sections/OrganizationsSection';
import { SkillsSection } from './sections/SkillsSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { PORTFOLIO } from './data/portfolio';

export default function App() {
  const { profile, skills, organizations, credentials } = PORTFOLIO;
  return (
    <div className="site-shell">
      <div className="ambient-glow ambient-glow-top" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-bottom" aria-hidden="true" />
      <SiteHeader email={profile.email} name={profile.name} />
      <main>
        <HeroSection profile={profile} />
        <AboutSection bio={profile.bio} />
        <SkillsSection skills={skills} />
        <ExperienceSection items={profile.experience} />
        <EducationSection items={profile.education} />
        <OrganizationsSection organizations={organizations} />
        <CredentialsSection credentials={credentials} />
        <ContactSection profile={profile} />
      </main>
      <SiteFooter name={profile.name} />
    </div>
  );
}


