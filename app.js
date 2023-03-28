const express = require("express"); // 익스프레스 라이브러리 사용
const path = require("path"); // 경로 라이브러리 사용
const app = express(); // 익스프레스 사용
const { sequelize } = require("./models"); // DB 모델 및 sequelize 사용
const usersRouter = require("./routes/users/users"); // users.js 유저라우터 저장
const usersUpdateRouter = require("./routes/users/usersUpdate"); // users.js 유저라우터 저장
const apiRouter = require("./routes/apiRouter"); // apiRouter 저장
const mCreateRouter = require("./routes/menu/mCreateRouter"); // 메뉴 생성 라우팅
const mAlterRouter = require("./routes/menu/mAlterRouter"); // 메뉴 수정 라우팅
const mDeleteRouter = require("./routes/menu/mDeleteRouter"); // 메뉴 삭제 라우팅
const eCreateRouter = require("./routes/event/eCreateRouter"); // 이벤트 생성 라우팅
const eAlterRouter = require("./routes/event/eAlterRouter"); // 이벤트 수정 라우팅
const eDeleteRouter = require("./routes/event/eDeleteRouter"); // 이벤트 삭제 라우팅
const nCreateRouter = require("./routes/notice/nCreateRouter"); // 공지사항 생성 라우팅
const nAlterRouter = require("./routes/notice/nAlterRouter"); // 공지사항 수정 라우팅
const nDeleteRouter = require("./routes/notice/nDeleteRouter"); // 공지사항 삭제 라우팅
const smsAuthFunc = require("./routes/sms/smsAuthFunc"); // sms 인증 기능 라우팅
const adminAuth = require("./routes/adminAuth"); // AdminAuth 인증 기능 라우팅
const userDeleteRouter = require("./routes/users/userDelete");
// HTTPS 테스트 소스 시작
const https = require("https");
const fs = require("fs");

const sslOptions = {
  ca: fs.readFileSync(
    "./cert/www.stopupsapi.shop_202301038EDE1.unified.crt.pem"
  ),
  key: fs.readFileSync("./cert/www.stopupsapi.shop_202301038EDE1.key.pem"),
  cert: fs.readFileSync("./cert/www.stopupsapi.shop_202301038EDE1.crt.pem"),
};
// HTTPS 테스트 소스 끝

const cors = require("cors"); // CORS 문제 해결 위해 사용
// 모든 출처에서 오는 요청을 신뢰하도록 설정
let corsOptions = {
  origin: "*",
  Credential: true,
};

// CORS 설정
app.use(cors(corsOptions));
// Public 폴더를 기본 익스프레스 경로로 설정
app.use(express.static(path.join(__dirname, "public")));
// 익스프레스에서 JSON 사용
app.use(express.json());
// 익스프레스에서 url 인코딩 적용
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter); // users 경로로 접근시 userRouter 사용
app.use("/users", usersUpdateRouter); // users 경로로 접근시 userRouter 사용
app.use("/api", apiRouter); // API 쿼리 조회
app.use("/menu", mCreateRouter); // 메뉴 등록
app.use("/menu", mAlterRouter); // 메뉴 수정
app.use("/menu", mDeleteRouter); // 메뉴 삭제
app.use("/event", eCreateRouter); // 이벤트 등록
app.use("/event", eAlterRouter); // 이벤트 수정
app.use("/event", eDeleteRouter); // 이벤트 삭제
app.use("/notice", nCreateRouter); // 공지사항 등록
app.use("/notice", nAlterRouter); // 공지사항 수정
app.use("/notice", nDeleteRouter); // 공지사항 삭제
app.use("/sms", smsAuthFunc); // SMS 인증
app.use("/adminAuth", adminAuth); // adminAuth 인증
app.use("/users", userDeleteRouter);
// 개발 환경에서만 에러 표출
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// 익스프레스 포트를 8080으로 설정
app.set("port", process.env.PORT || 8080);

// DB 연결 성공 로그 표출
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("API DB 연결 성공");
  })
  .catch((err) => {
    // console.error(err); 에러 메시지를 보여주지 않기위해 주석 닮
  });

// HTTPS
https
  .createServer(sslOptions, app, (req, res) => {})
  .listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
  });
