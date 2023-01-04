const express = require("express"); // 익스프레스 라이브러리 불러오기
const User = require("../../models/user"); // User 모델 불러오기
const router = express.Router(); // 익스프레스의 라우터 불러오기

router
  // /user/ get 요청 오면 유저 테이블 전체 조회 후 JSON 형식으로 응답
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  // /user/ POST 요청 오면 유저 테이블에 유저 추가
  .post(async (req, res, next) => {
    try {
      // console.log(req.body);
      const user = await User.create({
        userToken: req.body.eAccessToken,
        userId: req.body.eUserId,
        userPw: req.body.eUserPw,
        userPhoneNumber: req.body.eUserPhoneNumber,
        userApiKey: req.body.eUserApi,
      });
      res.status(201).json(user); // 유저 추가 후 JSON 갱신
    } catch (err) {
      // console.error(err);
      next(err);
    }
  });

module.exports = router;
