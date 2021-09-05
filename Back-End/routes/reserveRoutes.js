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

    app.route('/deleteReserve')
        .delete(auth,reserveController.deleteReserve);

    app.route('/cancelReserve')
        .delete(reserveController.cancelReserve);
    
    app.route('/validReserve')
        .put(reserveController.validReserve);

    app.route('/getDatebyAdvRes')
        .post(reserveController.getDatebyAdvRes);

}