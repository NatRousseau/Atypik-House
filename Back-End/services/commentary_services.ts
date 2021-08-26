var knex = require('../configs/knex/knex.js')
const Commentary = require('../models/commentary');

// =========================    CREATE  ========================= //

const createCommentary = function (commentary) {
    return knex.insert([{
        com_text: commentary.com_text,
        com_adv_id: commentary.com_adv_id,
        com_usr_id: commentary.com_usr_id,
        com_usr_firstName: commentary.com_usr_firstName,
        com_usr_lastName: commentary.com_usr_lastName
    }]).into('public.commentarys')
};


// =========================    UPDATE  ========================= //



// =========================    GET  ========================= //


// =========================    DELETE  ========================= //



// ============================ EXPORTS ================================//
exports.createCommentary = createCommentary;