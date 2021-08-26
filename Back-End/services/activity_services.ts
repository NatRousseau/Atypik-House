var knex = require('../configs/knex/knex.js')
const Activity = require('../models/activity');

// =========================    CREATE  ========================= //

const createActivity = function (activity) {
    return knex.insert([{
        act_name: activity.act_name,
        
    }]).into('public.adverts')
};

// =========================    UPDATE  ========================= //



// =========================    GET  ========================= //



// =========================    DELETE  ========================= //



// ============================ EXPORTS ================================//
exports.createActivity = createActivity;
