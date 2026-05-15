const http = require('http');
const https = require('https');
const mongoose = require('mongoose');
require('dotenv').config();

function request(options, body) {
  return new Promise((resolve, reject) => {
    const lib = options.protocol === 'https:' ? https : http;
    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ res, data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function run() {
  try {
    const payload = JSON.stringify({
      username: 'e2e_test_user',
      email: `e2e+${Date.now()}@example.com`,
      password: 'pass1234',
    });

    const regOpts = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    console.log('Registering user...');
    const { res: regRes, data: regData } = await request(regOpts, payload);
    console.log('Register status:', regRes.statusCode);
    const setCookie = regRes.headers['set-cookie'];
    console.log('Set-Cookie header:', setCookie);

    let token = null;
    if (setCookie && setCookie.length) {
      const m = setCookie[0].match(/token=([^;]+)/);
      if (m) token = m[1];
    }

    if (!token) {
      console.error('No token found in Set-Cookie, aborting logout test');
      process.exit(1);
    }

    console.log('Token extracted:', token.slice(0, 8) + '...');

    const logoutOpts = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/logout',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log('Calling logout...');
    const { res: logoutRes, data: logoutData } = await request(logoutOpts);
    console.log('Logout status:', logoutRes.statusCode);
    console.log('Logout body:', logoutData);

    console.log('Connecting to MongoDB to check blacklist...');
    await mongoose.connect(process.env.MONGO_URI);
    const docs = await mongoose.connection.db.collection('blacklisttokens').find({}).sort({ createdAt: -1 }).limit(5).toArray();
    console.log('Recent blacklist entries:', docs);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
