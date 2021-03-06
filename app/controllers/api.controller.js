const db = require('../config/db.config.js');
const UserDetail = db.UserDetail;
const constants = require('../../constants.js');
const sequelize = require('sequelize');


exports.create = (req, res) => {
    const userId = req.body.user_id,
        c_name = req.body.c_name,
        typeR = req.body.type_r,
        type = req.body.type,
        amount = req.body.amount,
        order_id = req.body.order_id,
        user_type = req.body.user_type,
        comment = req.body.comment;
        req_key = req.body.req_key;


        console.log(req);
        
        if (req_key == constants.key)
        {


            UserDetail.create({
                user_id: userId,
                c_name:c_name,
                type_r: typeR,
                type: type,
                amount: amount,
                order_id: order_id,
                user_type: user_type,
                comment: comment,
            }).then(userDetail => {
                console.log(userDetail);
                res.send(userDetail);
            }).catch(function (err) {
                console.log(err);
            });
        }else{
            console.log('api key is not currect');
        } 
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

exports.balans = (req, res) => {
        arr = {};
        db.sequelize.query("SELECT REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ),'N'),',',' ') as Summa_p,"+
                        " REPLACE(FORMAT(SUM(CASE When type = 2  Then amount Else 0 End ),'N'),',',' ') AS Summa_r, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ) -"+
                        " SUM(CASE When type = 2 Then amount Else 0 End ),'N'),',',' ') AS saldo  FROM `billinghistory`"+
                        " ", { type: sequelize.QueryTypes.SELECT}).then(sum => {
                    arr['balans'] = sum;
        });

        db.sequelize.query("SELECT user_id, c_name, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ),'### ### ###'),',',' ') as Summa_p,"
                +" REPLACE(FORMAT(SUM(CASE When type = 2  Then amount Else 0 End ),'### ### ###'),',',' ') AS Summa_r,"
                +" REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ) -  SUM(CASE When type = 2 Then amount Else 0 End ),'### ### ###'),',',' ') AS saldo "
                +" FROM `billinghistory`   GROUP BY user_id"
            , { type: sequelize.QueryTypes.SELECT}).then(balans => {
            arr['items'] = balans;
        res.send(arr);
        });

}

exports.bonusSum = (req, res) => {
        db.sequelize.query("SELECT SUM(CASE When type = 1 Then amount Else 0 End ) as Total_p ,"+
            " SUM(CASE When type = 2 Then amount Else 0 End ) AS Total_r FROM billinghistory"+
            " ",{ type: sequelize.QueryTypes.SELECT}).then(bonusSum => {
        res.send(bonusSum);
    });
};
exports.userTotalBonus = (req, res) =>{

        const user_id = req.params.id;
        db.sequelize.query("SELECT SUM(CASE When type = 1 Then amount Else 0 End ) - SUM(CASE When type = 2 Then amount Else 0 End ) "+
            "AS Total  FROM billinghistory  where user_id = :user_id"+
            " ",{type: sequelize.QueryTypes.SELECT , replacements: { user_id : user_id }}).then(userTotalBonus =>{
        res.send(userTotalBonus);
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
                'order_id',
                'comment',
            ],
            where: {
                user_id: id,
                user_type: 2
            }
        }).then(userDetail => {
        res.send(userDetail);
    })
};

exports.userBonusList = (req, res) => {
    const id = req.params.id;
    var arr = {};
    db.sequelize.query("SELECT * FROM type",{type: sequelize.QueryTypes.SELECT}).then(userBonusList =>{
        arr["type"] = userBonusList;
            db.sequelize.query("SELECT * FROM `billinghistory` WHERE user_id = :id ORDER BY created_at DESC",{type:sequelize.QueryTypes.SELECT,replacements:{id:id}}).then(userDetail => {
                arr["data"] = userDetail;
                res.send(arr);
            })
    });
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