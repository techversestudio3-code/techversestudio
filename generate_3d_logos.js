const fs = require('fs');
const path = require('path');

const LOGOS_DIR = "G:\\My Drive\\Projects\\WhiteHat\\techversestudio\\platform\\assets\\logos";
if (!fs.existsSync(LOGOS_DIR)) {
    fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

// 10 Distinct 3D Logos with realistic depth, gradients, bevels, and drop-shadows

const logos = [
    {
        id: "logo1",
        name: "3D Isometric Cyber Cube (Tesseract Core)",
        concept: "Software Studio Architecture & Modular Plugins",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="shadow1" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="0" dy="24" stdDeviation="20" flood-color="#0284c7" flood-opacity="0.35" />
      <feDropShadow dx="0" dy="40" stdDeviation="40" flood-color="#000000" flood-opacity="0.8" />
    </filter>
    <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>
    <linearGradient id="leftFace" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0369a1" />
      <stop offset="100%" stop-color="#082f49" />
    </linearGradient>
    <linearGradient id="rightFace" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0c4a6e" />
    </linearGradient>
    <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
    </linearGradient>
  </defs>
  <g filter="url(#shadow1)">
    <!-- Top Isometric Face -->
    <polygon points="250,70 410,160 250,250 90,160" fill="url(#topFace)" />
    <!-- Top Face Highlight Lines -->
    <polyline points="90,160 250,70 410,160" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.7" />
    
    <!-- Left Isometric Face -->
    <polygon points="90,160 250,250 250,420 90,330" fill="url(#leftFace)" />
    <!-- Front/Right Isometric Face -->
    <polygon points="250,250 410,160 410,330 250,420" fill="url(#rightFace)" />

    <!-- Carved Inner 3D 'T' & 'V' Hologram in Front -->
    <polygon points="250,180 340,230 250,280 160,230" fill="#030712" opacity="0.6" />
    <!-- Floating Cyber Core -->
    <polygon points="250,195 310,230 250,265 190,230" fill="url(#topFace)" />
    <!-- Floating Tech Bevels -->
    <line x1="250" y1="250" x2="250" y2="420" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />
  </g>
</svg>`
    },
    {
        id: "logo2",
        name: "3D Chrome 'TS' Monogram & Shield",
        concept: "Heavy Industrial Titanium Security & Software",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="chromeBevel" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#2563eb" flood-opacity="0.4" />
      <feDropShadow dx="0" dy="30" stdDeviation="30" flood-color="#020617" flood-opacity="0.85" />
    </filter>
    <linearGradient id="chromeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="25%" stop-color="#94a3b8" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="75%" stop-color="#475569" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>
    <linearGradient id="electricBlue" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1d4ed8" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>
  </defs>
  <g filter="url(#chromeBevel)">
    <!-- 3D Heavy Outer Shield -->
    <path d="M250,50 L420,110 C420,280 340,380 250,450 C160,380 80,280 80,110 Z" fill="#090d16" stroke="url(#chromeMetal)" stroke-width="12" />
    <!-- Inner Rim with Specular Lighting -->
    <path d="M250,80 L390,130 C390,260 325,350 250,410 C175,350 110,260 110,130 Z" fill="url(#electricBlue)" opacity="0.9" />
    <!-- 3D Chrome Monogram T & S -->
    <!-- Letter T -->
    <path d="M170,160 L330,160 L330,200 L275,200 L275,340 L225,340 L225,200 L170,200 Z" fill="url(#chromeMetal)" stroke="#ffffff" stroke-width="2" />
    <!-- Interlocking S Curve -->
    <path d="M280,220 C320,220 340,240 340,265 C340,300 300,310 270,320 C240,330 230,340 230,355 C230,375 250,385 280,385 C310,385 330,375 340,360" fill="none" stroke="url(#chromeMetal)" stroke-width="20" stroke-linecap="round" />
  </g>
</svg>`
    },
    {
        id: "logo3",
        name: "3D Mobius Infinity Loop (Endless Software Ecosystem)",
        concept: "Continuous Integration, Plugins, Themes & Cloud SaaS",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="loopGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#06b6d4" flood-opacity="0.45" />
      <feDropShadow dx="0" dy="32" stdDeviation="36" flood-color="#030712" flood-opacity="0.8" />
    </filter>
    <linearGradient id="mobius1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>
    <linearGradient id="mobius2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="60%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
  </defs>
  <g filter="url(#loopGlow)">
    <!-- Back Loop Band -->
    <path d="M160,250 C100,160 50,220 80,300 C110,380 200,360 250,250 C300,140 390,120 420,200 C450,280 400,340 340,250" 
          fill="none" stroke="url(#mobius2)" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Front Overlapping Twist with Specular Sheen -->
    <path d="M150,230 C200,140 290,140 340,230 C390,320 450,280 420,200 C390,120 300,140 250,250 C200,360 110,380 80,300" 
          fill="none" stroke="url(#mobius1)" stroke-width="42" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Specular Ridge Line -->
    <path d="M150,230 C200,140 290,140 340,230" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.85" />
    <!-- Core Brand Node -->
    <circle cx="250" cy="250" r="18" fill="#ffffff" filter="drop-shadow(0 0 12px #38bdf8)" />
  </g>
</svg>`
    },
    {
        id: "logo4",
        name: "3D Faceted Crystal Prism (Tech Diamond)",
        concept: "Ultra-Premium Digital Software & Asset Studio",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="prismGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="26" flood-color="#0284c7" flood-opacity="0.45" />
      <feDropShadow dx="0" dy="36" stdDeviation="32" flood-color="#000000" flood-opacity="0.75" />
    </filter>
    <linearGradient id="f1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#bae6fd"/><stop offset="100%" stop-color="#0284c7"/></linearGradient>
    <linearGradient id="f2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#1e40af"/></linearGradient>
    <linearGradient id="f3" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#172554"/></linearGradient>
    <linearGradient id="f4" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#0284c7"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient>
    <linearGradient id="f5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#082f49"/></linearGradient>
  </defs>
  <g filter="url(#prismGlow)">
    <!-- Top Table Facet -->
    <polygon points="170,120 330,120 390,210 250,240 110,210" fill="url(#f1)" />
    <!-- Crown Left Facet -->
    <polygon points="170,120 110,210 250,240" fill="url(#f2)" />
    <!-- Crown Right Facet -->
    <polygon points="330,120 390,210 250,240" fill="url(#f3)" />
    
    <!-- Pavilion Center Main Facet -->
    <polygon points="110,210 250,240 250,440" fill="url(#f4)" />
    <polygon points="250,240 390,210 250,440" fill="url(#f5)" />

    <!-- Specular Highlight Bevel Lines -->
    <line x1="170" y1="120" x2="330" y2="120" stroke="#ffffff" stroke-width="4" stroke-opacity="0.9" />
    <line x1="250" y1="240" x2="250" y2="440" stroke="#ffffff" stroke-width="4" stroke-opacity="0.8" />
  </g>
</svg>`
    },
    {
        id: "logo5",
        name: "3D Cyber Studio Portal & Dimensional Ring",
        concept: "TechVerse Studio: Gateway to Digital Products",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="vortexGlow">
      <feDropShadow dx="0" dy="16" stdDeviation="28" flood-color="#38bdf8" flood-opacity="0.5" />
    </filter>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="35%" stop-color="#2563eb" />
      <stop offset="70%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
  </defs>
  <g filter="url(#vortexGlow)">
    <!-- Outer 3D Gyro Ring -->
    <ellipse cx="250" cy="250" rx="190" ry="190" fill="none" stroke="url(#ringGrad)" stroke-width="32" />
    <!-- 3D Bevel Inner Ring Tilted -->
    <ellipse cx="250" cy="250" rx="140" ry="90" fill="none" stroke="#ffffff" stroke-width="8" stroke-opacity="0.8" transform="rotate(-30 250 250)" />
    <!-- Central Studio Core Matrix -->
    <circle cx="250" cy="250" r="55" fill="#030712" stroke="url(#ringGrad)" stroke-width="10" />
    <!-- Letter T Emblem Core -->
    <path d="M225,230 L275,230 M250,230 L250,275" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" />
  </g>
</svg>`
    },
    {
        id: "logo6",
        name: "3D Interlocking Monoliths (The 'T' & 'V' Pillars)",
        concept: "Architectural Software Engineering & High-Converting Themes",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="monoShadow">
      <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#0284c7" flood-opacity="0.4" />
      <feDropShadow dx="0" dy="36" stdDeviation="30" flood-color="#000000" flood-opacity="0.8" />
    </filter>
    <linearGradient id="pillarBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="pillarCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
  </defs>
  <g filter="url(#monoShadow)">
    <!-- Pillar 1: 3D Angled 'T' Monolith -->
    <polygon points="120,100 240,100 210,380 150,380" fill="url(#pillarBlue)" />
    <polygon points="120,100 150,80 270,80 240,100" fill="#93c5fd" />
    
    <!-- Pillar 2: Intersecting 3D 'V' Monolith -->
    <polygon points="210,380 380,120 320,120 180,340" fill="url(#pillarCyan)" />
    <polygon points="320,120 350,95 410,95 380,120" fill="#a5f3fc" />

    <!-- Specular Laser Glint -->
    <circle cx="210" cy="380" r="14" fill="#ffffff" filter="drop-shadow(0 0 8px #38bdf8)" />
  </g>
</svg>`
    },
    {
        id: "logo7",
        name: "3D Obsidian & 24K Gold VIP Shield",
        concept: "High-Ticket Enterprise Digital Retainers & Plugins",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="goldGlow">
      <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#d97706" flood-opacity="0.35" />
      <feDropShadow dx="0" dy="35" stdDeviation="35" flood-color="#000000" flood-opacity="0.9" />
    </filter>
    <linearGradient id="brushedGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="30%" stop-color="#eab308" />
      <stop offset="70%" stop-color="#ca8a04" />
      <stop offset="100%" stop-color="#854d0e" />
    </linearGradient>
    <linearGradient id="obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#27272a" />
      <stop offset="100%" stop-color="#09090b" />
    </linearGradient>
  </defs>
  <g filter="url(#goldGlow)">
    <path d="M250,50 L420,110 C420,280 340,380 250,450 C160,380 80,280 80,110 Z" fill="url(#obsidian)" stroke="url(#brushedGold)" stroke-width="14" />
    <path d="M250,90 L380,140 C380,260 320,340 250,400 C180,340 120,260 120,140 Z" fill="none" stroke="url(#brushedGold)" stroke-width="4" stroke-opacity="0.6" />
    <!-- 3D Gold Crown Star -->
    <polygon points="250,150 275,220 350,225 295,275 310,350 250,310 190,350 205,275 150,225 225,220" fill="url(#brushedGold)" />
  </g>
</svg>`
    },
    {
        id: "logo8",
        name: "3D Quantum Gyroscope Sphere",
        concept: "Multi-Platform Software: WordPress, Cloudflare, Node & WooCommerce",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="gyroShadow">
      <feDropShadow dx="0" dy="16" stdDeviation="25" flood-color="#38bdf8" flood-opacity="0.5" />
    </filter>
    <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="30%" stop-color="#38bdf8" />
      <stop offset="70%" stop-color="#1d4ed8" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>
  </defs>
  <g filter="url(#gyroShadow)">
    <!-- Ring 1 (Vertical Orbit) -->
    <ellipse cx="250" cy="250" rx="190" ry="60" fill="none" stroke="#38bdf8" stroke-width="12" transform="rotate(45 250 250)" />
    <!-- Ring 2 (Counter-Orbit) -->
    <ellipse cx="250" cy="250" rx="190" ry="60" fill="none" stroke="#818cf8" stroke-width="12" transform="rotate(-45 250 250)" />
    <!-- Central Floating 3D Glowing Sphere -->
    <circle cx="250" cy="250" r="75" fill="url(#sphereGrad)" />
    <!-- Equator Laser Band -->
    <ellipse cx="250" cy="250" rx="75" ry="18" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.8" />
  </g>
</svg>`
    },
    {
        id: "logo9",
        name: "3D Neomorphic Hex-Badge & Code Bracket",
        concept: "Modern Software Artisan Studio",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="hexDepth">
      <feDropShadow dx="0" dy="20" stdDeviation="20" flood-color="#0284c7" flood-opacity="0.4" />
      <feDropShadow dx="0" dy="35" stdDeviation="35" flood-color="#000000" flood-opacity="0.85" />
    </filter>
    <linearGradient id="hexRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#0369a1" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>
  <g filter="url(#hexDepth)">
    <polygon points="250,50 420,150 420,350 250,450 80,350 80,150" fill="#0b1329" stroke="url(#hexRim)" stroke-width="14" />
    <!-- 3D Layered Inner Bevel -->
    <polygon points="250,85 390,165 390,335 250,415 110,335 110,165" fill="#030712" />
    <!-- Code Brackets & Tech Core < / > -->
    <path d="M190,190 L130,250 L190,310 M310,190 L370,250 L310,310 M270,180 L230,320" 
          stroke="#38bdf8" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>
</svg>`
    },
    {
        id: "logo10",
        name: "3D Origami Falcon / Tech Wings",
        concept: "Lightning-Fast Execution & Ultra-High Speed Plugins",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="falconGlow">
      <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#06b6d4" flood-opacity="0.4" />
      <feDropShadow dx="0" dy="35" stdDeviation="30" flood-color="#000000" flood-opacity="0.8" />
    </filter>
    <linearGradient id="wingL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#0369a1"/></linearGradient>
    <linearGradient id="wingR" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#1e3a8a"/></linearGradient>
    <linearGradient id="bodyG" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#0284c7"/></linearGradient>
  </defs>
  <g filter="url(#falconGlow)">
    <!-- Left Wing Facet 1 -->
    <polygon points="250,140 70,180 180,260" fill="url(#wingL)" />
    <!-- Left Wing Facet 2 -->
    <polygon points="180,260 70,180 110,340 250,420" fill="#075985" />
    
    <!-- Right Wing Facet 1 -->
    <polygon points="250,140 430,180 320,260" fill="url(#wingR)" />
    <!-- Right Wing Facet 2 -->
    <polygon points="320,260 430,180 390,340 250,420" fill="#1e40af" />
    
    <!-- Central Head/Shield Bevel -->
    <polygon points="250,90 285,160 250,220 215,160" fill="url(#bodyG)" />
  </g>
</svg>`
    }
];

// Write individual logo SVG files
logos.forEach(logo => {
    const filename = `${logo.id}.svg`;
    const filepath = path.join(LOGOS_DIR, filename);
    fs.writeFileSync(filepath, logo.svg, 'utf8');
    console.log(`Saved ${filename}`);
});

// Build the interactive 3D Logo Showcase page: platform/logos.html
let cardsHtml = "";
logos.forEach((l, idx) => {
    cardsHtml += `
    <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/80 transition-all shadow-2xl flex flex-col justify-between group">
        <div>
            <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-bold font-mono">3D Logo ${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}</span>
                <span class="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Concept ${idx + 1}</span>
            </div>
            <div class="w-full h-56 flex items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800/80 group-hover:border-cyan-500/40 transition-all relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="w-36 h-36 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    ${l.svg}
                </div>
            </div>
            <h3 class="text-xl font-black text-white mt-5 group-hover:text-cyan-400 transition-colors">${l.name}</h3>
            <p class="text-xs text-slate-400 mt-2 leading-relaxed">${l.concept}</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span class="text-xs font-mono text-slate-400">assets/logos/${l.id}.svg</span>
            <a href="contact.html?selected_logo=${l.id}" class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md transition-all">
                Select This 3D Logo
            </a>
        </div>
    </div>
    `;
});

const logosPageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>10 Distinct 3D Logos | TechVerse Studio Brand Selection</title>
    <meta name="description" content="Select from 10 distinct high-end 3D logos for TechVerse Studio.">
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col">

    <div class="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-b border-slate-800 text-[11px] text-slate-300 py-1.5 px-4 text-center">
        <span><i class="fa-solid fa-cube text-cyan-400 mr-1.5"></i> 10 Distinct 3D Isometric &amp; Metallic Brand Identity Concepts for TechVerse Studio</span>
    </div>

    <header class="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <a href="index.html" class="flex items-center space-x-3">
                <span class="text-2xl font-black text-white">TechVerse <span class="text-cyan-400">Studio</span></span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-cyan-300 uppercase font-bold">3D Brand Suite</span>
            </a>
            <div class="flex items-center space-x-4">
                <a href="index.html" class="text-xs font-bold text-slate-400 hover:text-white">&larr; Back to Platform</a>
                <a href="demos.html" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold">View 10 Frontend Demos</a>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                Custom 3D Vector Engineering
            </span>
            <h1 class="text-4xl sm:text-5xl font-black text-white tracking-tight mt-4">
                10 Real 3D Logo Designs for TechVerse Studio
            </h1>
            <p class="mt-4 text-slate-400 text-base leading-relaxed">
                Har logo ek bilkul alag geometric aur visual concept par tayyar kiya gaya hai: Isometric Cube, Titanium Chrome 'TS', Infinite Mobius Ribbon, Faceted Crystal Diamond, aur Futuristic Gyroscope. Jo bhi logo aapko pasand aaye, bas uska number batayein!
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${cardsHtml}
        </div>
    </main>

    <footer class="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        &copy; 2026 TechVerse LLC. Vector SVGs with infinite resolution and 3D depth.
    </footer>
</body>
</html>
`;

fs.writeFileSync(path.join("G:\\My Drive\\Projects\\WhiteHat\\techversestudio\\platform", "logos.html"), logosPageHtml, 'utf8');
console.log("Created logos.html showcase page");
