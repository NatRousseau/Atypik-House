module.exports = function (app) {
    //const auth = require('../middleware/auth');
    const userController = require('../controllers/userController');



    app.route('/register')
        .post(userController.register);

    // app.route('/login')
    //     .post(userController.login);

    // app.route('/user')
    //     .get(userController.getUser)
    //     //.get(auth, userController.getUser)
    //     .delete(userController.deleteUser);
        //.delete(auth, userController.deleteUser);

//======================== JWT TOKKENS ==========================//


    // app.route('/refresh')
    //     .post(userController.updateToken);
    // app.route('/logout')
    //     .post(userController.deleteToken);



}