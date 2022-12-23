const express = require("express"); // 익스프레스 라이브러리 불러오기
const router = express.Router(); // 익스프레스의 라우터 불러오기
const send_message = require("../../SMS/SmsAuth"); // 모바일 인증 시 사용

router
  .route("/")
  // 휴대전화 인증
  .post((req, res) => {
    const phone_number = req.body.phone_number;
    const rndNumber = req.body.rnd_number;
    send_message(phone_number, rndNumber);
    res.send("complete!");
  });

module.exports = router;
