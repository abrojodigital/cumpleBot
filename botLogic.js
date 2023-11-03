const { bot, sendTextMessage } = require('./telegramBot');
const { loadFamilyBirthdays, saveFamilyBirthdays } = require('./birthdayManager');

function handleStart(msg) {
  const chatId = msg.chat.id;
  sendTextMessage(chatId, '¡Hola! Soy el Bot de Cumpleaños. Puedes usar el comando /menu para ver las opciones disponibles.');
}

function handleList(msg) {
  const chatId = msg.chat.id;
  const familyBirthdays = loadFamilyBirthdays();
  let message = 'Cumpleaños registrados:\n';

  for (const name in familyBirthdays) {
    const birthday = new Date(familyBirthdays[name]);
    const day = birthday.getDate();
    const month = birthday.getMonth() + 1;
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}`;
    message += `${name}: ${formattedDate}\n`;
  }

  sendTextMessage(chatId, message);
}

function handleCheckBirthday(msg, match) {
  const chatId = msg.chat.id;
  const requestedName = match[1];
  const familyBirthdays = loadFamilyBirthdays();

  if (familyBirthdays[requestedName]) {
    const birthday = new Date(familyBirthdays[requestedName]);
    const day = birthday.getDate();
    const month = birthday.getMonth() + 1;
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}`;
    sendTextMessage(chatId, `El cumpleaños de ${requestedName} es el ${formattedDate}.`);
  } else {
    sendTextMessage(chatId, `No se encontró un cumpleaños registrado para ${requestedName}.`);
  }
}

function handleSetBirthday(msg, match) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const [name, birthday] = match[1].split(' ');

  const dateRegex = /^\d{2}-\d{2}$/;
  if (!dateRegex.test(birthday)) {
    sendTextMessage(chatId, 'Formato de fecha incorrecto. Debe ser DD-MM.');
    return;
  }

  const [day, month] = birthday.split('-');
  const formattedBirthday = new Date(new Date().getFullYear(), month - 1, day);
  const familyBirthdays = loadFamilyBirthdays();

  familyBirthdays[name] = formattedBirthday.toISOString().substring(0, 10);
  saveFamilyBirthdays(familyBirthdays);

  sendTextMessage(chatId, `¡${name} ha sido registrado correctamente!`);
}

function handleBirthdayGreetings(msg) {
  const chatId = msg.chat.id;
  const today = new Date();
  const todayString = `${today.getDate() < 10 ? '0' : ''}${today.getDate()}-${today.getMonth() + 1 < 10 ? '0' : ''}${today.getMonth() + 1}`;
  const familyBirthdays = loadFamilyBirthdays();

  for (const name in familyBirthdays) {
    const birthday = new Date(familyBirthdays[name]);
    const day = birthday.getDate();
    const month = birthday.getMonth() + 1;
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}`;

    if (todayString === formattedDate) {
      sendTextMessage(chatId, `¡Feliz cumpleaños, ${name}! 🎉🎂`);
    }
  }
}

function handleMenu(msg) {
  const chatId = msg.chat.id;
  const menuText = 'Opciones disponibles:\n/list - Ver cumpleaños\n/checkbirthday [nombre] - Ver cumpleaños de alguien\n/setbirthday [Nombre DD-MM] - Registrar un cumpleaños';
  sendTextMessage(chatId, menuText);
}

module.exports = {
  handleStart,
  handleList,
  handleCheckBirthday,
  handleSetBirthday,
  handleBirthdayGreetings,
  handleMenu,
};
