module.exports = function (app) {
    const auth = require('../middleware/auth');
    const reserveController = require('../controllers/reserveController');


//======================== Advert ==========================//
    
    app.route('/createReserve')
        .post(reserveController.createReserve);

    app.route('/getReservebyAdvert')
        .post(reserveController.getReservebyAdvert);
}