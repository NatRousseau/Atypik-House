var knex = require('../configs/knex/knex.js')
const Advert = require('../models/advert');

// =========================    CREATE  ========================= //

const createAdvert = function (advert) {
    return knex.insert([{adv_name: advert.adv_name, adv_type: advert.adv_type, adv_tenants: advert.adv_tenants, adv_usr_id: advert.adv_usr_id, adv_status: advert.adv_status, adv_cri_limit: advert.adv_cri_limit }]).into('public.adverts')
};

// =========================    UPDATE  ========================= //

const updateAdvert = function (advert) { 
    return knex.update({
        adv_name: advert.adv_name,
        adv_type: advert.adv_type,
        adv_tenants: advert.adv_tenants,
        adv_status: advert.adv_status,
        adv_cri_limit: advert.adv_cri_limit

    })
    .into('public.adverts')
    .where('adv_usr_id',advert.adv_usr_id)
    .andWhere('adv_id',advert.adv_id)
};

// =========================    GET  ========================= //


const getUserAdvert =  function (dataAdvert) {
    return knex.select('adv_id','adv_name','adv_type','adv_tenants','adv_status','adv_cri_limit','adv_usr_id','adv_created_at')
    .from('public.adverts')
    .where('adv_usr_id',dataAdvert.adv_usr_id)
};  


// const getAdvertByTimestamp =  function (pagenumber) {
//     return knex.select('adv_id','adv_name','adv_type','adv_tenants','adv_status','adv_cri_limit','adv_usr_id','adv_created_at')
//     .from('public.adverts')
//     .orderBy('adv_created_at')
//     .where(function(){
//         this.where('adv_created_at','>=',pagenumber.x)
//         .andWhere('adv_created_at','=<',pagenumber.y)
//     }) // where adv_created_at est compris entre x et y   1 et 10 pr exemple
// }; 


const getAdvertByName =  function (advert) {
    return knex.select('adv_name')
    .from('public.adverts')
    .where('adv_name',advert.adv_name)
};

// =========================    DELETE  ========================= //

const deleteAdvert = function (advert){
    return knex.del('adv_id','adv_name','adv_type','adv_tenants','adv_status','adv_cri_limit','adv_usr_id','adv_created_at')
    .from('public.adverts')
    .where('adv_usr_id',advert.adv_usr_id)
    .andWhere('adv_id',advert.adv_id)
};

// ============================ EXPORTS ================================//
exports.createAdvert = createAdvert;
exports.updateAdvert = updateAdvert;
exports.getUserAdvert = getUserAdvert;
exports.getAdvertByName = getAdvertByName;
exports.deleteAdvert = deleteAdvert;