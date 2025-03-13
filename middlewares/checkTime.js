const os = require('os')

function checkTime(req, res, next) {

  // const currentHouar = new Date().getHours();
  // const currentMinutes = new Date().getMinutes();


  // const currentTime = new Date().toTimeString();

  const dateNow = new Date();

  const osInfo = os.platform;

  const utente = os.userInfo().username;

  console.log(` ${utente} con ${osInfo} entrato alle: ${dateNow.getHours()}:${dateNow.getMinutes()}`);

  // todo per permettere la continuazione del codice
  next();
}

module.exports = checkTime;
