const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  const vaultPath = 'G:\\My Drive\\Projects\\vault.json';
  const vault = JSON.parse(fs.readFileSync(vaultPath, 'utf8'));
  
  const cfToken = vault.cloudflare?.api_token || vault.cloudflare_api_token || vault.CLOUDFLARE_API_TOKEN;
  const cfAccount = vault.cloudflare?.account_id || vault.cloudflare_account_id || vault.CLOUDFLARE_ACCOUNT_ID;

  if (!cfToken) {
    console.error('Cloudflare token not found in vault.json');
    process.exit(1);
  }

  const env = {
    ...process.env,
    CLOUDFLARE_API_TOKEN: cfToken,
    CLOUDFLARE_ACCOUNT_ID: cfAccount || ''
  };

  console.log('Deploying updated platform to Cloudflare Pages ...');
  const output = execSync('npx wrangler pages deploy platform --project-name techversestudio --branch main', {
    cwd: 'G:\\My Drive\\Projects\\WhiteHat\\techversestudio',
    env: env,
    encoding: 'utf8'
  });

  console.log(output);
  console.log('Deployment to Cloudflare Pages completed successfully!');
} catch (err) {
  console.error('Deployment error:', err.message);
  if (err.stdout) console.log('stdout:', err.stdout);
  if (err.stderr) console.error('stderr:', err.stderr);
  process.exit(1);
} finally {
  try {
    fs.unlinkSync(__filename);
    console.log('Temporary deployment script removed.');
  } catch (e) {}
}
