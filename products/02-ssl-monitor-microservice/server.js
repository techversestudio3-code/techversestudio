const express = require('express');
const cors = require('cors');
const tls = require('tls');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

/**
 * Inspect SSL Certificate of any domain via raw TLS Handshake
 */
function checkDomainSSL(rawDomain) {
  return new Promise((resolve, reject) => {
    // Sanitize domain
    let domain = rawDomain.replace(/^https?:\/\//i, '').split('/')[0].split(':')[0].trim();
    if (!domain) {
      return reject(new Error('Invalid domain specified'));
    }

    const options = {
      host: domain,
      port: 443,
      method: 'GET',
      rejectUnauthorized: false, // Allows inspecting even expired or misconfigured certs
      servername: domain, // SNI support
      timeout: 6000
    };

    const socket = tls.connect(options, () => {
      const cert = socket.getPeerCertificate(true);
      socket.destroy();

      if (!cert || Object.keys(cert).length === 0) {
        return resolve({
          domain,
          status: 'error',
          message: 'No peer certificate presented by host.'
        });
      }

      const validFrom = new Date(cert.valid_from);
      const validTo = new Date(cert.valid_to);
      const now = new Date();
      const diffTime = validTo.getTime() - now.getTime();
      const daysRemaining = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      const isAuthorized = socket.authorized;
      const authorizationError = socket.authorizationError || null;

      resolve({
        domain,
        status: daysRemaining > 0 ? 'active' : 'expired',
        commonName: cert.subject ? cert.subject.CN : 'Unknown',
        issuer: cert.issuer ? (cert.issuer.O || cert.issuer.CN) : 'Unknown',
        validFrom: validFrom.toISOString(),
        validTo: validTo.toISOString(),
        daysRemaining: daysRemaining,
        isValid: daysRemaining > 0 && isAuthorized,
        isAuthorized: isAuthorized,
        authorizationError: authorizationError,
        serialNumber: cert.serialNumber,
        fingerprint256: cert.fingerprint256,
        san: cert.subjectaltname || ''
      });
    });

    socket.on('error', (err) => {
      resolve({
        domain,
        status: 'connection_failed',
        message: err.message
      });
    });

    socket.setTimeout(6000, () => {
      socket.destroy();
      resolve({
        domain,
        status: 'timeout',
        message: 'Connection timed out while establishing TLS handshake on port 443.'
      });
    });
  });
}

// In-memory alert subscriptions store (Can be linked to Turso/SQLite/Postgres)
const subscribers = [];

// API: Health check
app.get('/api/v1/health', (req, res) => {
  res.json({
    service: 'TechVerse SSL Monitor API',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    organization: 'TechVerse LLC'
  });
});

// API: Instant live SSL check
app.post('/api/v1/monitor/check', async (req, res) => {
  const { domain } = req.body;
  if (!domain) {
    return res.status(400).json({ error: 'Domain parameter is required' });
  }

  try {
    const result = await checkDomainSSL(domain);
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// API: Subscribe for expiration alerts
app.post('/api/v1/monitor/subscribe', (req, res) => {
  const { domain, email, webhookUrl, alertDaysThreshold = 14 } = req.body;
  if (!domain || (!email && !webhookUrl)) {
    return res.status(400).json({ error: 'Domain and email or webhookUrl are required' });
  }

  const subscription = {
    id: 'sub_' + Math.random().toString(36).substring(2, 9),
    domain: domain.toLowerCase().trim(),
    email: email || null,
    webhookUrl: webhookUrl || null,
    alertDaysThreshold: parseInt(alertDaysThreshold, 10),
    createdAt: new Date().toISOString(),
    status: 'monitoring'
  };

  subscribers.push(subscription);

  res.status(201).json({
    success: true,
    message: 'Domain subscribed for automated SSL expiration alerts.',
    subscription
  });
});

app.listen(PORT, () => {
  console.log(`[TechVerse SSL Monitor] Service running on http://localhost:${PORT}`);
});
