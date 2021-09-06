var knex = require('../configs/knex/knex.js')
const Criteria = require('../models/criteria');

// =========================    CREATE  ========================= //
const createCriteria = function(criteria){
    return knex.insert([{
        cri_name: criteria.cri_name,
    }]).into('public.criterias')
};

const linkcriteriAdvert = function(advert,criId){
    return knex.insert([{
        ria_adv_id: advert,
        ria_cri_id: criId
    }]).into('public.criteriadvert')
};

// =========================    UPDATE  ========================= //

// =========================    GET    ========================= //
const getCriteria = function(){
    return knex.select('cri_id','cri_name')
    .from('public.criterias')
};

const getAdvertByCritera = function(criId){
    return knex.select('ria_adv_id')
    .from('public.criteriadvert')
    .where('ria_cri_id',criId)
};
// =========================    DELETE  ========================= //
const deleteCriteria = function(criteria){
    return knex.del('cri_id')
    .from('public.criterias')
    .where('cri_id',criteria.cri_id)
};

const clearlinkcriteriAdvert = function(advert){
    return knex.del('ria_adv_id')
    .from('public.criteriadvert')
    .where('ria_adv_id',advert)
};

// ============================ EXPORTS ================================//
exports.createCriteria = createCriteria;
exports.linkcriteriAdvert =linkcriteriAdvert;
exports.deleteCriteria = deleteCriteria;
exports.clearlinkcriteriAdvert = clearlinkcriteriAdvert;
exports.getCriteria = getCriteria;
exports.getAdvertByCritera = getAdvertByCritera;