import { motion, useReducedMotion } from 'framer-motion';

import { BrandIcon } from '../components/BrandIcon';
import { SectionHeading } from '../components/SectionHeading';
import type { Skill } from '../data/portfolio';

const categories = ['Languages & Frameworks', 'Cloud & DevOps', 'Concepts', 'Tools & OS'];

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <section id="skills" className="content-section skills-section section-wrap">
      <SectionHeading index="02" eyebrow="Tools I use" title="My working toolkit." description="Languages, cloud services, and engineering practices from the resume." />
      <div className="skill-groups">
        {categories.map((category, groupIndex) => {
          const items = skills.filter((skill) => skill.category === category).sort((a, b) => (a.sort_order ?? a.id) - (b.sort_order ?? b.id));
          if (!items.length) return null;
          return (
            <motion.div className="skill-group" key={category} initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: reduceMotion ? 0 : groupIndex * 0.06 }}>
              <div className="skill-group-label"><span className="skill-group-index">0{groupIndex + 1}</span><h3>{category}</h3></div>
              <div className="skill-list">
                {items.map((skill) => <div className="skill-badge" key={skill.id}><BrandIcon iconKey={skill.icon_key} label={skill.name} /><span>{skill.name}</span></div>)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}



