module.exports = function (app) {

    
    const auth = require('../middleware/auth');
    const userController = require('../controllers/userController');


//======================== USER  ==========================//
    app.route('/register')
        .post(userController.register);

    app.route('/login')
        .post(userController.login);

    app.route('/refresh')
        .post(userController.updateToken);

    app.route('/logout')
        .post(userController.deleteToken);

}