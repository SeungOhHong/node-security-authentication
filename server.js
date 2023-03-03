// 이제 헬멧 모듈을 추가해보자
// 헬멧은 널리 사용되는 npm 패키지로, 노드 서버가 가질 수 있는 가장 일반적인 구멍을 모두 연결하여 서버를 보호하는 데 도움이 되는 미들웨어 모음이 포함되어 있다.
// 잠재적인 문제이거나 거의 모든 애플리케이션에 적용되는 추가 보안 기능들을 포함하는 모듈이다
const path = require("path");
const https = require("https");
const express = require("express");
// npm install helmet 후 모듈을 불러온다
const helmet = require("helmet");

const PORT = 3000;

const app = express();

// app.use를 이용해서 헬멧 미들웨어는 가장 윗쪽에 추가한다. 일반적으로 보안과 관련된 미들웨어는 미들웨어 체인에서 가장 상단에 추가한다
// 이렇게 하면 우리가 어디에 응답하든 상관없이 모든 요청이 헬멧 미들웨어를 통과할 것이다.
// 네트워크 탭에 들어가서 header를 살펴보면 추가 헤더들이 보이는데 모두 API의 보안을 유지하는 데 도움이 되는 매우 중요한 목적을 가지고 있다.
app.use(helmet());

app.get("/secret", (req, res) => {
  return res.send("Your personal secret value is 42!");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
