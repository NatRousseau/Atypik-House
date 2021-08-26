var knex = require('../configs/knex/knex.js')
const Commentary = require('../models/commentary');

// =========================    CREATE  ========================= //

const createComment = function (commentary) {
    return knex.insert([{
        com_text: commentary.com_text,
    
    }]).into('public.adverts')
};

// =========================    UPDATE  ========================= //



// =========================    GET  ========================= //


// =========================    DELETE  ========================= //



// ============================ EXPORTS ================================//
exports.createActivity = createActivity;