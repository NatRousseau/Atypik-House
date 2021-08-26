module.exports = function (app) {
    const auth = require('../middleware/auth');
    const commentaryController = require('../controllers/commentaryController');


//======================== Commentary ==========================//

    app.route('/createCommentary')
        .post(commentaryController.createCommentary);

}