const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

const TELEGRAM_BASE_URL = "https://api.telegram.org/";
const TELEGRAM_BOT_TOKEN = "860581299:AAEH_YXKAMACqS3Xx291uwOi75BzXYU6hIs";

const PRIVATE_CHAT_ID = '520305610';
const GROUP_CHAT_ID = '-1001258719210';

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post('/start_bot', function(req, res) {
  const {message} = req.body

  console.log(message)

  sendMessage("Hello");

  res.end();
});

function sendMessage(content) {
  axios.post(
    TELEGRAM_BASE_URL + "/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage",
    {
      chat_id: PRIVATE_CHAT_ID,
      text: content 
    }
  ).then (res => {
      console.log("CheckHang")
      res.end("ok");
  }).catch (error=> {
    console.log(error)
  })
}

app.listen(3000, () => {
  console.log("Telegram bot is listening on port 3000!")
});
