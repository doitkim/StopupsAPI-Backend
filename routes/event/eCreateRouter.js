const express = require("express"); // 익스프레스 라이브러리 불러오기
const { EventList } = require("../../models");
const router = express.Router(); // 익스프레스의 라우터 불러오기
const multer = require("multer");
const path = require("path");
let count = 1;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 파일이 업로드될 경로 설정
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // timestamp를 이용해 새로운 파일명 설정
    let name = Date.now() + count;
    let newFileName = name + path.extname(file.originalname);
    cb(null, newFileName);
    count++;
  },
});
const upload = multer({ storage: storage });

router
  // API 접근 시 파라미터를 확인 후 결과 실행
  .route("/create")
  // 사이트 이미지 등록
  .post(upload.array("file"), async (req, res, next) => {
    const imagePath = {};
    if (req.files.length !== 0) {
      for (let i = 0; i < req.files.length; i++) {
        imagePath[i] = "/images/" + req.files[i].filename;
      }
      console.log(req.body);
      try {
        await EventList.create({
          Date: req.body.Date,
          EventId: req.body.Id,
          Title: req.body.Title,
          EventTime: req.body.EventTime,
          Image: imagePath,
          Proceed: req.body.Proceed,
        });
        res.status(201);
      } catch (err) {
        console.error(err);
        next(err);
      }
    } else {
      try {
        await EventList.create({
          Date: req.body.Date,
          EventId: req.body.Id,
          Title: req.body.Title,
          EventTime: req.body.EventTime,
        });
        res.status(201);
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  });

module.exports = router;
