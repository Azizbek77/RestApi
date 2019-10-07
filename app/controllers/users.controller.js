const db = require('../config/db.config.js');
const Users = db.Users;

exports.list = (req, res) => {
    Users.findAll( {
        attributes: [
            'id',
            'name',
            'phone'
        ]
    },).then(users => {
        res.send(users);
    });
};
