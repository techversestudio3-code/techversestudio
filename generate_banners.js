const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'platform', 'assets', 'products');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

function baseSvg(bgGradStart, bgGradEnd, glowColor, contentXml) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradStart}" />
      <stop offset="100%" stop-color="${bgGradEnd}" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${glowColor}" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
    </pattern>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="rgba(0,0,0,0.6)" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="340" fill="url(#bgGrad)" />
  <rect width="600" height="340" fill="url(#glowGrad)" />
  <rect width="600" height="340" fill="url(#grid)" />

  ${contentXml}

  <!-- Brand watermark -->
  <g transform="translate(30, 30)">
    <rect width="28" height="28" rx="7" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <text x="14" y="19" fill="#38bdf8" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="12" text-anchor="middle">TS</text>
    <text x="36" y="19" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" letter-spacing="1">TECHVERSE STUDIO</text>
  </g>
</svg>`;
}

// 1. Paddle Official Banner
const paddleSvg = baseSvg('#060d1f', '#020612', '#0ea5e9', `
  <!-- Central Glass Card (Checkout Modal Mockup) -->
  <g transform="translate(140, 55)" filter="url(#shadow)">
    <!-- Card Base -->
    <rect width="320" height="210" rx="18" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />
    
    <!-- Header Bar -->
    <rect width="320" height="42" rx="18" fill="rgba(30, 41, 59, 0.6)" />
    <circle cx="25" cy="21" r="5" fill="#ef4444" opacity="0.8"/>
    <circle cx="42" cy="21" r="5" fill="#f59e0b" opacity="0.8"/>
    <circle cx="59" cy="21" r="5" fill="#10b981" opacity="0.8"/>
    <text x="160" y="26" fill="#e2e8f0" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="11" text-anchor="middle">Paddle Billing v2 &bull; Secure Checkout</text>

    <!-- Floating 3D Credit Card Mockup -->
    <g transform="translate(35, 60)">
      <rect width="160" height="95" rx="12" fill="linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #1e1b4b 100%)" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
      <circle cx="130" cy="30" r="14" fill="#f59e0b" opacity="0.8"/>
      <circle cx="145" cy="30" r="14" fill="#ef4444" opacity="0.8"/>
      <rect x="20" y="24" width="28" height="20" rx="4" fill="#fbbf24" opacity="0.9"/>
      <text x="20" y="70" fill="rgba(255,255,255,0.9)" font-family="monospace" font-size="9" letter-spacing="2">&bull;&bull;&bull;&bull; 4242</text>
      <text x="20" y="84" fill="#bae6fd" font-family="sans-serif" font-weight="700" font-size="8">PADDLE BUYER</text>
    </g>

    <!-- Side details -->
    <g transform="translate(210, 70)">
      <rect width="80" height="22" rx="6" fill="#0284c7" />
      <text x="40" y="15" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="9" text-anchor="middle">PAY $89.00</text>
      
      <text x="0" y="44" fill="#38bdf8" font-family="sans-serif" font-weight="700" font-size="9">&#10003; VAT Included</text>
      <text x="0" y="60" fill="#38bdf8" font-family="sans-serif" font-weight="700" font-size="9">&#10003; 100% Tax Free</text>
      <text x="0" y="76" fill="#38bdf8" font-family="sans-serif" font-weight="700" font-size="9">&#10003; Apple Pay / PayPal</text>
    </g>

    <!-- Bottom Status -->
    <rect x="20" y="170" width="280" height="26" rx="8" fill="rgba(2, 132, 199, 0.15)" stroke="rgba(56, 189, 248, 0.2)" stroke-width="1"/>
    <text x="160" y="187" fill="#7dd3fc" font-family="sans-serif" font-weight="700" font-size="10" text-anchor="middle">&#128274; 256-Bit TLS Encrypted Overlay Modal</text>
  </g>

  <!-- Title & Floating Badges -->
  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18" letter-spacing="-0.5">TechVerse Official Paddle Billing Gateway</text>
    <text x="0" y="18" fill="#38bdf8" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">WooCommerce HPOS Certified &bull; Automatic VAT/GST &bull; Overlay &amp; Inline</text>
  </g>
`);

// 2. Coda Payments Official Banner
const codaSvg = baseSvg('#021a13', '#010d09', '#10b981', `
  <g transform="translate(130, 55)" filter="url(#shadow)">
    <rect width="340" height="210" rx="18" fill="rgba(6, 30, 23, 0.9)" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1.5" />
    
    <rect width="340" height="42" rx="18" fill="rgba(16, 185, 129, 0.15)" />
    <circle cx="25" cy="21" r="5" fill="#ef4444" opacity="0.8"/>
    <circle cx="42" cy="21" r="5" fill="#f59e0b" opacity="0.8"/>
    <circle cx="59" cy="21" r="5" fill="#10b981" opacity="0.8"/>
    <text x="170" y="26" fill="#a7f3d0" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="11" text-anchor="middle">Coda Payments (Codapay) &bull; Global Multi-Pay</text>

    <!-- Payment Channels Grid -->
    <g transform="translate(25, 60)">
      <!-- Channel 1: Telco Airtime -->
      <g transform="translate(0, 0)">
        <rect width="88" height="42" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(52, 211, 153, 0.3)" stroke-width="1"/>
        <text x="44" y="20" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="9" text-anchor="middle">&#128241; Telco Pay</text>
        <text x="44" y="32" fill="#6ee7b7" font-family="sans-serif" font-weight="600" font-size="7" text-anchor="middle">Direct Carrier</text>
      </g>
      <!-- Channel 2: E-Wallets -->
      <g transform="translate(100, 0)">
        <rect width="88" height="42" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(52, 211, 153, 0.3)" stroke-width="1"/>
        <text x="44" y="20" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="9" text-anchor="middle">&#128179; E-Wallets</text>
        <text x="44" y="32" fill="#6ee7b7" font-family="sans-serif" font-weight="600" font-size="7" text-anchor="middle">GoPay / OVO / Dana</text>
      </g>
      <!-- Channel 3: Bank Transfer -->
      <g transform="translate(200, 0)">
        <rect width="88" height="42" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(52, 211, 153, 0.3)" stroke-width="1"/>
        <text x="44" y="20" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="9" text-anchor="middle">&#127974; Bank / ATM</text>
        <text x="44" y="32" fill="#6ee7b7" font-family="sans-serif" font-weight="600" font-size="7" text-anchor="middle">Virtual Accounts</text>
      </g>
      <!-- Channel 4: QR Pay -->
      <g transform="translate(0, 52)">
        <rect width="88" height="42" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(52, 211, 153, 0.3)" stroke-width="1"/>
        <text x="44" y="20" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="9" text-anchor="middle">&#9974; QRIS Code</text>
        <text x="44" y="32" fill="#6ee7b7" font-family="sans-serif" font-weight="600" font-size="7" text-anchor="middle">Instant Scan</text>
      </g>
      <!-- Channel 5: Over Counter -->
      <g transform="translate(100, 52)">
        <rect width="88" height="42" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(52, 211, 153, 0.3)" stroke-width="1"/>
        <text x="44" y="20" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="9" text-anchor="middle">&#127978; 7-Eleven</text>
        <text x="44" y="32" fill="#6ee7b7" font-family="sans-serif" font-weight="600" font-size="7" text-anchor="middle">Convenience Store</text>
      </g>
      <!-- Channel 6: Credit/Debit -->
      <g transform="translate(200, 52)">
        <rect width="88" height="42" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(52, 211, 153, 0.3)" stroke-width="1"/>
        <text x="44" y="20" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="9" text-anchor="middle">&#128178; Global Cards</text>
        <text x="44" y="32" fill="#6ee7b7" font-family="sans-serif" font-weight="600" font-size="7" text-anchor="middle">Visa / Mastercard</text>
      </g>
    </g>

    <!-- Bottom Badge -->
    <rect x="25" y="165" width="290" height="26" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="rgba(52, 211, 153, 0.3)" stroke-width="1"/>
    <text x="170" y="182" fill="#a7f3d0" font-family="sans-serif" font-weight="700" font-size="10" text-anchor="middle">&#9889; 300+ Alternative Local Payment Rails &bull; 60+ Countries</text>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18" letter-spacing="-0.5">TechVerse Official Coda Payments Gateway</text>
    <text x="0" y="18" fill="#34d399" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">Telco Airtime &bull; E-Wallets &bull; Server-to-Server HMAC Webhooks</text>
  </g>
`);

// 3. Stripe Gateway Pro
const stripeSvg = baseSvg('#0b0a24', '#040312', '#6366f1', `
  <g transform="translate(140, 55)" filter="url(#shadow)">
    <rect width="320" height="210" rx="18" fill="rgba(15, 14, 46, 0.9)" stroke="rgba(99, 102, 241, 0.4)" stroke-width="1.5" />
    <rect width="320" height="42" rx="18" fill="rgba(99, 102, 241, 0.2)" />
    <text x="160" y="26" fill="#c7d2fe" font-family="sans-serif" font-weight="800" font-size="11" text-anchor="middle">Stripe Elements &bull; High Conversion Checkout</text>

    <!-- Apple Pay & Google Pay Pills -->
    <g transform="translate(35, 60)">
      <rect width="118" height="34" rx="8" fill="#000000" stroke="#334155" stroke-width="1"/>
      <text x="59" y="21" fill="#ffffff" font-family="sans-serif" font-weight="700" font-size="10" text-anchor="middle">&#63743; Pay Express</text>

      <rect x="132" width="118" height="34" rx="8" fill="#000000" stroke="#334155" stroke-width="1"/>
      <text x="191" y="21" fill="#ffffff" font-family="sans-serif" font-weight="700" font-size="10" text-anchor="middle">G Pay Express</text>
    </g>

    <!-- In-line Card Element Mockup -->
    <g transform="translate(35, 106)">
      <rect width="250" height="42" rx="8" fill="rgba(2, 6, 23, 0.8)" stroke="#4f46e5" stroke-width="1.5"/>
      <text x="15" y="26" fill="#e0e7ff" font-family="monospace" font-size="11">4242 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242</text>
      <text x="195" y="26" fill="#818cf8" font-family="monospace" font-size="10">12/28</text>
      <text x="235" y="26" fill="#818cf8" font-family="monospace" font-size="10">CVC</text>
    </g>

    <rect x="35" y="162" width="250" height="32" rx="8" fill="linear-gradient(90deg, #4f46e5, #06b6d4)"/>
    <text x="160" y="182" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="11" text-anchor="middle">Pay $79.00 USD &bull; SCA 3DS2 Protected</text>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">TechVerse Stripe Gateway Pro</text>
    <text x="0" y="18" fill="#a5b4fc" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">Apple Pay &bull; Google Pay &bull; Inline Elements &bull; SCA 3DS2 Ready</text>
  </g>
`);

// 4. PayPal Advanced Pro
const paypalSvg = baseSvg('#03122b', '#010612', '#0284c7', `
  <g transform="translate(140, 55)" filter="url(#shadow)">
    <rect width="320" height="210" rx="18" fill="rgba(8, 25, 55, 0.9)" stroke="rgba(14, 165, 233, 0.4)" stroke-width="1.5" />
    <rect width="320" height="42" rx="18" fill="rgba(14, 165, 233, 0.2)" />
    <text x="160" y="26" fill="#bae6fd" font-family="sans-serif" font-weight="800" font-size="11" text-anchor="middle">PayPal Smart Buttons &bull; Official Integration</text>

    <!-- Smart Buttons Mockup -->
    <g transform="translate(45, 60)">
      <rect width="230" height="38" rx="19" fill="#ffc439"/>
      <text x="115" y="24" fill="#003087" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-style="italic" font-size="14" text-anchor="middle">PayPal</text>

      <rect y="46" width="230" height="38" rx="19" fill="#2c2e2f"/>
      <text x="115" y="70" fill="#ffffff" font-family="sans-serif" font-weight="700" font-size="11" text-anchor="middle">Debit or Credit Card</text>

      <rect y="92" width="230" height="32" rx="8" fill="rgba(14, 165, 233, 0.15)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1"/>
      <text x="115" y="112" fill="#38bdf8" font-family="sans-serif" font-weight="700" font-size="10" text-anchor="middle">&#9889; Pay in 4 Interest-Free Installments</text>
    </g>

    <text x="160" y="188" fill="#7dd3fc" font-family="sans-serif" font-weight="700" font-size="9" text-anchor="middle">&#10003; Real-time IPN Webhook &bull; Venmo Mobile Ready</text>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">TechVerse PayPal Advanced Pro</text>
    <text x="0" y="18" fill="#38bdf8" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">Smart Buttons &bull; Pay Later &bull; Venmo &bull; Zero Redirection</text>
  </g>
`);

// 5. Mollie Gateway
const mollieSvg = baseSvg('#1c1103', '#080501', '#f59e0b', `
  <g transform="translate(140, 55)" filter="url(#shadow)">
    <rect width="320" height="210" rx="18" fill="rgba(35, 22, 5, 0.9)" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1.5" />
    <rect width="320" height="42" rx="18" fill="rgba(245, 158, 11, 0.15)" />
    <text x="160" y="26" fill="#fde68a" font-family="sans-serif" font-weight="800" font-size="11" text-anchor="middle">Mollie European Payments &bull; Multi-Currency</text>

    <g transform="translate(35, 60)">
      <rect width="118" height="34" rx="8" fill="#ec4899" opacity="0.9"/>
      <text x="59" y="22" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="11" text-anchor="middle">iDEAL</text>

      <rect x="132" width="118" height="34" rx="8" fill="#0284c7" opacity="0.9"/>
      <text x="191" y="22" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">Bancontact</text>

      <rect y="44" width="118" height="34" rx="8" fill="#10b981" opacity="0.9"/>
      <text x="59" y="66" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">SEPA Bank</text>

      <rect x="132" y="44" width="118" height="34" rx="8" fill="#f59e0b" opacity="0.9"/>
      <text x="191" y="66" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">Sofort Pay</text>
    </g>

    <rect x="35" y="155" width="250" height="30" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="rgba(245, 158, 11, 0.3)" stroke-width="1"/>
    <text x="160" y="174" fill="#fef3c7" font-family="sans-serif" font-weight="700" font-size="10" text-anchor="middle">20+ Local European Methods &bull; EUR Multi-Currency</text>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">TechVerse Mollie Multi-Currency Gateway</text>
    <text x="0" y="18" fill="#fcd34d" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">iDEAL &bull; Bancontact &bull; SEPA &bull; European Local Currencies</text>
  </g>
`);

// 6. Worldpay Gateway
const worldpaySvg = baseSvg('#1a0408', '#080103', '#ef4444', `
  <g transform="translate(140, 55)" filter="url(#shadow)">
    <rect width="320" height="210" rx="18" fill="rgba(35, 8, 14, 0.9)" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" />
    <rect width="320" height="42" rx="18" fill="rgba(239, 68, 68, 0.15)" />
    <text x="160" y="26" fill="#fecaca" font-family="sans-serif" font-weight="800" font-size="11" text-anchor="middle">FIS Worldpay &bull; Enterprise Corporate Gateway</text>

    <g transform="translate(35, 60)">
      <rect width="250" height="85" rx="10" fill="rgba(15, 23, 42, 0.8)" stroke="#ef4444" stroke-width="1"/>
      <text x="125" y="28" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="12" text-anchor="middle">&#127974; Direct Bank Merchant Account</text>
      <text x="125" y="48" fill="#fca5a5" font-family="sans-serif" font-weight="600" font-size="10" text-anchor="middle">120+ Settlement Currencies Supported</text>
      <text x="125" y="68" fill="#38bdf8" font-family="sans-serif" font-weight="700" font-size="9" text-anchor="middle">&#128274; Tokenized PCI-DSS Card Vaulting</text>
    </g>

    <rect x="35" y="160" width="250" height="28" rx="8" fill="linear-gradient(90deg, #dc2626, #991b1b)"/>
    <text x="160" y="178" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">Direct XML Integration &bull; High Volume SLA</text>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">TechVerse Worldpay Enterprise Gateway</text>
    <text x="0" y="18" fill="#f87171" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">Corporate Merchant Accounts &bull; Multi-Currency &bull; Vaulting</text>
  </g>
`);

// 7. Gateways Bundle
const bundleSvg = baseSvg('#140b2e', '#050212', '#a855f7', `
  <g transform="translate(140, 50)" filter="url(#shadow)">
    <!-- Stack of 3 Cards -->
    <rect x="25" y="0" width="270" height="150" rx="14" fill="#0f172a" opacity="0.4" stroke="#a855f7" stroke-width="1"/>
    <rect x="15" y="15" width="290" height="160" rx="14" fill="#1e1b4b" opacity="0.7" stroke="#38bdf8" stroke-width="1"/>
    <rect x="0" y="30" width="320" height="175" rx="16" fill="rgba(15, 23, 42, 0.95)" stroke="#c084fc" stroke-width="1.5"/>

    <text x="160" y="60" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" text-anchor="middle">ULTIMATE GATEWAYS MASTER SUITE</text>
    
    <g transform="translate(25, 75)">
      <rect width="60" height="30" rx="6" fill="#0284c7"/><text x="30" y="19" fill="#fff" font-family="sans-serif" font-weight="800" font-size="8" text-anchor="middle">PADDLE</text>
      <rect x="70" width="60" height="30" rx="6" fill="#10b981"/><text x="100" y="19" fill="#fff" font-family="sans-serif" font-weight="800" font-size="8" text-anchor="middle">CODA</text>
      <rect x="140" width="60" height="30" rx="6" fill="#6366f1"/><text x="170" y="19" fill="#fff" font-family="sans-serif" font-weight="800" font-size="8" text-anchor="middle">STRIPE</text>
      <rect x="210" width="60" height="30" rx="6" fill="#f59e0b"/><text x="240" y="19" fill="#fff" font-family="sans-serif" font-weight="800" font-size="8" text-anchor="middle">PAYPAL</text>
    </g>

    <text x="160" y="135" fill="#e9d5ff" font-family="sans-serif" font-weight="700" font-size="11" text-anchor="middle">5 Enterprise Gateway Plugins &bull; Unlimited Stores</text>
    <rect x="40" y="152" width="240" height="26" rx="8" fill="linear-gradient(90deg, #9333ea, #06b6d4)"/>
    <text x="160" y="169" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">Developer License &bull; Save $226 Deal</text>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">The Ultimate Gateways Master Suite</text>
    <text x="0" y="18" fill="#d8b4fe" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">Paddle &bull; Coda &bull; Stripe &bull; PayPal &bull; Worldpay All-In-One</text>
  </g>
`);

// 8. SSL Shield
const sslShieldSvg = baseSvg('#021a24', '#01080d', '#06b6d4', `
  <g transform="translate(150, 45)" filter="url(#shadow)">
    <!-- 3D Glowing Shield -->
    <path d="M 150 15 L 260 55 L 260 145 C 260 200, 150 240, 150 240 C 150 240, 40 200, 40 145 L 40 55 Z" fill="rgba(6, 30, 45, 0.9)" stroke="#22d3ee" stroke-width="2"/>
    <path d="M 150 30 L 245 65 L 245 140 C 245 188, 150 222, 150 222 C 150 222, 55 188, 55 140 L 55 65 Z" fill="linear-gradient(180deg, rgba(6, 182, 212, 0.25) 0%, rgba(2, 6, 23, 0.8) 100%)"/>
    
    <!-- Padlock Graphic -->
    <rect x="130" y="115" width="40" height="32" rx="6" fill="#22d3ee"/>
    <path d="M 137 115 L 137 98 C 137 90, 163 90, 163 98 L 163 115" fill="none" stroke="#22d3ee" stroke-width="4"/>
    <circle cx="150" cy="128" r="4" fill="#083344"/>
    <rect x="148" y="128" width="4" height="9" fill="#083344"/>

    <text x="150" y="175" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="12" text-anchor="middle">HTTPS ENFORCER</text>
    <text x="150" y="192" fill="#67e8f9" font-family="sans-serif" font-weight="700" font-size="9" text-anchor="middle">HSTS &bull; Mixed Content Fixed</text>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">TechVerse SSL Shield &amp; HTTPS Enforcer</text>
    <text x="0" y="18" fill="#67e8f9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">WordPress Plugin &bull; Automatic 301 Redirects &bull; Zero Config</text>
  </g>
`);

// 9. Expiry Watchdog
const watchdogSvg = baseSvg('#051329', '#01050d', '#3b82f6', `
  <g transform="translate(150, 45)" filter="url(#shadow)">
    <circle cx="150" cy="120" r="85" fill="rgba(15, 23, 42, 0.9)" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="150" cy="120" r="65" fill="none" stroke="rgba(59, 130, 246, 0.3)" stroke-width="1" stroke-dasharray="4,4"/>
    <circle cx="150" cy="120" r="45" fill="none" stroke="rgba(59, 130, 246, 0.4)" stroke-width="1"/>
    
    <!-- Radar scanner beam -->
    <path d="M 150 120 L 210 60 A 85 85 0 0 1 235 120 Z" fill="rgba(59, 130, 246, 0.25)"/>
    <circle cx="190" cy="85" r="4" fill="#60a5fa"/>

    <!-- Bell icon -->
    <text x="150" y="128" fill="#ffffff" font-family="sans-serif" font-size="28" text-anchor="middle">&#128276;</text>
    <text x="150" y="160" fill="#93c5fd" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">60-MIN HEARTBEAT</text>
    <text x="150" y="174" fill="#38bdf8" font-family="sans-serif" font-weight="700" font-size="9" text-anchor="middle">24/7 Global TLS Monitoring</text>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">24/7 Expiry Watchdog Cloud Service</text>
    <text x="0" y="18" fill="#93c5fd" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">Telegram, Slack &amp; Email Alerts &bull; Multi-Edge Monitoring</text>
  </g>
`);

// 10. SaaS Prime Theme
const saasThemeSvg = baseSvg('#060e1f', '#02050d', '#0ea5e9', `
  <g transform="translate(130, 50)" filter="url(#shadow)">
    <!-- Browser window mockup -->
    <rect width="340" height="210" rx="14" fill="rgba(15, 23, 42, 0.95)" stroke="#38bdf8" stroke-width="1.5"/>
    <rect width="340" height="32" rx="14" fill="#1e293b"/>
    <circle cx="20" cy="16" r="4" fill="#ef4444"/>
    <circle cx="34" cy="16" r="4" fill="#f59e0b"/>
    <circle cx="48" cy="16" r="4" fill="#10b981"/>
    <rect x="70" y="8" width="200" height="16" rx="5" fill="#0f172a"/>
    <text x="170" y="20" fill="#94a3b8" font-family="sans-serif" font-size="8" text-anchor="middle">https://mystore.com</text>

    <!-- UI layout preview inside window -->
    <g transform="translate(20, 45)">
      <rect width="300" height="60" rx="8" fill="linear-gradient(90deg, rgba(14, 165, 233, 0.2), rgba(99, 102, 241, 0.2))" stroke="#334155" stroke-width="1"/>
      <text x="20" y="28" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="12">Scale Your Digital SaaS</text>
      <text x="20" y="44" fill="#94a3b8" font-family="sans-serif" font-size="8">Ultra-fast Tailwind CSS &amp; Alpine.js templates</text>
      
      <!-- 3 Bento cards -->
      <g transform="translate(0, 70)">
        <rect width="90" height="75" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="45" y="42" fill="#38bdf8" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">Pricing Table</text>

        <rect x="105" width="90" height="75" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="150" y="42" fill="#38bdf8" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">API Docs</text>

        <rect x="210" width="90" height="75" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="255" y="42" fill="#38bdf8" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">Dark Mode</text>
      </g>
    </g>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">TechVerse SaaS Prime Theme</text>
    <text x="0" y="18" fill="#38bdf8" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">Tailwind CSS &bull; Alpine.js &bull; 99+ PageSpeed &bull; Figma Source</text>
  </g>
`);

// 11. Checkout Pro Kit
const checkoutProSvg = baseSvg('#0f0826', '#04020d', '#8b5cf6', `
  <g transform="translate(180, 45)" filter="url(#shadow)">
    <!-- Smartphone frame -->
    <rect width="240" height="225" rx="24" fill="rgba(15, 23, 42, 0.95)" stroke="#a855f7" stroke-width="2"/>
    <rect x="90" y="8" width="60" height="5" rx="2.5" fill="#334155"/>

    <!-- 1-Step Funnel content -->
    <g transform="translate(20, 25)">
      <text x="100" y="20" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="11" text-anchor="middle">Express 1-Step Checkout</text>
      
      <!-- Express pills -->
      <rect y="32" width="200" height="26" rx="6" fill="#000000" stroke="#475569" stroke-width="1"/>
      <text x="100" y="49" fill="#ffffff" font-family="sans-serif" font-weight="700" font-size="9" text-anchor="middle">&#63743; Apple Pay / G Pay</text>

      <!-- Customer inputs -->
      <rect y="68" width="200" height="24" rx="5" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <text x="10" y="84" fill="#94a3b8" font-family="sans-serif" font-size="8">john@example.com</text>

      <!-- Order bump -->
      <rect y="100" width="200" height="34" rx="6" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" stroke-width="1"/>
      <text x="10" y="115" fill="#c084fc" font-family="sans-serif" font-weight="700" font-size="8">&#9733; 1-Click Order Bump (Save 40%)</text>
      <text x="10" y="126" fill="#94a3b8" font-family="sans-serif" font-size="7">Add priority VIP license support</text>

      <!-- Button -->
      <rect y="145" width="200" height="32" rx="8" fill="linear-gradient(90deg, #9333ea, #6366f1)"/>
      <text x="100" y="165" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="10" text-anchor="middle">Complete Order ($49.00)</text>
    </g>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">TechVerse Checkout Pro UI Kit</text>
    <text x="0" y="18" fill="#c084fc" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">1-Step Funnel &bull; Address Autocomplete &bull; +34% Conversion Boost</text>
  </g>
`);

// 12. Sectigo Wildcard SSL
const wildcardSvg = baseSvg('#1c1703', '#080601', '#eab308', `
  <g transform="translate(140, 50)" filter="url(#shadow)">
    <!-- Certificate Parchment -->
    <rect width="320" height="205" rx="14" fill="rgba(25, 20, 5, 0.95)" stroke="#eab308" stroke-width="1.5"/>
    <rect x="8" y="8" width="304" height="189" rx="10" fill="none" stroke="rgba(234, 179, 8, 0.3)" stroke-width="1" stroke-dasharray="6,4"/>

    <!-- Gold Seal -->
    <circle cx="160" cy="65" r="28" fill="linear-gradient(135deg, #fef08a, #ca8a04)" stroke="#713f12" stroke-width="2"/>
    <text x="160" y="72" fill="#713f12" font-family="sans-serif" font-weight="900" font-size="20" text-anchor="middle">&#128274;</text>

    <text x="160" y="115" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" text-anchor="middle">SECTIGO WILDCARD SSL</text>
    <text x="160" y="132" fill="#fde047" font-family="monospace" font-weight="700" font-size="11" text-anchor="middle">*.techversestudio.com</text>

    <!-- Highlights -->
    <g transform="translate(30, 145)">
      <rect width="260" height="34" rx="6" fill="rgba(234, 179, 8, 0.15)" stroke="rgba(234, 179, 8, 0.3)" stroke-width="1"/>
      <text x="130" y="18" fill="#fef08a" font-family="sans-serif" font-weight="700" font-size="9" text-anchor="middle">Unlimited Subdomains &bull; $500,000 Warranty</text>
      <text x="130" y="28" fill="#94a3b8" font-family="sans-serif" font-size="8" text-anchor="middle">2048/4096-bit RSA &bull; 99.9% Browser Recognition</text>
    </g>
  </g>

  <g transform="translate(300, 305)" text-anchor="middle">
    <text x="0" y="0" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18">Sectigo Wildcard SSL Certificate</text>
    <text x="0" y="18" fill="#fde047" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">Secures Root &amp; Unlimited Subdomains &bull; Automated Issuance</text>
  </g>
`);

// Write all 12 SVG banners
const banners = [
  { file: 'paddle-official.svg', content: paddleSvg },
  { file: 'coda-official.svg', content: codaSvg },
  { file: 'stripe-gateway.svg', content: stripeSvg },
  { file: 'paypal-advanced.svg', content: paypalSvg },
  { file: 'mollie-gateway.svg', content: mollieSvg },
  { file: 'worldpay-gateway.svg', content: worldpaySvg },
  { file: 'gateways-bundle.svg', content: bundleSvg },
  { file: 'ssl-shield.svg', content: sslShieldSvg },
  { file: 'expiry-watchdog.svg', content: watchdogSvg },
  { file: 'saas-prime-theme.svg', content: saasThemeSvg },
  { file: 'checkout-pro-kit.svg', content: checkoutProKit = checkoutProSvg },
  { file: 'sectigo-wildcard-ssl.svg', content: wildcardSvg }
];

banners.forEach(b => {
  const p = path.join(targetDir, b.file);
  fs.writeFileSync(p, b.content, 'utf8');
  console.log('Generated: ' + b.file);
});

console.log('All 12 high-resolution product banners successfully generated!');
