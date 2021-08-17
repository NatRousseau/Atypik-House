module.exports = function (app) {
    //const auth = require('../middleware/auth');
    const userController = require('../controllers/userController');
    const advertController = require('../controllers/advertController');


//======================== USER  ==========================//
    app.route('/register')
        .post(userController.register);

    app.route('/login')
        .get(userController.login);

//======================== Advert ==========================//

    app.route('/createAdvert')
        .post(userController.createAdvert);

    app.route('/getAdvert')
        .get(userController.getAdvert);

    app.route('/updateAdvert')
        .get(userController.updateAdvert);

    app.route('/deleteAdvert')
        .get(userController.deleteAdvert);

    

//======================== JWT TOKKENS ==========================//


    // app.route('/refresh')
    //     .post(userController.updateToken);
    // app.route('/logout')
    //     .post(userController.deleteToken);



}