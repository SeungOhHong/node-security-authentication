// # authentication(인증) VS authorization(허가) 의 차이는 무엇일까?
// 인증(authentication)은 로그인(logged in)에 관한 것이고
// 허가(authorization)는 접근권한(access control)에 대한 것이다.
// 이 두 가지 인증 및 허가 개념은 둘 다 auth로 시작돼서 우리가 auth라고 부른다.

// authentic => 진짜인(본품인) authority => (권한, 지휘권) 이라는 뜻이다

/* 
# 인증과 허가 프로세스 살펴보기
사용자 -> 인증 -> 허가

1. 인증(authentication)
익명의 사용자가 사이트에 액세스하려고 할 때, 사용자가 자신이 누구인지 증명하기 위해 로그인해야 하는 스탑사인을 확인한다. 일반적으로, 이것은 우리 사이트에 등록하고 사용자 이름과 비밀번호로 로그인하는 것을 포함한다. 하지만 때로는 휴대전화의 지문을 사용하는 등 생체 인식을 포함할 수도 있다.

2. 허가(authorization)
이 두 번째 정지 표시는 사용자가 이 특정 자원에 접근할 권한이 있는지, 이 경우에 필요한 권한이 있는지를 확인하는 것입니다. 왜냐하면 다른 사용자가 저장한 정보일 수 있기 때문이다.
자신의 데이터 권한에 액세스할 수 있는 권한이 부여된 검사를 통과하면 현재 사용자가 액세스할 수 있는 서버의 리소스를 제어하기 때문에 authorization을 접근 제어(access control)라고 부르기도 합니다.
 */

/* 

# API 키
인증된 사용자만 서버와 API에 액세스할 수 있도록 하기 위해 개발자가 사용하는 세 가지 주요 도구가 있다. 
1. API키
2. 토큰
3. JWT 

먼저 API 키는 두 가지 목적으로 사용하는 문자열 값이다.
첫 번째는 프로젝트, 애플리케이션의 고유 식별자로서 사용자가 현재 사용 중인 서버입니다
응용프로그램에서 요청을 수행하면 해당 요청이 어떤 응용프로그램에서 왔는지 알 수 있다.
그리고 API 키의 두 번째 목적은 API 사용자가 API에서 이미 노출된 기능을 사용하는 애플리케이션에서 일부 기능을 활성화하려는 개발자일 때 일반적으로 일부 API 키에 대한 액세스를 허용하고 제한하는 것이다.

/*
# JWT 토큰(Jason Webb Tokens)
액세스 토큰은 API 키와 매우 유사합니다. 응용프로그램의 특정 사용자를 고유하게 식별합니다. (authentication의 역할)
그보다 더 중요한 것은 JWT는 리소스에 대한 액세스 권한을 부여할 수 있는 자격 증명(authorization)입니다. 인증 정보에는 다양한 유형의 정보가 포함될 수 있다.
예를 들어, 여권은 다른 나라를 여행하고 싶을 때 가지고 다니는 자격증의 일종이다.
여권이 다른 유형의 데이터를 포함하도록 사용자 정의할 수 있는 것처럼 JWT도 추가 데이터를 포함하도록 사용자 정의 및 확장할 수 있다.

JWT 토큰 단순하게 64bit로 인코딩된 JSON 객체의 데이터일 뿐이며, 모든 JWT는 세 섹션으로 나눌 수 있다. 헤더(header), 페이로드(payload), 서명(verify signature).
*/

app.use(helmet());

// # OAUTH란?
/* OAuth는 소셜 사인온과 같은 것들이 널리 퍼지게 한 인증 표준이다.
OAuth가 해결하려고 하는 문제는 사용자가 알 수 없는 신뢰할 수 없는 사이트에 암호를 넣지 않고도 일부 응용 프로그램, 일부 웹 앱에 액세스할 수 있도록 하는 것이다. 예를 들어서, 구글을 통해서 구글에 로그인 할 경우 OAuth로 비밀번호를 입력하면 그 페이지를 신뢰할 수 있습니다. 구글의 certificate를 받았기 때문이다. 우리는 항상 공식적인 구글 로그인 화면을 볼 것이고 우리의 경우에는 구글이라고 불리는 Oauth 서버라는 곳에 우리의 비밀번호를 입력하기만 하면 될 것이다. */

/* ## OAuth Flow
OAuth Flow는 총 네 개로 나뉜다
1. Resource owner 
2. Client
3. Resource server
4. Authorization server


1. 사용자는 리소스 소유자입니다. 사용자로서 브라우저를 사용하고, 사용자 에이전트를 사용하여 클라이언트와 대화합니다.
2. 클라이언트는 해당 사용자를 위해 일부 보호된 리소스, 일부 보호된 데이터에 액세스하려는 웹 응용 프로그램이다. 그리고 보호된 데이터는 리소스 서버에 일부 API와 데이터베이스를 남깁니다.
3. 리소스 서버는 종종 응용 프로그램의 백엔드입니다. 따라서 클라이언트가 ABC.com인 경우, ABC.com에 대한 API는 나만 접근할 수 있도록 특정 데이터를 제한하려고 합니다.
4. OAuth 방식을 사용하면 인증 서버를 사용하는 것이라고 추측할 수 있습니다. 사용자 또는 리소스 소유자가 로그인할 때 인증하고 리소스 서버에 액세스할 수 있도록 액세스 토큰을 제공하는 서버입니다. 소셜 로그인을 하는 경우 인증 서버는 GitHub 또는 Google이 내부적으로 사용하는 계정 google.com 서버일 수 있습니다. 
*/

/* 
Oauth구현하기 
첫 번째 단계는 항상 권한 부여 서버에 응용프로그램, 클라이언트를 등록하는 것입니다.
이 비디오에서는 Google을 인증 서버로 사용하여 노드 웹 애플리케이션을 등록하여 다음과 같이 합니다  
1. https://developers.google.com/identity/protocols/oauth2?hl=ko 
2. API 콘솔 클릭
3. 사용자 인증정보

  

*/

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true; //TODO
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in!",
    });
  }
  next();
}

app.get("/auth/google", (req, res) => {});

app.get("/auth/google/callback", (req, res) => {});

app.get("/auth/logout", (req, res) => {});

app.get("/secret", checkLoggedIn, (req, res) => {
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
