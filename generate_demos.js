const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = "G:\\My Drive\\Projects\\WhiteHat\\techversestudio\\platform";
const DEMOS_DIR = path.join(OUTPUT_DIR, "demos");
if (!fs.existsSync(DEMOS_DIR)) {
    fs.mkdirSync(DEMOS_DIR, { recursive: true });
}

const COMMON_NAV_BAR = `
<div class="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-b border-slate-800 text-[11px] text-slate-300 py-1.5 px-4 text-center">
    <span><i class="fa-solid fa-shield-halved text-cyan-400 mr-1.5"></i> Instant Digital Delivery &bull; 30-Day Money-Back Guarantee &bull; Reseller: Paddle.com</span>
</div>
<header class="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="../index.html" class="flex items-center space-x-3.5 group">
            <img src="../assets/logo-3d.svg" alt="TechVerse Studio 3D Logo" class="w-10 h-10 object-contain drop-shadow-[0_0_14px_rgba(56,189,248,0.5)] transition-transform duration-300 group-hover:scale-110">
            <div>
                <span class="text-xl font-extrabold tracking-tight text-white">TechVerse <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Studio</span></span>
                <span class="block text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Enterprise Security Suite</span>
            </div>
        </a>
        <nav class="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-300">
            <a href="../demos.html" class="px-2.5 py-1 rounded-lg bg-blue-600/30 text-cyan-300 border border-blue-500/40 font-bold hover:bg-blue-600/50"><i class="fa-solid fa-layer-group mr-1.5"></i>All 10 Demos</a>
            <a href="#products" class="hover:text-cyan-400 transition-colors">Products</a>
            <a href="#features" class="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#pricing" class="hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="../contact.html" class="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>
        <div class="flex items-center space-x-3">
            <a href="../demos.html" class="text-xs font-bold text-slate-400 hover:text-white px-3 py-2 border border-slate-800 rounded-lg">&larr; Switch Demo</a>
            <a href="../contact.html" class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md">Deploy This Theme</a>
        </div>
    </div>
</header>
`;

const COMMON_FOOTER = `
<footer class="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div class="space-y-4">
                <div class="flex items-center space-x-3">
                    <img src="../assets/logo-3d.svg" alt="TechVerse Studio 3D Logo" class="w-8 h-8 object-contain">
                    <span class="text-lg font-extrabold text-white">TechVerse Studio</span>
                </div>
                <p class="leading-relaxed text-xs">
                    Continuous SSL certificate monitoring, automated WordPress security enforcement, and developer cryptographic tools by TechVerse LLC.
                </p>
                <p class="text-[11px] text-slate-500">&copy; 2026 TechVerse LLC. All rights reserved.</p>
            </div>
            <div>
                <h4 class="text-white font-semibold mb-3 text-sm">Theme Demos</h4>
                <div class="grid grid-cols-2 gap-1.5 text-[11px]">
                    <a href="demo1.html" class="hover:text-cyan-400">01. Cyber-Shield</a>
                    <a href="demo2.html" class="hover:text-cyan-400">02. Bento-Grid</a>
                    <a href="demo3.html" class="hover:text-cyan-400">03. Linear Dark</a>
                    <a href="demo4.html" class="hover:text-cyan-400">04. Scanner-First</a>
                    <a href="demo5.html" class="hover:text-cyan-400">05. Fintech Navy</a>
                    <a href="demo6.html" class="hover:text-cyan-400">06. DevOps CLI</a>
                    <a href="demo7.html" class="hover:text-cyan-400">07. Aurora Glass</a>
                    <a href="demo8.html" class="hover:text-cyan-400">08. Dashboard 3D</a>
                    <a href="demo9.html" class="hover:text-cyan-400">09. Luxury Gold</a>
                    <a href="demo10.html" class="hover:text-cyan-400">10. Crisp Light</a>
                </div>
            </div>
            <div>
                <h4 class="text-white font-semibold mb-3 text-sm">Legal &amp; Policies</h4>
                <ul class="space-y-1.5 text-xs">
                    <li><a href="../terms.html" class="hover:text-cyan-400">Terms of Service</a></li>
                    <li><a href="../privacy.html" class="hover:text-cyan-400">Privacy Policy</a></li>
                    <li><a href="../refund.html" class="hover:text-cyan-400">Refund &amp; Cancellation</a></li>
                    <li><a href="../delivery.html" class="hover:text-cyan-400">Shipping &amp; Delivery</a></li>
                    <li><a href="../contact.html" class="hover:text-cyan-400">Contact Support Desk</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-semibold mb-3 text-sm">Corporate Details</h4>
                <p class="text-slate-200 font-bold">TechVerse LLC (DBA TechVerse Studio)</p>
                <p class="mt-1 text-slate-400 text-xs">6346 Cresterrace Dr, Pasadena, TX 77505, USA</p>
                <p class="mt-2 text-slate-300 text-xs">Support: support@techversestudio.com</p>
                <p class="text-slate-300 text-xs">Helpline: +1 (832) 555-0198</p>
            </div>
        </div>
        <div class="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-3 text-slate-400 text-xl">
                <i class="fa-brands fa-cc-visa"></i>
                <i class="fa-brands fa-cc-mastercard"></i>
                <i class="fa-brands fa-cc-amex"></i>
                <i class="fa-brands fa-cc-discover"></i>
                <i class="fa-brands fa-cc-paypal"></i>
                <i class="fa-brands fa-apple-pay"></i>
                <i class="fa-brands fa-google-pay"></i>
            </div>
            <div class="text-[11px] text-slate-400 max-w-lg text-right">
                Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders.
            </div>
        </div>
    </div>
</footer>
`;

const demosMeta = [
    {
        id: "demo1",
        title: "Demo 1: Cyber-Shield Dark (Cloudflare / CrowdStrike Style)",
        badge: "Enterprise Cyber Defense",
        tagline: "Uncompromising Threat Intelligence & Automated Certificate Defense",
        desc: "Deep obsidian slate with vibrant laser cyan glow, rotating 3D protective shield, real-time threat matrix, and instant HTTPS enforcer.",
        hero_html: `
        <div class="relative py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/25 via-slate-950 to-slate-950 -z-10"></div>
            <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold mb-6">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>Active Threat Neutralization &bull; Zero Downtime Architecture</span>
            </div>
            <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
                Enterprise <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Cyber-Shield</span> for Mission-Critical Infrastructure
            </h1>
            <p class="mt-6 text-slate-300 text-lg max-w-2xl mx-auto">
                24/7 continuous SSL monitoring, automated cryptographic compliance, and sub-second failover alerts engineered for fintech and e-commerce giants.
            </p>
            <div class="mt-10 flex flex-wrap justify-center gap-4">
                <a href="#pricing" class="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/25">Deploy Cyber-Shield</a>
                <a href="../contact.html" class="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700">Explore Threat Telemetry</a>
            </div>
            <div class="mt-16 max-w-4xl mx-auto p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div class="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                    <span class="text-xs text-slate-400">Active Shield Nodes</span>
                    <p class="text-2xl font-black text-white mt-1">48 Global PoPs</p>
                    <span class="text-[11px] text-cyan-400">&#10003; 99.999% SLA Uptime</span>
                </div>
                <div class="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                    <span class="text-xs text-slate-400">Mean Detection Time</span>
                    <p class="text-2xl font-black text-cyan-400 mt-1">&lt; 14 Seconds</p>
                    <span class="text-[11px] text-slate-400">Automatic DNS re-route</span>
                </div>
                <div class="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                    <span class="text-xs text-slate-400">Encrypted Transactions</span>
                    <p class="text-2xl font-black text-white mt-1">$450M+ / Mo</p>
                    <span class="text-[11px] text-emerald-400">&#10003; Zero PCI Violations</span>
                </div>
            </div>
        </div>
        `
    },
    {
        id: "demo2",
        title: "Demo 2: Modern Bento-Grid (Apple / Framer Style)",
        badge: "Modern Bento-Box Layout",
        tagline: "Modular Security Architecture Organized in Visual Micro-Widgets",
        desc: "Ultra-popular modular bento boxes highlighting live uptime gauges, certificate expiry timers, WordPress plugin modules, and API endpoints.",
        hero_html: `
        <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div class="text-center max-w-3xl mx-auto mb-14">
                <span class="px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-sky-400 text-xs font-bold uppercase tracking-wider">Modular Bento Design</span>
                <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight mt-3">
                    Every Layer of SSL Security, <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400">Perfected.</span>
                </h1>
                <p class="mt-4 text-slate-400 text-base">Interactive visual cards displaying every component of the TechVerse security suite in real-time.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 md:col-span-2 shadow-xl flex flex-col justify-between">
                    <div>
                        <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mb-4"><i class="fa-solid fa-server"></i></div>
                        <h3 class="text-2xl font-extrabold text-white">24/7 Expiry Watchdog Live Telemetry</h3>
                        <p class="text-sm text-slate-400 mt-2">Continuously polls your domain SSL handshake from 18 global edge locations every 60 seconds.</p>
                    </div>
                    <div class="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <span class="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                            <span class="text-sm font-mono text-white">status.yourshop.com</span>
                        </div>
                        <span class="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold">Expires in 94 Days</span>
                    </div>
                </div>
                <div class="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
                    <div>
                        <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mb-4"><i class="fa-brands fa-wordpress"></i></div>
                        <h3 class="text-xl font-extrabold text-white">WordPress Enforcer</h3>
                        <p class="text-xs text-slate-400 mt-2">Zero-config 301 HTTPS redirection with automatic mixed content fixing.</p>
                    </div>
                    <div class="mt-4 text-xs font-mono text-cyan-400 p-3 bg-slate-950 rounded-xl border border-slate-800">
                        Strict-Transport-Security: max-age=31536000
                    </div>
                </div>
            </div>
        </div>
        `
    },
    {
        id: "demo3",
        title: "Demo 3: Linear Minimalist Dark (Linear.app / Vercel Style)",
        badge: "Silicon Valley Minimalist",
        tagline: "Pure Craftsmanship with Micro-Borders and Monochromatic Elegance",
        desc: "Sub-pixel borders, ultra-clean typography (Inter/Geist font), matte black finish, subtle gray gradients, and zero visual noise.",
        hero_html: `
        <div class="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-8">
                <span>techverse-core v2.4.0</span>
                <span class="text-zinc-600">&bull;</span>
                <span class="text-zinc-300">Press <kbd class="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">⌘K</kbd> to inspect</span>
            </div>
            <h1 class="text-5xl sm:text-7xl font-extrabold text-white tracking-tighter leading-none">
                Certificate security.<br><span class="text-zinc-500">Automated to perfection.</span>
            </h1>
            <p class="mt-8 text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-normal">
                An engineered platform designed for engineering teams. Eliminate expired certificate fire drills with proactive programmatic verification.
            </p>
            <div class="mt-10 flex justify-center gap-3">
                <a href="#pricing" class="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition-all">Start 14-Day Trial</a>
                <a href="../contact.html" class="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-sm border border-zinc-800">Documentation &rarr;</a>
            </div>
        </div>
        `
    },
    {
        id: "demo4",
        title: "Demo 4: Interactive Scanner-First (SSL Labs / SecurityScorecard)",
        badge: "Live Diagnostic Utility",
        tagline: "Immediate Live Value: Enter Any Domain to Audit Vulnerabilities",
        desc: "Built around a prominent, centered interactive domain audit tool. Users immediately test their website and view cipher suite grades.",
        hero_html: `
        <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
            <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-semibold mb-6">
                <i class="fa-solid fa-radar mr-1"></i> Public Security Scanner &bull; Instant Results
            </div>
            <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                Audit Your Domain's <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">TLS Encryption</span> in 3 Seconds
            </h1>
            <p class="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
                Discover hidden certificate vulnerabilities, weak legacy cipher suites, and upcoming expirations before search engines penalize your store.
            </p>
            <div class="mt-10 p-4 bg-slate-900 border-2 border-emerald-500/60 rounded-2xl shadow-2xl backdrop-blur max-w-2xl mx-auto">
                <div class="flex flex-col sm:flex-row gap-3">
                    <input type="text" placeholder="Enter domain (e.g., yourcompany.com)" class="flex-grow px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <button onclick="alert('Demo 4 Scanner: Auditing TLS Handshake across 18 edge nodes... Score: A+ (Valid 89 Days)');" class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg whitespace-nowrap">
                        <i class="fa-solid fa-bolt mr-1"></i> Scan Now Free
                    </button>
                </div>
            </div>
        </div>
        `
    },
    {
        id: "demo5",
        title: "Demo 5: Fintech Trust Navy (Stripe Radar / Datadog Style)",
        badge: "Corporate Financial Trust",
        tagline: "Bank-Grade Encryption with $2,000,000 CA Warranty Protection",
        desc: "Deep midnight navy with electric indigo accents, official compliance trust seals (PCI-DSS Level 1, SOC-2 Type II), and corporate tiers.",
        hero_html: `
        <div class="py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-[#0a192f] via-slate-950 to-slate-950">
            <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-semibold mb-6">
                <i class="fa-solid fa-lock text-indigo-400 mr-1.5"></i> PCI-DSS &bull; SOC-2 Type II &bull; HIPAA Compliant
            </div>
            <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
                Bank-Grade Web Security for <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">Global Commerce</span>
            </h1>
            <p class="mt-6 text-slate-300 text-lg max-w-2xl mx-auto">
                Eliminate transaction drop-offs. Provide customer confidence with authenticated Organization (OV) and Extended Validation (EV) green seal security.
            </p>
            <div class="mt-8 flex justify-center gap-4">
                <a href="#pricing" class="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30">View Enterprise Plans</a>
                <a href="../contact.html" class="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700">Request Custom SLA</a>
            </div>
        </div>
        `
    },
    {
        id: "demo6",
        title: "Demo 6: DevOps Terminal & Hacker Aesthetic (Supabase / Raycast)",
        badge: "Developer-First CLI Theme",
        tagline: "Automate SSL Certificates directly from your CI/CD Pipeline",
        desc: "Monospace developer theme with dark terminal windows, live curl API commands, JSON responses, and instant copy code snippets.",
        hero_html: `
        <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-6 space-y-6">
                    <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-mono">
                        <span>$ npm install @techverse/watchdog</span>
                    </div>
                    <h1 class="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                        The Developer API for <span class="text-emerald-400 font-mono">Zero-Downtime</span> SSL Automation
                    </h1>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        Programmatic certificate provisioning, webhook alerts, and automated DNS-01 challenge completion with a single REST request.
                    </p>
                </div>
                <div class="lg:col-span-6">
                    <div class="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-5 font-mono text-xs text-slate-300">
                        <p class="text-cyan-400">curl -X POST https://api.techversestudio.com/v1/monitor \\<br>&nbsp;&nbsp;-d '{"domain": "shop.mysite.com", "webhook": true}'</p>
                        <p class="text-emerald-400 mt-2">{ "status": "active", "expires_in_days": 89, "hsts": true }</p>
                    </div>
                </div>
            </div>
        </div>
        `
    },
    {
        id: "demo7",
        title: "Demo 7: Aurora Glow & 3D Glass (Raycast Pro / Tailwind Radiant)",
        badge: "Aesthetic Glassmorphism",
        tagline: "Luminous Ambient Lights with Frosted Specular Glass Depth",
        desc: "Ambient aurora blurs in magenta, cyan, and royal violet with frosted glassmorphic cards, specular borders, and subtle glowing particles.",
        hero_html: `
        <div class="relative py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/30 via-cyan-500/20 to-blue-600/30 blur-[120px] rounded-full -z-10"></div>
            <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/80 text-purple-300 text-xs font-semibold mb-8 backdrop-blur shadow-lg">
                <i class="fa-solid fa-sparkles text-cyan-400"></i> Next-Generation Web Encryption
            </div>
            <h1 class="text-5xl sm:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
                Security Designed for <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400">The Modern Web</span>
            </h1>
            <p class="mt-6 text-slate-300 text-lg max-w-2xl mx-auto">
                Experience crystal-clear SSL lifecycle monitoring and automatic HTTPS enforcement wrapped in an ethereal, zero-friction interface.
            </p>
        </div>
        `
    },
    {
        id: "demo8",
        title: "Demo 8: Split-Screen Dashboard Hero (Tailwind UI Prime)",
        badge: "High-Conversion SaaS Prime",
        tagline: "Left Copy Conversion Engine &bull; Right 3D Mockup Dashboard",
        desc: "High sales-conversion layout: Left side features persuasive benefit copy, 5-star social proof; right side features a realistic 3D app dashboard.",
        hero_html: `
        <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-6 space-y-6">
                    <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                        Never Lose Another Customer to an <span class="text-blue-400">SSL Warning</span>
                    </h1>
                    <p class="text-slate-300 text-base leading-relaxed">
                        98% of users immediately abandon an online store when confronted with "Your connection is not private". TechVerse ensures your certificates renew seamlessly.
                    </p>
                </div>
                <div class="lg:col-span-6">
                    <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-700 shadow-2xl space-y-3">
                        <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between text-xs">
                            <span class="font-bold text-white">shop.techversestudio.com</span>
                            <span class="text-emerald-400 font-semibold">Valid &bull; 89 Days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    },
    {
        id: "demo9",
        title: "Demo 9: Executive Pitch Black & Champagne Gold (High-Ticket B2B)",
        badge: "High-Ticket Enterprise VIP",
        tagline: "Tailored for $6,500 Multi-Domain EV SAN Retainers & Dedicated Concierge",
        desc: "Deep pitch black finish (#09090b) with subtle brushed champagne gold and platinum highlights, tailored for high-ticket security retainers.",
        hero_html: `
        <div class="py-24 px-4 sm:px-6 lg:px-8 text-center bg-[#09090b]">
            <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs font-semibold mb-8">
                <i class="fa-solid fa-crown text-amber-400 mr-1.5"></i> Enterprise Multi-Domain EV SAN Concierge
            </div>
            <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
                Turnkey Enterprise Cryptographic Architecture <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">For Global Brands</span>
            </h1>
            <p class="mt-6 text-slate-300 text-lg max-w-2xl mx-auto">
                Bespoke security engineering managed 24/7 by TechVerse LLC. Secures up to 25 corporate domains with DigiCert EV SAN and dedicated SLA.
            </p>
        </div>
        `
    },
    {
        id: "demo10",
        title: "Demo 10: Clean Modern Light Mode (Stripe Billing / Vercel Light)",
        badge: "Daylight High-Contrast UI",
        tagline: "Crisp White Aesthetic with Razor-Sharp Blue Accents & Drop Shadows",
        desc: "Pure crisp white backdrop with cool zinc borders, royal blue accents, high-contrast typography, and accessible visual clarity.",
        hero_html: `
        <div class="py-24 px-4 sm:px-6 lg:px-8 text-center bg-white text-slate-900 border-b border-slate-200">
            <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-6">
                <i class="fa-solid fa-shield-halved text-blue-600 mr-1"></i> Continuous Security Platform 2.4
            </div>
            <h1 class="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-tight">
                Automated SSL Management for <span class="text-blue-600">Fast-Growing SaaS</span>
            </h1>
            <p class="mt-6 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                One-click WordPress HTTPS enforcement, 24/7 proactive certificate monitoring, and automated issuance. Trusted by 1,400+ developers globally.
            </p>
        </div>
        `
    }
];

demosMeta.forEach(demo => {
    const filename = `${demo.id}.html`;
    const filepath = path.join(DEMOS_DIR, filename);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${demo.title} | TechVerse Studio</title>
    <meta name="description" content="${demo.desc}">
    <link rel="icon" type="image/svg+xml" href="../favicon.svg">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col">

    ${COMMON_NAV_BAR}

    <main class="flex-grow">
        ${demo.hero_html}

        <section id="pricing" class="py-16 bg-slate-900/60 border-t border-slate-800">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span class="text-xs font-bold text-cyan-400 uppercase tracking-widest">${demo.badge}</span>
                <h2 class="text-3xl font-extrabold text-white mt-1">Choose Your Protection Plan</h2>
                <p class="text-slate-400 text-xs mt-2">All plans include 30-Day Money-Back Guarantee &bull; Powered by Paddle.com</p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto text-left">
                    <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                        <h3 class="text-base font-bold text-white">Single Site WP Plugin</h3>
                        <p class="text-2xl font-black text-white my-3">$49 <span class="text-xs font-normal text-slate-400">/ one-time</span></p>
                        <p class="text-xs text-slate-400 mb-4">One WordPress site with automated mixed content fixer and HSTS engine.</p>
                        <a href="../contact.html?plan=single&theme=${demo.id}" class="block text-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">Deploy With This Theme</a>
                    </div>
                    <div class="p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500 shadow-xl relative">
                        <span class="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase">Most Popular</span>
                        <h3 class="text-base font-bold text-white">Agency Multi-Domain</h3>
                        <p class="text-2xl font-black text-white my-3">$149 <span class="text-xs font-normal text-slate-400">/ year</span></p>
                        <p class="text-xs text-slate-400 mb-4">Up to 25 production domains with 24/7 continuous watchdog &amp; webhook alerts.</p>
                        <a href="../contact.html?plan=agency&theme=${demo.id}" class="block text-center py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md">Deploy With This Theme</a>
                    </div>
                    <div class="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                        <h3 class="text-base font-bold text-white">Enterprise SAN Suite</h3>
                        <p class="text-2xl font-black text-white my-3">$499 <span class="text-xs font-normal text-slate-400">/ year</span></p>
                        <p class="text-xs text-slate-400 mb-4">Unlimited domains with automated CA API provisioning &amp; 99.99% SLA.</p>
                        <a href="../contact.html?plan=enterprise&theme=${demo.id}" class="block text-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">Deploy With This Theme</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    ${COMMON_FOOTER}
</body>
</html>
`;
    fs.writeFileSync(filepath, html, 'utf8');
    console.log(`Created ${filename}`);
});

let demosCardsHtml = "";
demosMeta.forEach((d, idx) => {
    demosCardsHtml += `
    <div class="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/80 transition-all shadow-xl flex flex-col justify-between group">
        <div>
            <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-cyan-400 text-xs font-bold font-mono">Demo 0${idx + 1 > 9 ? idx + 1 : '0' + (idx + 1)}</span>
                <span class="text-[11px] text-slate-400">${d.badge}</span>
            </div>
            <h3 class="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors">${d.title.split(':')[1].trim()}</h3>
            <p class="text-xs text-slate-400 mt-2 leading-relaxed">${d.desc}</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <a href="demos/${d.id}.html" target="_blank" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5">
                <span>Open Live Demo</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
            <span class="text-[11px] text-slate-500 font-mono">/demos/${d.id}.html</span>
        </div>
    </div>
    `;
});

const demosHubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>10 Live Frontend Demos | TechVerse Studio Showcase</title>
    <meta name="description" content="Select from 10 world-class SaaS frontend UI themes for TechVerse Studio before permanent deployment.">
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
        <span><i class="fa-solid fa-sparkles text-cyan-400 mr-1.5"></i> 10 Interactive Live SaaS Frontend Demos &bull; Click any demo below to view in full resolution</span>
    </div>

    <header class="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <a href="index.html" class="flex items-center space-x-3.5">
                <img src="assets/logo-3d.svg" alt="TechVerse Studio 3D Logo" class="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                <div>
                    <span class="text-xl font-extrabold text-white">TechVerse <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Studio</span></span>
                    <span class="block text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Theme Showcase Gallery</span>
                </div>
            </a>
            <a href="index.html" class="text-sm font-semibold text-cyan-400 hover:text-cyan-300">&larr; Back to Main Platform</a>
        </div>
    </header>

    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-cyan-300 text-xs font-semibold mb-4">
                <i class="fa-solid fa-palette text-cyan-400"></i>
                <span>Choose Your Preferred Brand Look</span>
            </div>
            <h1 class="text-4xl sm:text-5xl font-black text-white tracking-tight">10 Live SaaS Frontend Demos</h1>
            <p class="mt-4 text-slate-400 text-base leading-relaxed">
                Click on any demo to open it in your browser. Review the colors, hero section, typography, and vibe. Whichever design you choose will be set as the permanent homepage for <strong class="text-white">techversestudio.com</strong>.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${demosCardsHtml}
        </div>
    </main>

    <footer class="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        &copy; 2026 TechVerse LLC. All 10 demos are pre-configured for instant deployment.
    </footer>
</body>
</html>
`;

fs.writeFileSync(path.join(OUTPUT_DIR, "demos.html"), demosHubHtml, 'utf8');
console.log("Created demos.html master hub");
