import { motion, useReducedMotion } from 'framer-motion';

import { ArrowUpRight, BrainCircuit, ShieldCheck, Workflow } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

const principles = [
  { icon: ShieldCheck, number: '01', title: 'Secure by design', text: 'Building services that securely process sensitive policy data.' },
  { icon: BrainCircuit, number: '02', title: 'Reliable systems', text: 'Improving production stability through defect resolution and data quality.' },
  { icon: Workflow, number: '03', title: 'End-to-end delivery', text: 'Working across APIs, cloud deployment, CI/CD, and responsive interfaces.' },
];

export function AboutSection({ bio }: { bio: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="about" className="content-section section-wrap">
      <SectionHeading index="01" eyebrow="A little about me" title="Engineering for reliability." description="Java development and enterprise systems, shaped by hands-on delivery." />
      <div className="about-layout">
        <motion.div className="about-copy" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}>
          <p className="about-bio">{bio}</p>
          <a className="text-link" href="#organizations">See selected work <ArrowUpRight size={15} /></a>
        </motion.div>
        <div className="principle-list">
          {principles.map(({ icon: Icon, number, title, text }, index) => (
            <motion.article className="principle-item" key={number} initial={reduceMotion ? false : { opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.08 }}>
              <span className="principle-number">{number}</span>
              <div className="principle-icon"><Icon size={17} aria-hidden="true" /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}



