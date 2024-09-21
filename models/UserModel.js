const db = require('../config/database');

const User = {
  create: (user, callback) => {
    const query = 'INSERT INTO User (nome, senha, data_nasc, endereco_id) VALUES (?, ?, ?, ?)';
    db.query(query, [user.nome, user.senha, user.data_nasc, user.endereco_id], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results.insertId);
    });
  },

    findById: (id, callback) => {
        const query = 'SELECT * FROM User WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByName: (nome, callback) => {
        const query = 'SELECT * FROM User WHERE nome = ?';
        db.query(query, [nome], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, user, callback) => {
        const query = 'UPDATE User SET nome = ?, senha = ?, data_nasc = ?, endereco_id = ? WHERE id = ?';
        db.query(query, [user.nome, user.senha, user.data_nasc, user.endereco_id, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM User WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM User';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = User;