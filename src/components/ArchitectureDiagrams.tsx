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
  const sideW = 200;
  const cx = 220, mid = cx + w / 2;
  
  const items1 = ["Student / Job Seeker"];
  const items2 = [
    "PDF/TXT Upload",
    "Job Description Input",
    "Analyze / Rewrite / Interview Modes",
    "Real-time Score Visualization",
    "Radar Chart (Matplotlib)",
    "Download AI Report (PDF)"
  ];
  const items3 = [
    "PyPDF2 Text Extraction",
    "Text Cleaning & Preprocessing",
    "Section Detection (Skills/Exp/Edu)",
    "Tokenization & Regex Parsing"
  ];
  const itemsLocal = [
    "ATS Score Calculation (Rule-Based)",
    "Skill Match (JD vs Resume)",
    "Readability Score (Heuristic)",
    "Keyword Extraction"
  ];
  const items4 = [
    "Model: LLaMA 3.3 70B (Groq)",
    "Resume Analysis & Feedback",
    "Resume Rewriting (ATS Optimized)",
    "Interview Question Generation",
    "Context-Aware Suggestions"
  ];
  const items5 = [
    "PDF Report Generation",
    "Score Breakdown (ATS/Skill/Read)",
    "AI Feedback Summary",
    "Keyword Insights"
  ];
  
  const itemsPrompt = [
    "Analysis Prompt",
    "Resume Rewrite Prompt",
    "Interview Question Prompt",
    "Dynamic Context Injection"
  ];
  
  const itemsVis = [
    "Radar Chart (Matplotlib)",
    "Score Distribution"
  ];

  let y = 10;
  const y1 = y; y += boxH(items1) + 20;
  const y2 = y; y += boxH(items2) + 25;
  const y3 = y; y += boxH(items3) + 25;
  const yLocal = y; y += boxH(itemsLocal) + 25;
  const y4 = y; y += boxH(items4) + 25;
  const y5 = y; y += boxH(items5) + 20;
  
  const yVis = yLocal;
  const yPrompt = y4;

  return (
    <DiagramWrapper viewBox={`0 0 720 ${y + 10}`} title="ResumeLens-AI Architecture">
      {renderBox(cx, y1, w, "User Layer", items1)}
      {renderArrow(mid, y1 + boxH(items1), mid, y2, "a1")}
      
      {renderBox(cx, y2, w, "Streamlit UI", items2)}
      {renderArrow(mid, y2 + boxH(items2), mid, y3, "a2")}
      
      {renderBox(cx, y3, w, "Resume Processing Engine (Python)", items3)}
      {renderArrow(mid, y3 + boxH(items3), mid, yLocal, "a3")}
      <text x={mid + 5} y={y3 + boxH(items3) + 14} fontSize={9} fill={colors.textMuted}>Extracted Resume Text</text>

      <g>
        <rect x={cx} y={yLocal} width={w} height={boxH(itemsLocal)} rx={boxRad} fill={colors.fill} stroke="hsl(210 60% 60% / 0.6)" strokeWidth={1.5} />
        <text x={mid} y={yLocal + 20} textAnchor="middle" fontSize={12} fontWeight={600} fill="hsl(210 80% 80%)" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Local Analysis Engine</text>
        {itemsLocal.map((item, i) => (
          <text key={i} x={cx + padX} y={yLocal + 36 + i * lineH} fontSize={10} fill={colors.textMuted} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>• {item}</text>
        ))}
      </g>
      {renderArrow(mid, yLocal + boxH(itemsLocal), mid, y4, "alocal")}
      <text x={mid + 5} y={yLocal + boxH(itemsLocal) + 14} fontSize={9} fill={colors.textMuted}>Rule-Based Scoring</text>

      {renderBox(10, yVis, sideW, "Visualization Engine", itemsVis)}
      {renderArrow(cx, yLocal + 20, 10 + sideW, yVis + 20, "local_vis")}
      {renderArrow(10 + sideW / 2, yVis, cx + 20, y2 + boxH(items2), "vis_ui")}
      
      <g>
        <rect x={cx} y={y4} width={w} height={boxH(items4)} rx={boxRad} fill={colors.fill} stroke="hsl(270 70% 70% / 0.6)" strokeWidth={1.5} />
        <text x={mid} y={y4 + 20} textAnchor="middle" fontSize={12} fontWeight={600} fill="hsl(270 80% 80%)" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AI Reasoning Layer (Groq LPU Inference)</text>
        {items4.map((item, i) => (
          <text key={i} x={cx + padX} y={y4 + 36 + i * lineH} fontSize={10} fill={colors.textMuted} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>• {item}</text>
        ))}
      </g>
      {renderArrow(mid, y4 + boxH(items4), mid, y5, "a4")}
      <text x={mid + 5} y={y4 + boxH(items4) + 14} fontSize={9} fill={colors.textMuted}>Structured Output</text>
      
      {renderBox(cx + w + 20, yPrompt, sideW, "Prompt Orchestration", itemsPrompt)}
      {renderArrow(cx + w + 20, yPrompt + 20, cx + w, y4 + 20, "prompt_ai")}
      
      <path d={`M ${cx + w} ${y2 + 40} C ${cx + w + 70} ${y2 + 40}, ${cx + w + 70} ${y4 + 60}, ${cx + w} ${y4 + 60}`} fill="none" stroke={colors.connector} strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#diag-arrowhead)" />
      <text x={cx + w + 10} y={y2 + 80} fontSize={9} fill={colors.connector}>AI Inference (Groq LPU)</text>

      <path d={`M ${cx} ${yLocal + 40} C ${cx - 50} ${yLocal + 40}, ${cx - 50} ${y2 + 50}, ${cx} ${y2 + 50}`} fill="none" stroke={colors.connector} strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#diag-arrowhead)" />
      <text x={cx - 100} y={yLocal - 30} fontSize={9} fill={colors.connector}>Instant Scores</text>

      <path d={`M ${cx} ${y4 + 80} C ${cx - 80} ${y4 + 80}, ${cx - 80} ${y2 + 80}, ${cx} ${y2 + 80}`} fill="none" stroke={colors.strokeAccent} strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#diag-arrowhead)" />
      <text x={cx - 140} y={y4 - 20} fontSize={9} fill={colors.strokeAccent}>Feedback & Rewrite</text>

      {renderBox(cx, y5, w, "Report Generation (ReportLab)", items5)}
      
      <path d={`M ${cx + w} ${y5 + 20} C ${cx + w + 90} ${y5 + 20}, ${cx + w + 90} ${y2 + 100}, ${cx + w} ${y2 + 100}`} fill="none" stroke={colors.connector} strokeWidth="1" markerEnd="url(#diag-arrowhead)" />
      
    </DiagramWrapper>
  );
};

/* ── NourishNet ──────────────────────────────────────────────────────────── */

export const NourishNetDiagram = () => {
  const boxW = 240;
  const sideW = 220;
  const cx = 255, mid = cx + boxW / 2;
  
  const items1 = ["Donor / Requester"];
  const items2 = ["Share Food / Browse & Request", "Ratings / Notifications", "Vite Build"];
  
  const itemsCS = [
    "EXIF Analysis",
    "Canvas Optimization",
    "Live Capture Detection"
  ];

  const itemsAI = [
    "Food Safety Scanner (AI)",
    " • Image Spoilage Detection",
    " • Safety Validation (Allow/Warn/Block)",
    " • Vision: Phi-3.5 Vision (NIM)",
    " • Reasoning: Gemma-2-27B (NIM)",
    "Health Advisor (AI)",
    " • Food Recognition",
    " • Nutritional Insights",
    " • Health Risk Analysis",
    " • Vision: Phi-3.5 Vision (NIM)",
    " • Reasoning: Gemma-2-27B (NIM)"
  ];
  
  const itemsOrch = [
    "microsoft/phi-3.5-vision-instruct",
    "google/gemma-2-27b-it",
    "Dual-Stage (Vision → Reasoning)"
  ];
  
  const itemsFallback = [
    "GPT-4o-mini (via Pollinations.ai)",
    "Backup Inference Pipeline"
  ];
  
  const itemsNyckel = [
    "Nyckel Custom Classifier",
    "Binary: Fresh vs Spoiled"
  ];

  const items4 = ["Email/Password / JWT Session"];
  const items5 = ["Users / Food Posts", "Requests / Ratings", "Status Tracking"];
  const items6 = ["Subscriptions / Live Updates"];
  const items7: string[] = ["Vercel"];

  let y = 10;
  const y1 = y; y += boxH(items1) + 25;
  const y2 = y; y += boxH(items2) + 25;
  const yAI = y; y += boxH(itemsAI) + 30;
  const y4 = y; y += boxH(items4) + 20;
  const y5 = y; y += boxH(items5) + 20;
  const y6 = y; y += boxH(items6) + 20;
  const y7 = y; y += boxH(items7);
  
  const yCS = yAI - boxH(itemsCS) - 5;
  const yOrch = yAI + 20;
  const yNyckel = yAI + 20;
  const yFallback = yAI + boxH(itemsNyckel) + 40;

  return (
    <DiagramWrapper viewBox={`0 0 840 ${y + 10}`} title="NourishNet System Architecture">
      {renderBox(cx, y1, boxW, "Users", items1)}
      {renderArrow(mid, y1 + boxH(items1), mid, y2, "a1")}
      <text x={mid + 5} y={y2 - 10} fontSize={9} fill={colors.textMuted}>Image Upload Trigger</text>
      
      {renderBox(cx, y2, boxW, "Frontend (React + TS)", items2)}
      
      {renderArrow(cx, y2 + 20, 15 + sideW, yCS + 20, "fe_cs")}
      {renderBox(15, yCS, sideW, "Client-Side Image Intelligence", itemsCS)}
      {renderArrow(15 + sideW / 2, yCS + boxH(itemsCS), mid - 60, yAI, "cs_ai")}
      
      <g>
        <rect x={cx} y={yAI} width={boxW} height={boxH(itemsAI)} rx={boxRad} fill={colors.fill} stroke="hsl(270 70% 70% / 0.6)" strokeWidth={1.5} />
        <text x={mid} y={yAI + 20} textAnchor="middle" fontSize={12} fontWeight={600} fill="hsl(270 80% 80%)" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AI Feature Layer</text>
        {itemsAI.map((item, i) => (
          <text key={i} x={cx + padX} y={yAI + 36 + i * lineH} fontSize={10} fill={item.startsWith(" •") ? colors.textMuted : colors.text} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: item.startsWith(" •") ? 400 : 600 }}>
            {item.startsWith(" •") ? item : `🔹 ${item}`}
          </text>
        ))}
      </g>
      
      {renderArrow(mid, yAI + boxH(itemsAI), mid, y4, "ai_auth")}
      <text x={mid + 5} y={y4 - 10} fontSize={9} fill={colors.textMuted}>Safety Decision Output</text>
      
      <path d={`M ${cx + boxW} ${yAI + 130} C ${cx + boxW + 50} ${yAI + 130}, ${cx + boxW + 50} ${y2 + 40}, ${cx + boxW} ${y2 + 40}`} fill="none" stroke={colors.strokeAccent} strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#diag-arrowhead)" />
      <text x={cx + boxW + 10} y={yAI + 115} fontSize={9} fill={colors.strokeAccent}>Health Insight Response</text>

      {renderBox(610, yOrch, sideW, "AI Orchestration Layer (NVIDIA NIM)", itemsOrch, true)}
      {renderArrow(cx + boxW, yAI + 40, 610, yOrch + 20, "ai_orch_req")}
      {renderArrow(610, yOrch + 40, cx + boxW, yAI + 60, "ai_orch_res")}
      <text x={cx + boxW + 57} y={yAI + 30} textAnchor="middle" fontSize={9} fill={colors.textMuted}>Vision → Reasoning</text>

      {renderBox(15, yNyckel, sideW, "Fast Classification Layer", itemsNyckel)}
      {renderArrow(cx, yAI + 30, 15 + sideW, yNyckel + 30, "ai_nyckel")}

      {renderBox(15, yFallback, sideW, "Demo AI Backend (Fallback)", itemsFallback)}
      {renderArrow(cx, yAI + 70, 15 + sideW, yFallback + 30, "ai_demo")}

      {renderBox(cx, y4, boxW, "Auth (Supabase)", items4)}
      {renderArrow(mid, y4 + boxH(items4), mid, y5, "a3")}
      
      {renderBox(cx, y5, boxW, "PostgreSQL Database", items5, true)}
      <text x={mid + 5} y={y5 - 10} fontSize={9} fill={colors.textMuted}>✅ Safe → Store</text>

      {renderArrow(mid, y5 + boxH(items5), mid, y6, "a4")}
      
      {renderBox(cx, y6, boxW, "Realtime", items6)}
      {renderArrow(mid, y6 + boxH(items6), mid, y7, "a5")}
      
      {renderBox(cx, y7, boxW, "Deployment", items7)}
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
