module.exports = function (app) {
    const auth = require('../middleware/auth');
    const activityController = require('../controllers/activityController');


//======================== Activity ==========================//

    app.route('/createActivity')
        .post(activityController.createActivity);

    app.route('/getActivityByID')
        .post(activityController.getActivityByID);
}