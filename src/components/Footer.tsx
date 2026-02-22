const Footer = () => (
  <footer className="py-10 text-center border-t border-border/30">
    <p className="text-sm text-muted-foreground">
      © {new Date().getFullYear()}{" "}
      <span className="footer-name-gradient">Sanjay Dharmarajou</span>.
      Engineered with{" "}
      <span className="footer-heart" aria-label="love">♥</span>
      {" "}and precision.
    </p>
  </footer>
);
export default Footer;
