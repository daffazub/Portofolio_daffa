const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let currentPort = Number(process.env.PORT) || 3000;
let attempts = 0;
const MAX_ATTEMPTS = 15;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  req.on('error', (err) => {
    console.error('Request error:', err.message);
  });

  res.on('error', (err) => {
    console.error('Response error:', err.message);
  });

  let reqUrl;
  try {
    reqUrl = decodeURI(req.url.split('?')[0]);
  } catch (e) {
    reqUrl = req.url.split('?')[0];
  }

  if (reqUrl === '/') {
    reqUrl = '/index.html';
  }

  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(BASE_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1><p>File tidak ditemukan: ' + reqUrl + '</p>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.on('error', (streamErr) => {
      console.error('Stream error:', streamErr.message);
      if (!res.headersSent) {
        res.writeHead(500);
      }
      res.end();
    });
    stream.pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    attempts++;
    if (attempts <= MAX_ATTEMPTS) {
      currentPort++;
      console.log(`Port ${currentPort - 1} sedang digunakan. Mencoba port ${currentPort}...`);
      server.listen(currentPort);
    } else {
      console.error('Gagal menemukan port yang kosong setelah beberapa percobaan.');
    }
  } else {
    console.error('Server error:', err);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

server.listen(currentPort, () => {
  const actualPort = server.address().port;
  const url = `http://localhost:${actualPort}`;
  console.log(`Server portofolio berjalan di: ${url}`);
  console.log(`Tekan Ctrl+C untuk menghentikan server.`);

  // Buka otomatis di browser default Windows
  exec(`start ${url}`);
});
