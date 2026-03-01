<p align="center">
  <img src="public/favicon-dark.svg" alt="Logo" width="60" />
</p>

<h1 align="center">Sanjay Dharmarajou — Portfolio</h1>

<p align="center">
  <strong>Logic-Driven Coder · Java Developer · Automation & AI Enthusiast</strong>
</p>

<p align="center">
  <a href="https://reactjs.org"><img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=for-the-badge" alt="React 18" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript 5" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge" alt="Tailwind CSS" /></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=for-the-badge" alt="Vite 5" /></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white&style=for-the-badge" alt="Framer Motion" /></a>
</p>

---

A modern, performance-first developer portfolio built from the ground up with **React**, **TypeScript**, and **Tailwind CSS**. Designed to showcase my projects, skills, and experience through rich animations, glassmorphism aesthetics, and a fully responsive layout that adapts beautifully across every screen size.

<br/>

## ✨ Highlights

| Feature | Details |
|---|---|
| **Animated Hero** | Typewriter effect cycling through roles, floating illustration, staggered entrance animations |
| **Glassmorphism UI** | Frosted-glass cards and surfaces with dynamic backdrop filters |
| **Dark / Light Theme** | System-aware toggle with theme-matched favicons, persisted in `localStorage` |
| **Custom Cursor** | GPU-accelerated custom cursor with interactive hover states |
| **Scroll Animations** | Section-reveal transitions, scroll progress bar, and smooth scroll-to-top |
| **Animated Background** | Particle-like animated canvas behind content for depth |
| **Project Showcase** | Filterable project grid with detailed modals, architecture diagrams, and live/source links |
| **AI & Automation** | Dedicated section highlighting AI/ML projects and automation workflows |
| **Certifications** | Interactive cards with verification links and issuing details |
| **Contact Form** | Fully functional contact form powered by **EmailJS** — no backend required |
| **Loading Screen** | Branded preloader with crossfade transition into the main content |
| **SEO Optimized** | Open Graph tags, semantic HTML, proper heading hierarchy, and `robots.txt` |

<br/>

## 🏗️ Architecture

```
sanjay-portfolio/
├── public/                  # Static assets & favicons
├── src/
│   ├── assets/              # Images, GIFs, media
│   ├── components/          # 22 custom components + shadcn/ui primitives
│   │   ├── ui/              # Reusable UI primitives (49 components)
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── TechnicalExcellenceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── AISection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── AnimatedBackground.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Route-level page components
│   └── test/                # Unit & integration tests
├── index.html               # Entry HTML with theme + favicon bootstrapping
├── tailwind.config.ts       # Extended design tokens & animations
├── vite.config.ts           # Vite build configuration
└── vitest.config.ts         # Test runner configuration
```

<br/>

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 5 (SWC for fast HMR) |
| **Styling** | Tailwind CSS 3 + CSS custom properties |
| **UI Primitives** | Radix UI + shadcn/ui |
| **Animations** | Framer Motion 12, CSS keyframes, GPU-accelerated transforms |
| **Routing** | React Router v6 |
| **State & Data** | TanStack React Query |
| **Forms** | React Hook Form + Zod validation |
| **Email** | EmailJS (client-side contact form) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Testing** | Vitest + React Testing Library |
| **Linting** | ESLint 9 with flat config |
| **Fonts** | Space Grotesk · JetBrains Mono (Google Fonts) |

<br/>

## 🚀 Getting Started

> **Prerequisites:** [Node.js](https://nodejs.org/) v18+ and npm

```bash
# 1 · Clone the repository
git clone https://github.com/SanjayD11/sanjay-portfolio.git

# 2 · Navigate into the project
cd sanjay-portfolio

# 3 · Install dependencies
npm install

# 4 · Start the dev server (opens at http://localhost:5173)
npm run dev
```

### Other Scripts

| Command | Description |
|---|---|
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |

<br/>

## 🎨 Design Philosophy

- **Performance-first rendering** — Hero section is pre-mounted behind the loader and crossfades in with zero layout shift.  
- **GPU-accelerated animations** — All transforms use `translateZ(0)` and `will-change` hints for buttery-smooth 60 fps transitions.  
- **Accessible by default** — Semantic HTML, ARIA labels, keyboard navigation, and prefers-reduced-motion support.  
- **Theme continuity** — An inline script in `<head>` restores the theme *before* first paint to eliminate flash-of-unstyled-content.  
- **Modular architecture** — Every section is a self-contained component with its own data, styles, and animations.

<br/>

## 📬 Contact

Have a question or want to collaborate? Reach out through the [contact form](https://sanjay-portfolio.vercel.app/#contact) on the live site, or connect with me directly:

- **GitHub** — [@SanjayD11](https://github.com/SanjayD11)
- **Twitter** — [@SanjayD11](https://twitter.com/SanjayD11)

<br/>

---

<p align="center">
  Engineered with ♥ and precision by <strong>Sanjay Dharmarajou</strong>
</p>
