const fs = require('fs');

const JSON_FILE = 'family_birthdays.json';

function loadFamilyBirthdays() {
  try {
    const data = fs.readFileSync(JSON_FILE);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al cargar el archivo JSON de cumpleaños:', error);
    return {};
  }
}

function saveFamilyBirthdays(familyBirthdays) {
  const data = JSON.stringify(familyBirthdays, null, 2);
  fs.writeFile(JSON_FILE, data, (err) => {
    if (err) {
      console.error('Error al guardar el archivo JSON de cumpleaños:', err);
    }
  });
}

module.exports = {
  loadFamilyBirthdays,
  saveFamilyBirthdays,
};
