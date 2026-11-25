const https = require('https');
https.get('https://techversestudio.com/contact', { rejectUnauthorized: false }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const lines = data.split('\n');
        console.log('Total lines:', lines.length);
        for (let i = 70; i < 90 && i < lines.length; i++) {
            console.log(i + ': ' + lines[i]);
        }
    });
});
