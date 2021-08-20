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

    // app.route('/user')
    //     .get(auth, userController.getUserProfile)
    //     .delete(auth, userController.deleteUser);

    // app.route('/user/email')
    //     .put(auth, userController.updateUserMail);

    // app.route('/user/password/reset')
    //     .put(auth, userController.resetPassword);

    // app.route('/user/password')
    //     .put(userController.updateUserPassword);

}