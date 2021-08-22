module.exports = function (app) {
    const auth = require('../middleware/auth');
    const advertController = require('../controllers/advertController');


//======================== Advert ==========================//
    app.route('/getAdvertByTimestamp')
        .post(advertController.getAdvertByTimestamp);


    app.route('/createAdvert')
        .post(auth,advertController.createAdvert);

    app.route('/getUserAdvert')
        .post(auth,advertController.getUserAdvert);

    app.route('/getAdvertbyId')
        .post(advertController.getAdvertbyId);

    app.route('/updateAdvert')
        .put(auth,advertController.updateAdvert);

    app.route('/deleteAdvert')
        .delete(auth,advertController.deleteAdvert);
}