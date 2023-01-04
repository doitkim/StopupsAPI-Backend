const express = require("express"); // 익스프레스 라이브러리 불러오기
const User = require("../../models/user"); // User 모델 불러오기
const router = express.Router(); // 익스프레스의 라우터 불러오기

router.route("/delete").post(async (req, res, next) => {
  try {
    console.log(req.body);
    await User.destroy({
      where: { userToken: req.body.userToken },
    });
    res.status(201);
  } catch (err) {
    // console.error(err);
    next(err);
  }
});

module.exports = router;
