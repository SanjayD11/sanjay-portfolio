/**
 * Reusable keyword capsule — hover glow on desktop, tap feedback on mobile.
 * Uses only transform, opacity, box-shadow transitions (GPU-friendly).
 */
const Keyword = ({ children }: { children: React.ReactNode }) => (
  <span className="keyword">{children}</span>
);

export default Keyword;
