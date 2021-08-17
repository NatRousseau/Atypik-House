module.exports = function (app) {
    const advertController = require('../controllers/advertController');


//======================== Advert ==========================//

    app.route('/createAdvert')
        .post(advertController.createAdvert);

    // app.route('/getAdvert')
    //     .get(userController.getAdvert);

    // app.route('/updateAdvert')
    //     .get(userController.updateAdvert);

    // app.route('/deleteAdvert')
    //     .get(userController.deleteAdvert);
}