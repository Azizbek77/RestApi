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
        db.sequelize.query("SELECT user_id, c_name, SUM(CASE When type = 1 Then amount Else 0 End ) as Summa_p,"+
            " SUM(CASE When type = 2  Then amount Else 0 End ) AS Summa_r, SUM(CASE When type = 1 Then amount Else 0 End ) - "+
            " SUM(CASE When type = 2 Then amount Else 0 End ) AS saldo  FROM `billinghistory` WHERE created_at >= :from AND "+
            " created_at <= :to  GROUP BY user_id "+
            " ",  { type: sequelize.QueryTypes.SELECT , replacements: { from:from+' 00:00:00' , to:to+' 23:59:59'}}).then(getBalansByDate => {
        res.send(getBalansByDate);
    });

};
