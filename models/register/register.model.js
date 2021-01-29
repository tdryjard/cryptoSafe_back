const db = require('../database')

const User = function createUser(user) {
  this.email = user.email;
  this.password = user.password;
  this.customer_id = user.customer_id;
}

User.create = (newUser, result) => {
  db.query('INSERT INTO user SET ?', [newUser], (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, { id: dbResult.insertId, ...newUser });
  });
};

User.connect = function connect(email, result) {
  db.query('SELECT * FROM user WHERE email = ?', [email], (err, dbResult) => {
    if (err) {
      return result({ err, status: 500 }, null);
    }
    if (!dbResult.length) {
      return result({ status: 404 }, null);
    }
    return result(null, dbResult[0]);
  });
};

User.find = function find(userId, result) {
  db.query('SELECT * FROM user WHERE id = ?', [userId], (err, dbResult) => {
    if (err) {
      console.log(err)
      return result({ err, status: 500 }, null);
    }
    if (!dbResult.length) {
      return result({ status: 404 }, null);
    }
    return result(null, dbResult[0]);
  });
};

User.delete = (id, result) => {
  db.query('DELETE FROM user WHERE id = ?', [id], err => {
    if (err) return result({ message: err.message, status: 500 }, null);

    return result(null, {
      message: `user supprimée`,
      status: 200
    });
  });
};


module.exports = User