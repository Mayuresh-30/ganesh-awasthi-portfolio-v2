import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { getEmailComposeUrl } from '../data/portfolio';
import type { MouseEvent } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Stack' },
  { href: '#experience', label: 'Journey' },
  { href: '#organizations', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function SiteHeader({ email, name }: { email: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [firstName, ...surname] = name.split(' ');

  function handleMobileNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    setPendingHref(href);
    setOpen(false);
  }

  function handleMenuExitComplete() {
    if (!pendingHref) return;

    const target = document.getElementById(pendingHref.slice(1));
    if (target) {
      window.history.pushState(null, '', pendingHref);
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      target.scrollIntoView({ behavior, block: 'start' });
    }

    setPendingHref(null);
  }

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
      <AnimatePresence onExitComplete={handleMenuExitComplete}>
        {open && (
          <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {links.map((link) => <a key={link.href} href={link.href} onClick={(event) => handleMobileNavigation(event, link.href)}>{link.label}</a>)}
            <a href={getEmailComposeUrl(email)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Email {firstName}</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
