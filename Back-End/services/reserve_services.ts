var knex = require('../configs/knex/knex.js');
const Reserve = require('../models/reserve');

// =========================    CREATE  ========================= //
const createReserve =  function (dateStart,dateEnd,reserve) {
    return knex.insert([{
        res_usr_id: reserve.res_usr_id,
        res_usr_mail: reserve.res_usr_mail,
        res_usr_phone: reserve.res_usr_phone,
        res_adv_id: reserve.res_adv_id,
        res_date_start: dateStart,
        res_date_end: dateEnd,
        res_adv_price:reserve.res_adv_price,
        res_payment: reserve.res_payment,
        res_payment_timer:reserve.res_payment_timer,
        res_adv_tenants:reserve.res_adv_tenants

    }]).into('public.reserves')
}; 

// =========================    UPDATE  ========================= //



// =========================    GET  ========================= //
const getReserveDate =  function (dateStart,dateEnd,res_adv_id) {
    return knex.select('res_id')
    .from('public.reserves')
    .where('res_adv_id',res_adv_id)
    .andWhere('res_date_start',dateStart)
    .orWhere('res_date_end',dateEnd)

};  
// knex('users').whereNotBetween('votes', [1, 100])

const getDateResAdv =  function (res_adv_id) {
    return knex.select('res_date_start','res_date_end')
    .from('public.reserves')
    .where('res_adv_id',res_adv_id)
};  

const getUserReserve = function (reserve){
    return knex.select(
    'res_id',
    'res_usr_id',
    'res_adv_id',
    'res_usr_mail',
    'res_usr_phone',
    'res_date_start',
    'res_date_end',
    'res_created_at',
    'res_adv_price',
    )
    .from('public.reserves')
    .where('res_usr_id',reserve.res_usr_id)
    .andWhere('res_payment',true)
    .orderBy('res_created_at','asc')
};  


const getReserveInfos =  function (adv_id) {
    return knex.select(
    'res_id',
    'res_usr_id',
    'res_adv_id',
    'res_usr_mail',
    'res_usr_phone',
    'res_date_start',
    'res_date_end',
    'res_created_at',
    'res_adv_price',
    )
    .from('public.reserves')
    .where('res_adv_id',adv_id)
    .andWhere('res_payment',true)
    .orderBy('res_created_at','asc')
};  
// =========================    DELETE  ========================= //


// ============================ EXPORTS ================================//
exports.getReserveDate = getReserveDate;
exports.getReserveInfos = getReserveInfos;
exports.getUserReserve = getUserReserve;
exports.createReserve = createReserve;
exports.getDateResAdv = getDateResAdv;
