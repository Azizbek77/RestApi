const db = require('../config/db.config.js');
const UserDetail = db.UserDetail;
const sequelize = require('sequelize');

exports.userDetail = (req, res) => {
    const id = req.params.id;
    UserDetail.findAll(
        {
            attributes: [
                'created_at',
                'type_r',
                'amount',
                'type']
        },
        {
            where: {user_id: id}
        }).then(userDetail => {
        res.send(userDetail);
    })
};


exports.getBalansByDate = (req, res) => {
        const from = req.params.from_date;
        const to = req.params.to_date;
        var select  = req.params.selected;
        var arr = {};
        if(select === 'null'){
            db.sequelize.query("SELECT user_id, c_name, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ),'N'),',',' ') as Summa_p,"+
                    "REPLACE(FORMAT(SUM(CASE When type = 2  Then amount Else 0 End ),'N'),',',' ') AS Summa_r, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ) - "+
                    " SUM(CASE When type = 2 Then amount Else 0 End ),'N'),',',' ') AS saldo  FROM `billinghistory` WHERE created_at >= :from AND "+
                    " created_at <= :to  GROUP BY user_id "+
                    " ",  { type: sequelize.QueryTypes.SELECT , replacements: { from:from+' 00:00:00' , to:to+' 23:59:59'}}).then(getBalansByDate => {
                arr['items'] = getBalansByDate;

                db.sequelize.query("SELECT REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ),'N'),',',' ') as Summa_p,"+
                        "REPLACE(FORMAT(SUM(CASE When type = 2  Then amount Else 0 End ),'N'),',',' ') AS Summa_r, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ) - "+
                        " SUM(CASE When type = 2 Then amount Else 0 End ),'N'),',',' ') AS saldo  FROM `billinghistory` WHERE created_at >= :from AND "+
                        " created_at <= :to   "+
                        " ", { type: sequelize.QueryTypes.SELECT , replacements: { from:from+' 00:00:00' , to:to+' 23:59:59'}}).then(balans => {
                    arr['balans'] = balans;
                    res.send(arr);

                });
            });


        }else{
            db.sequelize.query("SELECT user_id, c_name, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ),'N'),',',' ') as Summa_p,"+
                    "REPLACE(FORMAT(SUM(CASE When type = 2  Then amount Else 0 End ),'N'),',',' ') AS Summa_r, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ) - "+
                    " SUM(CASE When type = 2 Then amount Else 0 End ),'N'),',',' ') AS saldo  FROM `billinghistory` WHERE created_at >= :from AND "+
                    " created_at <= :to AND type_r = :select GROUP BY user_id "+
                    " ",  { type: sequelize.QueryTypes.SELECT , replacements: { from:from+' 00:00:00' , to:to+' 23:59:59', select:select }}).then(getBalansByDate => {
                arr['items'] = getBalansByDate;

                db.sequelize.query("SELECT  REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ),'N'),',',' ') as Summa_p,"+
                        " REPLACE(FORMAT(SUM(CASE When type = 2  Then amount Else 0 End ),'N'),',',' ') AS Summa_r, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ) - "+
                        " SUM(CASE When type = 2 Then amount Else 0 End ),'N'),',',' ')AS saldo  FROM `billinghistory` WHERE created_at >= :from AND "+
                        " created_at <= :to  AND type_r=:select "+
                        " ", { type: sequelize.QueryTypes.SELECT , replacements: { from:from+' 00:00:00' , to:to+' 23:59:59',select:select}}).then(balans => {
                    arr['balans'] = balans;
                    res.send(arr);

                });
            });
        }
};

exports.getBalansByType = (req,res) =>{
    var from = req.params.from_date;
        to = req.params.to_date;
        select = req.params.selected;
        id = req.params.id;
        arr = {};
        if(select === 'null'){
            db.sequelize.query("SELECT user_id, c_name,REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ),'N'),',',' ') as Summa_p,"+
                "REPLACE(FORMAT(SUM(CASE When type = 2  Then amount Else 0 End ),'N'),',',' ') AS Summa_r,REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ) - "+
                " SUM(CASE When type = 2 Then amount Else 0 End ),'N'),',',' ') AS saldo  FROM `billinghistory` WHERE created_at >= :from AND "+
                " created_at <= :to   AND user_id = :id "+
                " ",  { type: sequelize.QueryTypes.SELECT , replacements: { from:from+' 00:00:00' , to:to+' 23:59:59',  id:id}}).then(getBalansByType => {
            arr['balans'] = getBalansByType;

            db.sequelize.query("SELECT id,user_id,c_name,comment,type,created_at,type_r,order_id,user_type,REPLACE(FORMAT(amount,'N'),',',' ') AS amount FROM `billinghistory` WHERE user_id = :id AND created_at >= :from AND created_at <= :to"+
                "",{ type: sequelize.QueryTypes.SELECT , replacements: { from:from+' 00:00:00' , to:to+' 23:59:59',  id:id}}).then(getAll => {
                arr['all'] = getAll;
                res.send(arr);
            });
            });

        }else{

            db.sequelize.query("SELECT user_id, c_name, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ),'N'),',',' ') as Summa_p,"+
                " REPLACE(FORMAT(SUM(CASE When type = 2  Then amount Else 0 End),'N'),',',' ') AS Summa_r, REPLACE(FORMAT(SUM(CASE When type = 1 Then amount Else 0 End ) - "+
                " SUM(CASE When type = 2 Then amount Else 0 End ),'N'),',',' ') AS saldo  FROM `billinghistory` WHERE created_at >= :from AND "+
                " created_at <= :to  AND type_r =:select AND user_id = :id "+
                " ",  { type: sequelize.QueryTypes.SELECT , replacements: { from:from+' 00:00:00' , to:to+' 23:59:59', select:select, id:id}}).then(getBalansByType => {
                arr['balans'] = getBalansByType;

            db.sequelize.query("SELECT id,user_id,c_name,comment,type,created_at,type_r,order_id,user_type,REPLACE(FORMAT(amount,'N'),',',' ') AS amount FROM `billinghistory` WHERE user_id = :id AND created_at >= :from AND created_at <= :to AND type_r = :select"+
                "",{ type: sequelize.QueryTypes.SELECT , replacements: { from:from+' 00:00:00' , to:to+' 23:59:59', select:select, id:id}}).then(getAll => {
                arr['all'] = getAll;
                res.send(arr);
            });
            });
        }


}