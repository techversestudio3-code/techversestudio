const crypto = require('crypto');

/**
 * Generate RSA 2048 Private Key and Self-Contained Keypair/CSR details
 */
function generateCSRData(details) {
  const {
    commonName,
    organization = 'TechVerse LLC',
    organizationalUnit = 'IT Security',
    country = 'US',
    state = 'Montana',
    city = 'Helena',
    email = 'admin@' + commonName,
    keySize = 2048
  } = details;

  // Generate Key Pair
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: parseInt(keySize, 10),
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  return {
    commonName,
    organization,
    country,
    state,
    city,
    email,
    keySize,
    privateKeyPem: privateKey,
    publicKeyPem: publicKey,
    generatedAt: new Date().toISOString(),
    provider: 'TechVerse Crypto Engine (techversestudio.com)'
  };
}

module.exports = { generateCSRData };
