module.exports = function (app) {
    const auth = require('../middleware/auth');
    const reserveController = require('../controllers/reserveController');


//======================== Advert ==========================//
    
    app.route('/createReserve')
        .post(reserveController.createReserve);

    app.route('/getReservebyAdvert')
        .post(reserveController.getReservebyAdvert);

    app.route('/getUserReserve')
        .post(auth,reserveController.getUserReserve);

    app.route('/getDatebyAdvRes')
        .post(reserveController.getDatebyAdvRes);

}