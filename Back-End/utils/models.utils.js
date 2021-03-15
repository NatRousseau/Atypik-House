const pg = require('pg');
const config = require('../configs/database.json');


const pool = new pg.Pool();

module.exports = {
	promise: function (query, parameters = []) {
		return new Promise((success, failure) => {
			pool.connect(config).then(pool => {
				const request = pool.request();
				for(let key in parameters){
					const value = parameters[key];
					request.input(key, value);
				}
				return request.query(query);
			}).then(result => {
				success(result);
			}).catch(err => {
				failure(err);
			});
		});
	},
}