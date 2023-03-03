const fs = require("fs");
// 인증서를 저장한 파일을 읽어오기 위해서 fs 모듈을 불러온다
const path = require("path");
// https 모듈을 불러온다
const https = require("https");
const express = require("express");

const PORT = 3000;
const app = express();
app.get("/secret", (req, res) => {
  return res.send("Your personal secret value is 42!");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// https 모듈의 createServer 함수를 이용해준다
// createServer({a},b)
// {a}  => 인증서 객체
// b 서버 요청 리스너
https
  .createServer(
    {
      // https 모듈을 이용해주면 {} 객체 안에 SSL 인증서를 넣을 수 있다.
      // 이 증서는 우리가 서버로 보내는 모든 데이터를 암호화(encrypt) 해준다

      // 우리가 이용하는 secret이다. 인증서를 만들기 위해서 이용할 것은 openSSL이다
      // 만약 windows 환경에서 git을 설치했다면 이미 openSSL은 설치가 돼있다
      // 이제 커맨드라인으로 들어가서 self-signed 인증서를 생성한다.
      // commend : openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
      // 이 커맨드의 결과로 key.pem 과 cert.pem 두가지 파일이 생성된다
      // key.pem은 private key이고 cert.pem은 브라우저가 서버의 소유권을 확인하기 위한 public key이다
      // days를 설정하지 않을 경우 30일이다

      // key에는 4096비트로 보이는 것이 포함되어 있어 이 서버의 데이터만 암호화할 수 있다. 따라서 키의 소유권은 cert로 식별된 서버의 데이터를 암호화할 수 있음을 의미합니다.

      // readFileSync() 안은 인증서 경로이며 string 타입이다.
      key: fs.readFileSync("key.pem"),
      //
      // cert는 반대로 key로 암호화된 데이터의 암호를 해독할 수 있습니다.
      // 인증서에 포함된 데이터를 사용하여 개인 키로 암호화된 서버에서 보낸 데이터의 암호를 해독하므로 브라우저에서 이 공용 인증서에 대한 액세스가 필요하다
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });

// 하지만 이대로 npm start를 하더라도 서버로 부터 어떤 응답도 받지 못한다
// 왜냐하면 포트3000번에 HTTP서버가 없기 때문이다.
// 때문에 url을 https://localhost:3000/secret 로 입력해준다
// 경고가 뜨는데 proceed to localhost를 클릭해준다
// 이제 network 탭에 들어가보면 요청과 응답은 올바르게 표시되지만, 만약 다른 디바이스에서 우리의 트레픽에 접근하면 암호화된 정보만 보여질 것이다.
