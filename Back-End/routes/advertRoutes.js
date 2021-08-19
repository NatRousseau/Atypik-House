module.exports = function (app) {
    const auth = require('../middleware/auth');
    const advertController = require('../controllers/advertController');


//======================== Advert ==========================//
    app.route('/getAdvertByTimestamp')
        .post(advertController.getAdvertByTimestamp);


    app.route('/createAdvert')
        .post(auth,advertController.createAdvert);

    app.route('/getUserAdvert')
        .get(auth,advertController.getUserAdvert);

    app.route('/updateAdvert')
        .put(auth,advertController.updateAdvert);

    app.route('/deleteAdvert')
        .delete(auth,advertController.deleteAdvert);
}