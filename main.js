const { bot } = require('./telegramBot');
const { handleStart, handleList, handleCheckBirthday, handleSetBirthday, handleMenu, handleBirthdayGreetings } = require('./botLogic');

bot.onText(/\/start/, handleStart);
bot.onText(/\/list/, handleList);
bot.onText(/\/checkbirthday (.+)/, handleCheckBirthday);
bot.onText(/\/setbirthday (.+)/, handleSetBirthday);
bot.onText(/\/menu/, handleMenu);
bot.on('text', handleBirthdayGreetings);
