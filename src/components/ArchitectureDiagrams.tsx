/**
 * Pure SVG architecture diagrams — responsive, theme-aware, lightweight.
 * Text is properly contained within boxes with flex-style centering.
 */

const boxW = 240;
const boxRad = 10;
const padX = 12;
const lineH = 16;

const colors = {
  fill: "hsl(var(--card) / 0.6)",
  stroke: "hsl(var(--border))",
  strokeAccent: "hsl(var(--accent) / 0.5)",
  text: "hsl(var(--foreground))",
  textMuted: "hsl(var(--muted-foreground))",
  connector: "hsl(var(--primary) / 0.35)",
  arrowHead: "hsl(var(--primary) / 0.5)",
};

function boxH(items: string[]) {
  return 30 + Math.max(items.length, 0) * lineH + 8;
}

function renderBox(
  x: number, y: number, w: number,
  title: string, items: string[], accent = false
) {
  const h = boxH(items);
  return (
    <g key={`box-${title}-${y}`}>
      <rect
        x={x} y={y} width={w} height={h} rx={boxRad}
        fill={colors.fill}
        stroke={accent ? colors.strokeAccent : colors.stroke}
        strokeWidth={1.2}
      />
      <text
        x={x + w / 2} y={y + 20}
        textAnchor="middle" fontSize={12} fontWeight={600}
        fill={colors.text}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
      </text>
      {items.map((item, i) => (
        <text
          key={i}
          x={x + padX} y={y + 36 + i * lineH}
          fontSize={10}
          fill={colors.textMuted}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          • {item.length > 34 ? item.slice(0, 32) + "…" : item}
        </text>
      ))}
    </g>
  );
}

function renderArrow(x1: number, y1: number, x2: number, y2: number, key: string) {
  return (
    <line
      key={key}
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={colors.connector}
      strokeWidth={1.2}
      markerEnd="url(#diag-arrowhead)"
    />
  );
}

const DiagramWrapper = ({ children, viewBox, title }: { children: React.ReactNode; viewBox: string; title: string }) => (
  <div className="w-full">
    <p className="text-xs text-muted-foreground mb-2 font-mono tracking-wider uppercase">{title}</p>
    <svg
      viewBox={viewBox}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      style={{ maxHeight: 520 }}
    >
      <defs>
        <marker id="diag-arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="none" stroke={colors.arrowHead} strokeWidth="1" />
        </marker>
      </defs>
      {children}
    </svg>
  </div>
);

/* ── ResumeLens-AI ───────────────────────────────────────────────────────── */

export const ResumeLensDiagram = () => {
  const w = 280;
  const cx = 110, mid = cx + w / 2;
  const items1 = ["Student / Job Seeker"];
  const items2 = ["PDF Upload", "Trigger Analysis", "ATS Score / Skill Match %", "Readability Score", "Improvement Suggestions"];
  const items3 = ["PyPDF2 PDF Text Extraction", "Text Cleaning & Preprocessing"];
  const items4 = ["Model: llama-3.3-70b-versatile", "High-Performance Cloud Inference", "Skill Extraction", "ATS Keyword Matching", "Readability Evaluation", "Context-Aware Content Feedback"];
  const items5 = ["Structured AI Analysis Report", "Score Breakdown", "Actionable Improvement Suggestions"];

  let y = 10;
  const y1 = y; y += boxH(items1) + 15;
  const y2 = y; y += boxH(items2) + 15;
  const y3 = y; y += boxH(items3) + 15;
  const y4 = y; y += boxH(items4) + 15;
  const y5 = y; y += boxH(items5);

  return (
    <DiagramWrapper viewBox={`0 0 500 ${y + 10}`} title="ResumeLens-AI Architecture">
      {renderBox(cx, y1, w, "User Layer", items1)}
      {renderArrow(mid, y1 + boxH(items1), mid, y2, "a1")}
      {renderBox(cx, y2, w, "Streamlit UI", items2)}
      {renderArrow(mid, y2 + boxH(items2), mid, y3, "a2")}
      {renderBox(cx, y3, w, "Resume Parser (Python)", items3)}
      {renderArrow(mid, y3 + boxH(items3), mid, y4, "a3")}
      {renderBox(cx, y4, w, "Groq API \u2014 LLaMA 3.3 (70B)", items4, true)}
      {renderArrow(mid, y4 + boxH(items4), mid, y5, "a4")}
      {renderBox(cx, y5, w, "Report Generation (ReportLab)", items5)}
    </DiagramWrapper>
  );
};

/* ── NourishNet ──────────────────────────────────────────────────────────── */

export const NourishNetDiagram = () => {
  const cx = 130, mid = cx + boxW / 2;
  const items1 = ["Donor / Requester"];
  const items2 = ["Share Food / Browse & Request", "Ratings / Notifications", "Vite Build"];
  const items3 = ["Email/Password / JWT Session"];
  const items4 = ["Users / Food Posts", "Requests / Ratings", "Status Tracking"];
  const items5 = ["Subscriptions / Live Updates"];
  const items6: string[] = ["Vercel"];

  let y = 10;
  const y1 = y; y += boxH(items1) + 15;
  const y2 = y; y += boxH(items2) + 15;
  const y3 = y; y += boxH(items3) + 15;
  const y4 = y; y += boxH(items4) + 15;
  const y5 = y; y += boxH(items5) + 15;
  const y6 = y; y += boxH(items6);

  return (
    <DiagramWrapper viewBox={`0 0 500 ${y + 10}`} title="NourishNet System Architecture">
      {renderBox(cx, y1, boxW, "Users", items1)}
      {renderArrow(mid, y1 + boxH(items1), mid, y2, "a1")}
      {renderBox(cx, y2, boxW, "Frontend (React + TS)", items2)}
      {renderArrow(mid, y2 + boxH(items2), mid, y3, "a2")}
      {renderBox(cx, y3, boxW, "Auth (Supabase)", items3)}
      {renderArrow(mid, y3 + boxH(items3), mid, y4, "a3")}
      {renderBox(cx, y4, boxW, "PostgreSQL Database", items4, true)}
      {renderArrow(mid, y4 + boxH(items4), mid, y5, "a4")}
      {renderBox(cx, y5, boxW, "Realtime", items5)}
      {renderArrow(mid, y5 + boxH(items5), mid, y6, "a5")}
      {renderBox(cx, y6, boxW, "Deployment", items6)}
    </DiagramWrapper>
  );
};

/* ── StudyPulse ──────────────────────────────────────────────────────────── */

export const StudyPulseDiagram = () => {
  const mid = 250;
  const cx = mid - boxW / 2;
  const items1 = ["Students / Teachers / Admin"];
  const items2 = ["Tailwind CSS", "Student / Teacher / Admin Dash"];
  const items3 = ["Focus Tracking / Site Detection", "Sync Performance Data"];
  const items4 = ["Role-Based Auth / JWT"];
  const items5 = ["Users / Classrooms", "Assignments / Quiz Results", "Focus Logs / Messages"];
  const items6 = ["Live Updates / Messaging", "Notifications"];
  const items7 = ["Assignment Files / Resources"];

  let y = 10;
  const y1 = y; y += boxH(items1) + 15;
  // Two side-by-side boxes
  const sideW = 210;
  const y2 = y;
  const maxSide = Math.max(boxH(items2), boxH(items3));
  y += maxSide + 15;
  const y4 = y; y += boxH(items4) + 15;
  const y5 = y; y += boxH(items5) + 15;
  const y6 = y; y += boxH(items6) + 15;
  const y7 = y; y += boxH(items7);

  return (
    <DiagramWrapper viewBox={`0 0 500 ${y + 10}`} title="StudyPulse Architecture">
      {renderBox(mid - boxW / 2, y1, boxW, "Users", items1)}
      {renderArrow(mid, y1 + boxH(items1), mid - 60, y2, "a1")}
      {renderArrow(mid, y1 + boxH(items1), mid + 60, y2, "a1b")}
      {renderBox(20, y2, sideW, "Web App (React + TS)", items2)}
      {renderBox(270, y2, sideW, "Chrome Extension", items3)}
      {renderArrow(20 + sideW / 2, y2 + maxSide, mid, y4, "a2")}
      {renderArrow(270 + sideW / 2, y2 + maxSide, mid, y4, "a3")}
      {renderBox(cx, y4, boxW, "Auth (Supabase)", items4)}
      {renderArrow(mid, y4 + boxH(items4), mid, y5, "a4")}
      {renderBox(cx, y5, boxW, "Database", items5, true)}
      {renderArrow(mid, y5 + boxH(items5), mid, y6, "a5")}
      {renderBox(cx, y6, boxW, "Realtime Engine", items6)}
      {renderArrow(mid, y6 + boxH(items6), mid, y7, "a6")}
      {renderBox(cx, y7, boxW, "Storage", items7)}
    </DiagramWrapper>
  );
};

/* ── IntelliVox ──────────────────────────────────────────────────────────── */

export const IntelliVoxDiagram = () => {
  const cx = 130, mid = cx + boxW / 2;
  const items1: string[] = [];
  const items2 = ["Real-time Chat", "Streaming Responses", "Conversation History", "Usage Analytics"];
  const items3 = ["Primary: Groq API", "Fallback: Pollinations API", "Automatic Failover"];
  const items4 = ["JWT Sessions / Role-Based Auth"];
  const items5 = ["Users / Conversations", "Message Logs / Usage Metrics", "Live Chat Sync / Streaming UI"];

  let y = 10;
  const y1 = y; y += boxH(items1) + 15;
  const y2 = y; y += boxH(items2) + 15;
  const y3 = y; y += boxH(items3) + 15;
  const y4 = y; y += boxH(items4) + 15;
  const y5 = y; y += boxH(items5);

  return (
    <DiagramWrapper viewBox={`0 0 500 ${y + 10}`} title="IntelliVox AI Architecture">
      {renderBox(cx, y1, boxW, "User", items1)}
      {renderArrow(mid, y1 + boxH(items1), mid, y2, "a1")}
      {renderBox(cx, y2, boxW, "Web App (React + TS)", items2)}
      {renderArrow(mid, y2 + boxH(items2), mid, y3, "a2")}
      {renderBox(cx, y3, boxW, "AI Request Manager", items3, true)}
      {renderArrow(mid, y3 + boxH(items3), mid, y4, "a3")}
      {renderBox(cx, y4, boxW, "Auth (Supabase)", items4)}
      {renderArrow(mid, y4 + boxH(items4), mid, y5, "a4")}
      {renderBox(cx, y5, boxW, "Database + Realtime", items5)}
    </DiagramWrapper>
  );
};
