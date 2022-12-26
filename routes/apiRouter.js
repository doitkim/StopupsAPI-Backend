const express = require("express"); // 익스프레스 라이브러리 불러오기
const { User, MenuList, EventList, Notice } = require("../models"); // 유저 모델 사용
let url = require("url"); // url 사용
const { Op } = require("sequelize");
const router = express.Router(); // 익스프레스의 라우터 불러오기
const CryptoJS = require("crypto-js"); // CryptoJs 사용
require("dotenv").config();

// 복호화 설정 값
const keySize = process.env.KEYSIZE; // 키 사이즈
const iterations = process.env.ITERATIONS; // 반복 횟수
const secret = process.env.SECRET; // 비밀키

// 복호화
function decrypt(transitmessage) {
  var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
  var encrypted = transitmessage.substring(64);

  // PBKDF2 암호화
  var key = CryptoJS.PBKDF2(secret, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7, // 패딩 값
    mode: CryptoJS.mode.CBC, // 모드
    hasher: CryptoJS.algo.SHA256, // 해쉬 값
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

router
  // API 접근 시 파라미터를 확인 후 결과 실행
  .route("/")
  .get(async (req, res) => {
    let queryData = url.parse(req.url, true).query;
    const users = await User.findAll(); // 유저 테이블 전체 조회
    if (queryData.Notice === "ALL") {
      const noticeList = await Notice.findAll({
        where: {
          // 이름이 없을때 전체 조회, 있을때 이름 조회
          [Op.and]: {
            Title: { [Op.like]: "%" + queryData.Title + "%" },
            Id: { [Op.like]: "%" + queryData.writeId + "%" },
          },
        },
        order: [["Id", "DESC"]],
      });
      users.find((element) => {
        // 유저 테이블에서 사용자가 입력한 apiKey와 DB의 저장된 사용자 API 키가 같은지 확인
        if (queryData.apikey === decrypt(element.userApiKey)) {
          // 같으면 메뉴 테이블을 조회한 목록을 JSON 형식으로 제공
          res.json(noticeList);
        }
      });
    } else if (queryData.Event === "ALL") {
      const eventList = await EventList.findAll({
        where: {
          // 이름이 없을때 전체 조회, 있을때 이름 조회
          [Op.and]: {
            Title: { [Op.like]: "%" + queryData.Title + "%" },
            EventId: { [Op.like]: "%" + queryData.EventId + "%" },
          },
        },
        order: [["EventId", "DESC"]],
      });
      users.find((element) => {
        // 유저 테이블에서 사용자가 입력한 apiKey와 DB의 저장된 사용자 API 키가 같은지 확인
        if (queryData.apikey === decrypt(element.userApiKey)) {
          // 같으면 메뉴 테이블을 조회한 목록을 JSON 형식으로 제공
          res.json(eventList);
        }
      });
    } else if (queryData.Category === "분류") {
      if (queryData.ProductId) {
        const menulist = await MenuList.findAll({
          where: {
            // 이름이 없을때 전체 조회, 있을때 이름 조회
            ProductId: queryData.ProductId,
          },
        }); // 메뉴 테이블 조회
        users.find((element) => {
          // 유저 테이블에서 사용자가 입력한 apiKey와 DB의 저장된 사용자 API 키가 같은지 확인
          if (queryData.apikey === decrypt(element.userApiKey)) {
            // 같으면 메뉴 테이블을 조회한 목록을 JSON 형식으로 제공
            res.json(menulist);
          }
        });
      } else {
        // 파라미터 안의 쿼리에 Category 값이 분류일 경우 실행
        const menulist = await MenuList.findAll({
          where: {
            // 이름이 없을때 전체 조회, 있을때 이름 조회
            Name: { [Op.like]: "%" + queryData.Name + "%" },
          },
        }); // 메뉴 테이블 조회
        users.find((element) => {
          // 유저 테이블에서 사용자가 입력한 apiKey와 DB의 저장된 사용자 API 키가 같은지 확인
          if (queryData.apikey === decrypt(element.userApiKey)) {
            // 같으면 메뉴 테이블을 조회한 목록을 JSON 형식으로 제공
            res.json(menulist);
          }
        });
      }
    } else {
      // Category가 분류가 아닐때 검색 조건
      if (queryData.ProductId) {
        const menulist = await MenuList.findAll({
          // 메뉴 테이블 조회
          where: {
            // 카테코리와 이름을 검색
            [Op.and]: {
              Category: queryData.Category,
              Name: { [Op.like]: "%" + queryData.Name + "%" },
              ProductId: queryData.ProductId,
            },
          },
        });
        // 사용자가 입력한 API 키와 DB에 저장된 API 키 확인 후 메뉴리스트 JSON 형식으로 제공
        users.find((element) => {
          if (queryData.apikey === decrypt(element.userApiKey)) {
            res.json(menulist);
          }
        });
      } else {
        const menulist = await MenuList.findAll({
          // 메뉴 테이블 조회
          where: {
            // 카테코리와 이름을 검색
            [Op.and]: {
              Category: queryData.Category,
              Name: { [Op.like]: "%" + queryData.Name + "%" },
            },
          },
        });
        // 사용자가 입력한 API 키와 DB에 저장된 API 키 확인 후 메뉴리스트 JSON 형식으로 제공
        users.find((element) => {
          if (queryData.apikey === decrypt(element.userApiKey)) {
            res.json(menulist);
          }
        });
      }
    }
  });

module.exports = router;
