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

const getCommentaryOwner = function (commentary){
    return knex.select('com_id','com_usr_id',)
    .from('public.commentarys')
    .where('com_id',commentary.com_id)
    .andWhere('com_usr_id',commentary.com_usr_id)
};

const getCommentarybyAdvert = function(commentary){
    return knex.select('com_id','com_text','com_adv_id','com_usr_id','com_usr_firstName','com_usr_lastName')
    .from('public.commentarys')
    .where('com_adv_id',commentary.com_adv_id)
};

// =========================    DELETE  ========================= //

const deleteCommentary = function(commentary){
    return knex.del('com_id')
    .from('public.commentarys')
    .where('com_id',commentary.com_id)
    .andWhere('com_adv_id',commentary.com_adv_id)
};

// ============================ EXPORTS ================================//
exports.createCommentary = createCommentary;
exports.getCommentaryOwner = getCommentaryOwner;
exports.getCommentarybyAdvert = getCommentarybyAdvert;
exports.deleteCommentary = deleteCommentary;