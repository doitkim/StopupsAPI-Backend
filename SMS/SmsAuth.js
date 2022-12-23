const crypto = require("crypto");
const axios = require("axios");
const { AdminAuth } = require("../models");
require("dotenv").config();
const smsNumber = process.env.SMS_NUMBER;
const URL1 = process.env.URL1;
const URL2 = process.env.URL2;
const ACCESSKEY = process.env.ACCESSKEY;
const SECRETKEY = process.env.SECRETKEY;

function send_message(phone, rnd_number) {
  const url = URL1;
  const url2 = URL2;
  let date = new Date().getTime();
  const access_key = ACCESSKEY;
  const secret_key = SECRETKEY;
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const rndAuthAdminCord = Math.random().toString(36).substring(2, 12);
  let hashString = `${method}${space}${url2}${newLine}${date}${newLine}${access_key}`;
  const signature = crypto
    .createHmac("SHA256", secret_key)
    .update(hashString)
    .digest("base64");
  AdminAuth.create({
    adminToken: rndAuthAdminCord,
  });

  try {
    axios({
      method: method,
      json: true,
      url: url,
      headers: {
        "Content-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": access_key,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
      },
      data: {
        type: "SMS",
        countryCode: "82",
        from: smsNumber,
        // 원하는 메세지 내용
        content: `[스탑업스] 인증번호는 ${rnd_number} 입니다. 정확히 입력해주세요.`,
        messages: [
          // 신청자의 전화번호
          { to: phone },
        ],
      },
    });
    axios({
      method: method,
      json: true,
      url: url,
      headers: {
        "Content-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": access_key,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
      },
      data: {
        type: "SMS",
        countryCode: "82",
        from: smsNumber,
        // 원하는 메세지 내용
        content: `[관리자 승인 번호] 승인 번호는 ${rndAuthAdminCord} 입니다. 정확히 입력해주세요.`,
        messages: [
          // 신청자의 전화번호
          { to: smsNumber },
        ],
      },
    }).then(() => {
      console.log("인증 번호 전송 성공");
      setTimeout(() => {
        AdminAuth.destroy({
          where: { adminToken: rndAuthAdminCord },
        });
      }, 300000);
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = send_message;
