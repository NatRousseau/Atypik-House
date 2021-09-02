module.exports = function (app) {
    const auth = require('../middleware/auth');
    const activityController = require('../controllers/activityController');


//======================== Activity ==========================//

    app.route('/createActivity')
        .post(activityController.createActivity);

    app.route('/getActivityByID')
        .post(activityController.getActivityByID);
    
    app.route('/getOneActivityByID')
        .post(activityController.getOneActivityByID);

    app.route('/updateActivity')
        .put(activityController.updateActivity);
    
    app.route('/deleteActivity')
        .delete(activityController.deleteActivity);
}