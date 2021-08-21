var knex = require('../configs/knex/knex.js');
const Reserve = require('../models/reserve');

// =========================    CREATE  ========================= //
const createReserve =  function (date,reserve) {
    return knex.insert([{
        res_usr_id: reserve.res_usr_id,
        res_usr_mail: reserve.res_usr_mail,
        res_usr_phone: reserve.res_usr_phone,
        res_adv_id: reserve.res_adv_id,
        res_date: date,
        res_adv_price:reserve.res_adv_price,
        res_payment: reserve.res_payment,
        res_payment_timer:reserve.res_payment_timer,
        res_adv_tenants:reserve.res_adv_tenants

    }]).into('public.reserves')
}; 

// =========================    UPDATE  ========================= //



// =========================    GET  ========================= //
const getReserveDate =  function (date,res_adv_id) {
    return knex.select('res_id')
    .from('public.reserves')
    .where('res_adv_id',res_adv_id)
    .andWhere('res_date',date)
};  

// =========================    DELETE  ========================= //


// ============================ EXPORTS ================================//
exports.getReserveDate = getReserveDate;
exports.createReserve = createReserve;
