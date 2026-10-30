import { motion, useReducedMotion } from 'framer-motion';

import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { getEmailComposeUrl } from '../data/portfolio';
import type { Profile } from '../data/portfolio';

export function HeroSection({ profile }: { profile: Profile }) {
  const reduceMotion = useReducedMotion();
  return (
    <section className="hero-section section-wrap" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <motion.div className="eyebrow hero-eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="eyebrow-line" /> JAVA + ENTERPRISE ENGINEERING
        </motion.div>
        <motion.h1 id="hero-title" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
          Building secure<br />systems at<br /><span className="text-accent">enterprise scale.</span>
        </motion.h1>
        <motion.div className="hero-intro" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}>
          <p className="hero-name">I’m {profile.name} <span className="hero-separator">/</span> {profile.title}</p>
        </motion.div>
        <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }}>
          <a className="button button-primary" href="#experience">Explore my experience <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a className="button button-quiet" href={getEmailComposeUrl(profile.email)} target="_blank" rel="noopener noreferrer"><Mail size={16} aria-hidden="true" /> Get in touch</a>
        </motion.div>
        <motion.div className="social-row" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.38 }}>
          {profile.github_url && <a href={profile.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github size={17} /><span>GitHub</span></a>}
          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /><span>LinkedIn</span></a>
          <a href={getEmailComposeUrl(profile.email)} target="_blank" rel="noopener noreferrer" aria-label="Email Ganesh"><Mail size={17} /><span>Email</span></a>
        </motion.div>
      </div>
      <div className="hero-portrait-wrap">
        <div className="portrait-orbit portrait-orbit-one" aria-hidden="true" />
        <div className="portrait-orbit portrait-orbit-two" aria-hidden="true" />
        <div className="portrait-frame">
          <img src={profile.image_path} alt={`Portrait of ${profile.name}`} fetchPriority="high" />
        </div>
        <div className="portrait-caption"><span className="caption-dot" /> JAVA ENGINEERING <span>·</span> BUILT FOR RELIABILITY</div>
      </div>
      <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} aria-hidden="true" /></a>
    </section>
  );
}
