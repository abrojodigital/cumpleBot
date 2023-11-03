const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

function sendTextMessage(chatId, message) {
  bot.sendMessage(chatId, message);
}

module.exports = {
  bot,
  sendTextMessage,
};
