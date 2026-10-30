export function SiteFooter({ name }: { name: string }) {
  const initials = name.split(' ').map((part) => part[0]).join('');
  return (
    <footer className="site-footer section-wrap">
      <a className="footer-mark" href="#top" aria-label="Back to top">{initials}<span>© 2026</span></a>
      <p>Designed with intention. Built with curiosity.</p>
    </footer>
  );
}


