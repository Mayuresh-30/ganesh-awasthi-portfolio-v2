import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { getEmailComposeUrl } from '../data/portfolio';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Stack' },
  { href: '#experience', label: 'Journey' },
  { href: '#organizations', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function SiteHeader({ email, name }: { email: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [firstName, ...surname] = name.split(' ');
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#top" aria-label={`${name} home`}>
          <span className="wordmark-name">{firstName.toUpperCase()}<br /><b>{surname.join(' ').toUpperCase()}</b></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="header-cta" href={getEmailComposeUrl(email)} target="_blank" rel="noopener noreferrer">
          Let’s talk <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <button className="mobile-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
            <a href={getEmailComposeUrl(email)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Email {firstName}</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}


