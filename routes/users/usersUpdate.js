const express = require("express"); // 익스프레스 라이브러리 불러오기
const User = require("../../models/user"); // User 모델 불러오기
const { Op } = require("sequelize");
const router = express.Router(); // 익스프레스의 라우터 불러오기

router
  // /user/ get 요청 오면 유저 테이블 전체 조회 후 JSON 형식으로 응답
  .route("/update")
  .post(async (req, res, next) => {
    // console.log(req.body);
    try {
      const user = await User.update(
        {
          userPw: req.body.eUserPw,
        },
        {
          where: {
            [Op.and]: {
              userPhoneNumber: req.body.eUserPhoneNumber,
              userId: req.body.eUserId,
            },
          },
        }
      );
      res.status(201).json(user); // 유저 추가 후 JSON 갱신
    } catch (err) {
      // console.error(err);
      next(err);
    }
  });

module.exports = router;
