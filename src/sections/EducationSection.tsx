import { motion, useReducedMotion } from 'framer-motion';

import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import type { EducationItem } from '../data/portfolio';

export function EducationSection({ items }: { items: EducationItem[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="education" className="content-section education-section section-wrap">
      <SectionHeading index="04" eyebrow="Learning foundation" title="Built on the fundamentals." description="Engineering education in computer science and software." />
      <div className="education-grid">
        {items.map((item, index) => (
          <motion.article className="education-card" key={`${item.degree}-${item.institution}`} initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}>
            <div className="education-icon"><GraduationCap size={20} aria-hidden="true" /></div>
            <div className="education-meta"><span>{item.period}</span><span>{item.result}</span></div>
            <h3>{item.degree}</h3>
            <p>{item.institution}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}



