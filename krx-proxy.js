const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 8082;
const API_KEY = '802C4FEDAB024D06B84E28A5B61CF90BD66EC39E';

const server = http.createServer((req, res) => {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // /kospi 또는 /kosdaq 엔드포인트만 처리
  if (pathname !== '/kospi' && pathname !== '/kosdaq') {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  // KRX API URL 결정
  const apiUrl = pathname === '/kospi'
    ? 'https://data-dbg.krx.co.kr/svc/apis/idx/kospi_dd_trd'
    : 'https://data-dbg.krx.co.kr/svc/apis/idx/kosdaq_dd_trd';

  // 날짜 파라미터 가져오기
  const basDd = parsedUrl.query.basDd || '';
  const targetUrl = `${apiUrl}?basDd=${basDd}`;

  console.log(`프록시 요청: ${targetUrl}`);

  // KRX API 호출
  const options = {
    headers: {
      'AUTH_KEY': API_KEY
    }
  };

  https.get(targetUrl, options, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
      console.log(`응답 완료: ${pathname}`);
    });

  }).on('error', (err) => {
    console.error('API 호출 에러:', err);
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.message }));
  });
});

server.listen(PORT, () => {
  console.log(`KRX 프록시 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`코스피: http://localhost:${PORT}/kospi?basDd=YYYYMMDD`);
  console.log(`코스닥: http://localhost:${PORT}/kosdaq?basDd=YYYYMMDD`);
});
