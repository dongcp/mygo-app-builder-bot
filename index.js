const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

const TELEGRAM_BASE_URL = "https://api.telegram.org/bot";
const TELEGRAM_BOT_TOKEN = "860581299:AAEH_YXKAMACqS3Xx291uwOi75BzXYU6hIs";

const GROUP_CHAT_ID = -1001258719210;
const PRIVATE_CHAT_ID = 520305610;

const TUANH_USERNAME = "anhntt8";
const GIANG_USERNAME = "GiangTrantt";
const HANGHO_USERNAME = "HTTHang";
const DONG_USERNAME = "DongCP";

const GREETINGS = ["chào", "xin chào", "hi", "hello", "hey boy"]

app.use(bodyParser.json());

app.post('/', function(req, res) {
  if(req.body.app_name) {
    console.log(req);
    handleAppCenterMessage(req.body, res);
    return
  }

  const {message} = req.body;
  if(message.text.includes("@app_builder_bot")) {
    const realContent = message.text.substring(17).trim().toLowerCase();

    if(GREETINGS.includes(realContent)) {
      sayHello(message.message_id, message.from.username, res);
    }
  }
});

function handleAppCenterMessage(message, res) {
  const appName = message.app_name;
  const versionName = message.short_version;
  const releaseNoteContent = message.release_notes.replace("# Nội dung thay đổi","");
  const installLink = message.install_link;

  const releaseNotes = releaseNoteContent.split('\n');

  var content = "-----------------THÔNG BÁO-----------------";
  content = content + "\nỨng dụng " + appName + " đã có bản build mới trên appcenter.";
  content = content + "\nThông tin bản build:";
  content = content + "\n    + Phiên bản: " + versionName;
  if(releaseNotes && releaseNotes.length > 0) {
    content = content + "\n    + Nội dung cập nhật:";
    releaseNotes.forEach(note => {
      if(note && note.trim() != "") {
        content = content + "\n        " + note.trim()
      }
    });
  }
  content = content + "\n    + Đường dẫn tải về: " + installLink;

  sendMessage(content, res, -1)
}

function sayHello(messageId, username, res) {
  var message = "Xin chào! Tôi có thể giúp gì cho bạn?";

  if(username === TUANH_USERNAME) {
    message = "Chào cá! Bơi đi!"
  } else if (username == GIANG_USERNAME) {
    message = "Hello chicken! Gáy lên lào"
  } else if (username == HANGHO_USERNAME) {
    message = "Chào ngáo!"
  } else if (username == DONG_USERNAME) {
    message = "Hello boss! Is there something I can do for you?"
  }

  sendMessage(message, res, messageId);
}

function sendMessage(content, res, messageId) {
  var body = {
    chat_id: PRIVATE_CHAT_ID,
    text: content
  }
  if(messageId != -1) {
    body = {
      ...body,
      reply_to_message_id: messageId
    }
  }

  axios.post(
    TELEGRAM_BASE_URL + TELEGRAM_BOT_TOKEN + "/sendMessage", body
  ).then ((response) => {
      console.log(response.data);
      res.status(200).send(response.data);
  }).catch ((error)=> {
    console.log(error);
  })
}

app.listen(80, () => {
  console.log("Telegram bot is listening on port 80!")
});
