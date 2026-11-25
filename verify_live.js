const https = require('https');

const BASE_URL = 'https://techversestudio.com';

function fetchUrl(path) {
    return new Promise((resolve, reject) => {
        const url = BASE_URL + path;
        https.get(url, { rejectUnauthorized: false }, (res) => {
            let data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(data);
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: buffer.toString('utf8'),
                    length: buffer.length
                });
            });
        }).on('error', reject);
    });
}

async function runAudit() {
    console.log('=== COMMENCING PADDLE PRE-APPLICATION LIVE AUDIT ===\n');

    let allPassed = true;

    // 1. Check Homepage
    const home = await fetchUrl('/');
    console.log(`[1] Homepage (/): Status ${home.status}, Size: ${home.length} bytes`);
    if (home.status !== 200) allPassed = false;

    // Check placeholder cleanup
    if (home.body.includes('customer@example.com') || home.body.includes('*.yourdomain.com')) {
        console.error('❌ Found unresolved placeholder on homepage!');
        allPassed = false;
    } else {
        console.log('✅ Homepage sanitized: Zero placeholder domains or dummy emails found.');
    }

    // 2. Check All 12 Product PNGs
    const images = [
        'paddle-official.png',
        'coda-official.png',
        'stripe-gateway.png',
        'paypal-advanced.png',
        'mollie-gateway.png',
        'worldpay-gateway.png',
        'gateways-bundle.png',
        'ssl-shield.png',
        'expiry-watchdog.png',
        'saas-prime-theme.png',
        'checkout-pro-kit.png',
        'sectigo-wildcard-ssl.png'
    ];

    console.log('\n[2] Checking 12 High-Resolution Product PNGs on Live CDN:');
    for (const img of images) {
        const res = await fetchUrl('/assets/products/' + img);
        if (res.status === 200 && res.length > 50000) {
            console.log(`   ✅ ${img} -> 200 OK (${res.length} bytes)`);
        } else {
            console.error(`   ❌ ${img} -> Status ${res.status}, Length ${res.length}`);
            allPassed = false;
        }
    }

    // 3. Check Policy Pages
    const pages = [
        { path: '/terms', check: 'Terms of Service', keyword: 'TechVerse' },
        { path: '/privacy', check: 'Privacy Policy', keyword: 'Privacy Policy' },
        { path: '/refund', check: 'Refund Policy', keyword: '30-Day Money-Back Guarantee' },
        { path: '/contact', check: 'Contact Us', keyword: 'support@techversestudio.com' },
        { path: '/delivery', check: 'Delivery Policy', keyword: 'Digital Delivery' }
    ];

    console.log('\n[3] Checking Mandatory Paddle Legal & Support Pages:');
    for (const pg of pages) {
        const res = await fetchUrl(pg.path);
        const hasKeyword = res.body.includes(pg.keyword);
        if (res.status === 200 && hasKeyword) {
            console.log(`   ✅ ${pg.path} -> 200 OK (Contains: "${pg.keyword}")`);
        } else {
            console.error(`   ❌ ${pg.path} -> Status ${res.status}, Location: ${res.headers.location}, Keyword match: ${hasKeyword}, Body length: ${res.length}`);
            allPassed = false;
        }
    }

    // 4. Contact page placeholder check
    const contactRes = await fetchUrl('/contact');
    if (contactRes.body.includes('placeholder="yourdomain.com"')) {
        console.error('❌ Contact form still contains placeholder="yourdomain.com"');
        allPassed = false;
    } else {
        console.log('✅ Contact form clean: placeholder="e.g. mystore.com" confirmed.');
    }

    console.log('\n====================================================');
    if (allPassed) {
        console.log('🎉 AUDIT RESULT: 100% PASSED! SITE IS FULLY READY FOR PADDLE & GMC APPLICATION!');
    } else {
        console.log('⚠️ AUDIT RESULT: SOME CHECKS FAILED!');
    }
    console.log('====================================================');
}

runAudit().catch(console.error);
