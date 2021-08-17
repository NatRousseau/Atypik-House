module.exports = function (app) {
    //const auth = require('../middleware/auth');
    const userController = require('../controllers/userController');
    const advertController = require('../controllers/advertController');


//======================== Advert ==========================//

    app.route('/createAdvert')
        .post(userController.createAdvert);

    app.route('/getAdvert')
        .get(userController.getAdvert);

    app.route('/updateAdvert')
        .get(userController.updateAdvert);

    app.route('/deleteAdvert')
        .get(userController.deleteAdvert);