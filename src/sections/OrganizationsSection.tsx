import { motion, useReducedMotion } from 'framer-motion';

import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import type { Organization } from '../data/portfolio';

export function OrganizationsSection({ organizations }: { organizations: Organization[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="organizations" className="content-section projects-section section-wrap">
      <SectionHeading index="05" eyebrow="Community work" title="Organizations I’ve supported." description="Ganesh has worked with and contributed his potential to these NGOs." />
      <div className="organization-list">
        {organizations.map((organization, index) => (
          <motion.article className="project-card organization-card" key={organization.url} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }} whileHover={reduceMotion ? undefined : { y: -4 }}>
            <div className="project-number">0{index + 1}</div>
            <div className="project-main">
              <div className="project-topline"><span className="status-pill">NGO</span><span className="project-subtitle">Community organization</span></div>
              <h3>{organization.name}</h3>
              <p className="project-description">Organization included in Ganesh’s NGO work.</p>
            </div>
            <div className="project-side">
              <div className="project-glyph" aria-hidden="true"><span>{organization.name.slice(0, 2).toUpperCase()}</span></div>
              <a className="project-link" href={organization.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${organization.name}`}>
                Visit website <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}



