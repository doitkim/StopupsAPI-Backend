const crypto = require("crypto");
const axios = require("axios");
const { AdminAuth } = require("../models");
require("dotenv").config();
const smsNumber1 = process.env.SMS_NUMBER1;
const smsNumber2 = process.env.SMS_NUMBER2;
const smsNumber3 = process.env.SMS_NUMBER3;
const smsNumber4 = process.env.SMS_NUMBER4;
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
        from: smsNumber1,
        // 원하는 메세지 내용
        content: `[스탑업스] 인증번호는 ${rnd_number} 입니다. 정확히 입력해주세요.`,
        messages: [
          // 신청자의 전화번호
          { to: phone },
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
    if (
      phone === smsNumber1 ||
      phone === smsNumber2 ||
      phone === smsNumber3 ||
      phone === smsNumber4
    ) {
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
          from: smsNumber1,
          // 원하는 메세지 내용
          content: `[관리자 승인 번호] 승인 번호는 ${rndAuthAdminCord} 입니다. 정확히 입력해주세요.`,
          messages: [
            // 신청자의 전화번호
            { to: phone },
          ],
        },
      }).then(() => {
        console.log("관리자 번호 전송 성공");
        setTimeout(() => {
          AdminAuth.destroy({
            where: { adminToken: rndAuthAdminCord },
          });
        }, 300000);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = send_message;
