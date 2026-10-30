import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { getEmailComposeUrl } from '../data/portfolio';
import type { Profile } from '../data/portfolio';

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="contact-section section-wrap">
      <div className="contact-panel">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="section-kicker"><span className="section-index">07</span><span>Open to good opportunities</span></div>
        <h2>Have something<br /><span className="text-accent">worth building?</span></h2>
        <p>Connect with Ganesh about Java development, enterprise systems, or a new opportunity.</p>
        <a className="button button-primary contact-email" href={getEmailComposeUrl(profile.email)} target="_blank" rel="noopener noreferrer"><Mail size={17} /> {profile.email} <ArrowUpRight size={16} /></a>
        <div className="contact-socials">
          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a>
          <a href={`tel:${profile.phone}`}><Phone size={16} /> {profile.phone}</a>
          <span className="contact-location"><MapPin size={16} /> {profile.location}</span>
          {profile.github_url && <a href={profile.github_url} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a>}
        </div>
      </div>
    </section>
  );
}



