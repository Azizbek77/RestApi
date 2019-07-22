const db = require('../config/db.config.js');
const UserDetail = db.UserDetail;
const sequelize = require('sequelize');

exports.create = (req, res) => {
    const userId = req.body.user_id,
        typeR = req.body.type_r,
        type = req.body.type,
        amount = req.body.amount,
        order_id = req.body.order_id,
        user_type = req.body.user_type;

    UserDetail.create(
        {
            user_id: userId,
            type_r: typeR,
            type: type,
            amount: amount,
            order_id: order_id,
            user_type: user_type,
            
        }).then(userDetail => {
        res.send(userDetail);
    })
};

exports.bonusList = (req, res) => {
    UserDetail.findAll({
        attributes: [
            'id',
            'user_id',
            'type_r',
            'type',
            'amount',
            'order_id',
            'user_type',
        ]
    },).then(bonusDetail => {

        res.send(bonusDetail);

    });
};


exports.userBonus = (req, res) => {
    const id = req.params.id;
    UserDetail.findAll(
        {
            attributes: [
                'created_at',
                'type_r',
                'amount',
                'type',
                'user_id',
                'order_id'
            ],
            where: {
                user_id: id,
                user_type: 2
            }
        }).then(userDetail => {
        res.send(userDetail);
    })
};
exports.userBonusSolar = (req, res) => {
    const id = req.params.id;
    UserDetail.findAll(
        {
            attributes: [
                'created_at',
                'type_r',
                'amount',
                'type',
                'user_id',
                'order_id'
            ],
            where: {
                user_id: id,
                user_type: 2
            }
        }).then(userDetail => {
        res.send(userDetail);
    })
};