const https = require('https');
const http = require('http');

/**
 * Audit Website HTTPS & Security Headers
 */
function auditTarget(targetUrl) {
  return new Promise((resolve) => {
    let cleanUrl = targetUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    const parsed = new URL(cleanUrl);
    const client = parsed.protocol === 'https:' ? https : http;

    const req = client.get(parsed, { timeout: 8000, rejectUnauthorized: false }, (res) => {
      const headers = res.headers;
      let score = 100;
      const findings = [];

      // 1. Strict-Transport-Security (HSTS)
      if (headers['strict-transport-security']) {
        findings.push({
          check: 'HSTS (Strict-Transport-Security)',
          status: 'PASS',
          score: '+20',
          value: headers['strict-transport-security'],
          message: 'HSTS is properly deployed to mitigate MITM downgrades.'
        });
      } else {
        score -= 25;
        findings.push({
          check: 'HSTS (Strict-Transport-Security)',
          status: 'FAIL',
          score: '-25',
          message: 'Missing HSTS header. Browsers may connect over insecure HTTP.'
        });
      }

      // 2. Content-Security-Policy (CSP)
      if (headers['content-security-policy']) {
        findings.push({
          check: 'Content-Security-Policy (CSP)',
          status: 'PASS',
          score: '+20',
          message: 'CSP active to restrict unauthorized scripts and XSS execution.'
        });
      } else {
        score -= 20;
        findings.push({
          check: 'Content-Security-Policy (CSP)',
          status: 'WARN',
          score: '-20',
          message: 'Missing Content-Security-Policy. Vulnerable to injection vectors.'
        });
      }

      // 3. X-Frame-Options
      if (headers['x-frame-options']) {
        findings.push({
          check: 'X-Frame-Options (Clickjacking Protection)',
          status: 'PASS',
          score: '+15',
          value: headers['x-frame-options'],
          message: 'Protected against iframe clickjacking attacks.'
        });
      } else {
        score -= 15;
        findings.push({
          check: 'X-Frame-Options',
          status: 'FAIL',
          score: '-15',
          message: 'Header missing. Attackers can embed this page in malicious frames.'
        });
      }

      // 4. X-Content-Type-Options
      if (headers['x-content-type-options'] === 'nosniff') {
        findings.push({
          check: 'X-Content-Type-Options',
          status: 'PASS',
          score: '+15',
          message: 'MIME-sniffing protection enabled.'
        });
      } else {
        score -= 10;
        findings.push({
          check: 'X-Content-Type-Options',
          status: 'FAIL',
          score: '-10',
          message: 'nosniff missing. Browser may incorrectly execute MIME types.'
        });
      }

      // 5. Referrer-Policy
      if (headers['referrer-policy']) {
        findings.push({
          check: 'Referrer-Policy',
          status: 'PASS',
          score: '+10',
          value: headers['referrer-policy'],
          message: 'Referrer information leakage restricted.'
        });
      } else {
        score -= 10;
        findings.push({
          check: 'Referrer-Policy',
          status: 'WARN',
          score: '-10',
          message: 'Missing Referrer-Policy header.'
        });
      }

      score = Math.max(0, score);
      let grade = 'F';
      if (score >= 90) grade = 'A+';
      else if (score >= 80) grade = 'A';
      else if (score >= 70) grade = 'B';
      else if (score >= 60) grade = 'C';
      else if (score >= 50) grade = 'D';

      resolve({
        url: cleanUrl,
        statusCode: res.statusCode,
        overallScore: score,
        grade: grade,
        findings: findings,
        rawHeaders: headers,
        auditedBy: 'TechVerse Security Engine (TechVerse LLC)'
      });
    });

    req.on('error', (err) => {
      resolve({
        url: cleanUrl,
        error: err.message,
        grade: 'ERROR'
      });
    });

    req.setTimeout(8000, () => {
      req.destroy();
      resolve({
        url: cleanUrl,
        error: 'Connection timeout',
        grade: 'TIMEOUT'
      });
    });
  });
}

module.exports = { auditTarget };
