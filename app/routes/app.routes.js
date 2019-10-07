module.exports = function (app) {

    var users = require('../controllers/users.controller.js');
    var courierHistory = require('../controllers/front.controller.js');
    var api = require('../controllers/api.controller.js');

    /***API***/
    app.post('/api/v1/bonus/create', api.create);
    app.get('/api/v1/bonus/bonusList', api.bonusList);
    app.get('/api/v1/bonus/balans', api.balans);
    app.get('/api/v1/bonus/sum', api.bonusSum);
    app.get('/api/v1/bonus/userBonus/:id', api.userBonus);
    app.get('/api/v1/bonus/userBonusList/:id', api.userBonusList);
    app.get('/api/v1/bonus/userTotalBonus/:id', api.userTotalBonus);
    app.get('/api/v1/bonus/userBonusSolary/:id', api.userBonusSolar);

    /**апи для биллинга фронт **/
    app.get('/list', users.list);
    app.get('/courierDetail/:id', courierHistory.userDetail);
    app.get('/getBalansByDate/:from_date/:to_date',courierHistory.getBalansByDate);
};
