const express = require("express"); // 익스프레스 라이브러리 불러오기
const AdminAuth = require("../models/adminAuth"); // AdminAuth 모델 불러오기
const router = express.Router(); // 익스프레스의 라우터 불러오기

router
  // /AdminAuth/ get 요청 오면 유저 테이블 전체 조회 후 JSON 형식으로 응답
  .route("/")
  .get(async (req, res, next) => {
    try {
      const adminAuth = await AdminAuth.findAll();
      res.json(adminAuth);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
