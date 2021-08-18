module.exports = function (app) {
    const advertController = require('../controllers/advertController');


//======================== Advert ==========================//

    app.route('/createAdvert')
        .post(advertController.createAdvert);

    app.route('/getUserAdvert')
        .get(advertController.getUserAdvert);

    app.route('/updateAdvert')
        .put(advertController.updateAdvert);

    app.route('/deleteAdvert')
        .delete(advertController.deleteAdvert);
}