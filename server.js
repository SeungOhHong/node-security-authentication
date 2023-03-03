const path = require("path");
const express = require("express");

const PORT = 3000;

const app = express();

// 하나의 라우트가 있다
// join(현재 디렉토리, "폴더명", "파일명")
// html 파일을 가져오고 get 해오고있다.
// 이제 모든 데이터를 HTTP를 이용해서 암호화 하려고 한다
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
