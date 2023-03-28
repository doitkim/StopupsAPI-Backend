const express = require("express"); // 익스프레스 라이브러리 불러오기
const { EventList } = require("../../models");
const router = express.Router(); // 익스프레스의 라우터 불러오기
const fs = require("fs");

router
  // API 접근 시 파라미터를 확인 후 결과 실행
  .route("/delete")
  // 사이트 이미지 삭제
  .post(async (req, res, next) => {
    try {
      await EventList.destroy({
        where: { EventId: req.body.EventId },
      }).then(
        Object.values(path).map((e) => {
          if (e !== null) {
            if (fs.existsSync("public" + e)) {
              fs.rm("public" + e, (err) => {
                console.error(err);
              });
            }
          }
        })
      );
      res.status(201);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
