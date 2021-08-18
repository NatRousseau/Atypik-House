var knex = require('../configs/knex/knex.js')
const Advert = require('../models/advert');


// =========================    CREATE  ========================= //

const createAdvert = function (name,type,tenants,adv_usr_id,status,cri_limit) {
    return knex.insert([{adv_name: name, adv_type: type, adv_tenants: tenants, adv_usr_id:adv_usr_id, adv_status: status,adv_cri_limit: cri_limit }]).into('public.adverts')
};

// =========================    UPDATE  ========================= //

const updateAdvert = function (advert) { 
    return knex.update({
        adv_name: advert.adv_name,
        adv_type: advert.adv_type,
        adv_tenants: advert.adv_tenants,

    })
    .into('public.adverts')
    .where('adv_id',advert.adv_id)
};

// =========================    GET  ========================= //


// const getUserByMail =  function (mail) {
//     return knex.select('usr_id').from('public.users').where('usr_mail', mail)
// };  

// const getUserIsLogin = function (mail){
//     return knex.select('usr_id','usr_password','usr_mail').from('public.users').where('usr_mail', mail)
// };

// =========================    DELETE  ========================= //


// ============================ EXPORTS ================================//
exports.createAdvert = createAdvert;
exports.updateAdvert = updateAdvert;
// exports.updateAuthToken = updateAuthToken;
// exports.getUserIsLogin = getUserIsLogin;
// exports.getUserByMail = getUserByMail;