module.exports = function (app) {
    const auth = require('../middleware/auth');
    const criteriaController = require('../controllers/criteriaController');


//======================== Activity ==========================//

    app.route('/createCriteria')
        .post(auth,criteriaController.createCriteria);

    app.route('/deleteCriteria')
        .delete(criteriaController.deleteCriteria);

    app.route('/getCriteria')
        .post(criteriaController.getCriteria);

    app.route('/getAdvertByCriteria')
        .post(criteriaController.getAdvertByCriteria);
}