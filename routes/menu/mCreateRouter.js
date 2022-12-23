const express = require("express"); // 익스프레스 라이브러리 불러오기
const { MenuList } = require("../../models");
const router = express.Router(); // 익스프레스의 라우터 불러오기

router
  // API 접근 시 파라미터를 확인 후 결과 실행
  // 메뉴 등록
  .route("/create")
  .post(async (req, res, next) => {
    try {
      await MenuList.create({
        Category: req.body.Category,
        ProductId: req.body.ProductId,
        Name: req.body.Name,
        Image: req.body.Image,
        Desc: req.body.Desc,
        Nutrient: req.body.Nutrient,
        Price: req.body.Price,
        DrinkType: req.body.DrinkType,
        EatType: req.body.EatType,
        CookType: req.body.CookType,
      });
      res.status(201);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
