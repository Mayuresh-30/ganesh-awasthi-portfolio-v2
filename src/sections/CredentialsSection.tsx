import { motion, useReducedMotion } from 'framer-motion';

import { ArrowUpRight, Award, BadgeCheck } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import type { Credential } from '../data/portfolio';

export function CredentialsSection({ credentials }: { credentials: Credential[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="credentials" className="content-section credentials-section section-wrap">
      <SectionHeading index="06" eyebrow="Recognition & learning" title="Credentials earned along the way." description="Certifications, current learning, and recognition recorded in the resume." />
      <div className="credential-grid">
        {credentials.map((credential, index) => {
          const Icon = credential.kind === 'Certification' ? BadgeCheck : Award;
          const proofUrls = credential.proof_urls ?? [];
          return (
            <motion.article className="education-card credential-card" key={credential.title} initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.5, delay: reduceMotion ? 0 : (index % 3) * 0.07 }}>
              <div className="education-icon"><Icon size={19} aria-hidden="true" /></div>
              <div className="education-meta"><span>{credential.kind}</span>{credential.status && <span className={credential.status === 'In progress' ? 'credential-status in-progress' : 'credential-status'}>{credential.status}</span>}</div>
              <h3>{credential.title}</h3>
              <p>{credential.description}</p>
              {proofUrls.length > 0 && (
                <div className="credential-proof-links">
                  {proofUrls.map((url, proofIndex) => (
                    <a className="credential-proof-link" href={url} key={url} target="_blank" rel="noopener noreferrer">
                      {proofUrls.length > 1 ? `LinkedIn post ${proofIndex + 1}` : 'View LinkedIn post'}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

