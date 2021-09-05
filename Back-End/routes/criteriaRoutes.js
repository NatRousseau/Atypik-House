module.exports = function (app) {
    const auth = require('../middleware/auth');
    const criteriaController = require('../controllers/criteriaController');


//======================== Activity ==========================//

    app.route('/createCriteria')
        .post(criteriaController.createCriteria);

    app.route('/deleteCriteria')
        .delete(criteriaController.deleteCriteria);

    app.route('/getCriteria')
        .get(criteriaController.getCriteria);

    app.route('/getAdvertByCriteria')
        .get(criteriaController.getAdvertByCriteria);
}