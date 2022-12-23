const express = require("express"); // 익스프레스 라이브러리 불러오기
const { Notice } = require("../../models");
const router = express.Router(); // 익스프레스의 라우터 불러오기
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 파일이 업로드될 경로 설정
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // timestamp를 이용해 새로운 파일명 설정
    let newFileName = new Date().valueOf() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});
const upload = multer({ storage: storage });

router
  // API 접근 시 파라미터를 확인 후 결과 실행
  .route("/create")
  // 공지사항 등록
  .post(async (req, res, next) => {
    console.log(req.body);
    try {
      await Notice.create({
        Date: req.body.writeDate,
        Title: req.body.writeTitle,
        Desc: req.body.writeContent,
        Id: req.body.writeId,
        Num: req.body.writeIndex,
      });
      res.status(201);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
