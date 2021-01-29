const db = require('../database')

const Prevision = function createPrevision(prevision) {
  this.date = prevision.date;
  this.prevision1 = prevision.prevision1;
  this.prevision2 = prevision.prevision2;
  this.prevision3 = prevision.prevision3;
  this.prevision4 = prevision.prevision4;
  this.prevision5 = prevision.prevision5;
}

Prevision.find = function find(result) {

  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()

today = mm + '/' + dd + '/' + yyyy;

  db.query('SELECT * FROM prevision WHERE date = ?', [today], (err, dbResult) => {
    if(dbResult.length < 1){
      const rand = () => {
        return Math.random() < 0.5
      }
      const prevision = {
        date : today,
        prevision1 : rand(),
        prevision2 : rand(),
        prevision3 : rand(),
        prevision4 : rand(),
        prevision5 : rand(),
      }
      db.query('INSERT INTO prevision SET ?', [prevision], (error, dbResult) => {
        if (error) {
          return result(error, null);
        }
    
        return result(null, { id: dbResult.insertId, ...prevision });
      });
    } else {
      return result(null, dbResult[0]);

    }
  });
};

module.exports = Prevision