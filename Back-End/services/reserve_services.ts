var knex = require('../configs/knex/knex.js');
const Reserve = require('../models/reserve');

// =========================    CREATE  ========================= //
const createReserve =  function (dateStart,dateEnd,reserve) {
    return knex.insert([{
        res_usr_id: reserve.res_usr_id,
        res_usr_mail: reserve.res_usr_mail,
        res_usr_phone: reserve.res_usr_phone,
        res_adv_id: reserve.res_adv_id,
        res_adv_name: reserve.res_adv_name,
        res_date_start: dateStart,
        res_date_end: dateEnd,
        res_adv_price:reserve.res_adv_price,
        res_payment: reserve.res_payment,
        res_payment_timer:reserve.res_payment_timer,
        res_adv_tenants:reserve.res_adv_tenants

    }]).into('public.reserves')
}; 

// =========================    UPDATE  ========================= //
const updateDelOwnerStatus = function(reserve){
    return knex.update({
        res_del_owner: reserve.res_del_owner
    })
    .into('public.reserves')
    .where('res_id',reserve.res_id)
    .andWhere('res_adv_id',reserve.res_adv_id)
};

const updateDelTenantStatus = function(reserve){
    return knex.update({
        res_del_tenant: reserve.res_del_tenant
    })
    .into('public.reserves')
    .where('res_id',reserve.res_id)
    .andWhere('res_adv_id',reserve.res_adv_id)
};

const validReserve = function(reserve){
    return knex.update({
        res_payment: true
    })
    .into('public.reserves')
    .where('res_adv_id',reserve.res_adv_id)
    .andWhere('res_usr_id',reserve.res_usr_id)
    .andWhere('res_date_start',reserve.res_date_start)
    .andWhere('res_date_end',reserve.res_date_end)
    .andWhere('res_payment',false)
};

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
    'res_adv_name',
    'res_usr_mail',
    'res_usr_phone',
    'res_date_start',
    'res_date_end',
    'res_adv_tenants',
    'res_created_at',
    'res_adv_price',
    'res_del_tenant',
    'res_del_owner'
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
    'res_adv_name',
    'res_usr_mail',
    'res_usr_phone',
    'res_date_start',
    'res_date_end',
    'res_adv_tenants',
    'res_created_at',
    'res_adv_price',
    'res_del_tenant',
    'res_del_owner'
    )
    .from('public.reserves')
    .where('res_adv_id',adv_id)
    .andWhere('res_payment',true)
    .orderBy('res_created_at','asc')
};  

const getReserveTenant = function(reserve){
    return knex.select(
    'res_usr_id',
    'res_adv_id'
    )
    .from('public.reserves')
    .where('res_id',reserve.res_id)
    .andWhere('res_usr_id',reserve.res_usr_id)

};

const getReserveDelStatus = function(reserve){
    return knex.select(
    'res_del_tenant',
    'res_del_owner'
    )
    .from('public.reserves')
    .where('res_adv_id',reserve.res_adv_id)
    .andWhere('res_id',reserve.res_id)
};
// =========================    DELETE  ========================= //
const deleteReserve = function(reserve){
    return knex.del('res_id')
    .from('public.reserves')
    .where('res_id',reserve.res_id)
    .andWhere('res_adv_id',reserve.res_adv_id)
};



const cancelReserve = function(reserve){
    return knex.del('res_id')
    .from('public.reserves')
    .where('res_adv_id',reserve.res_adv_id)
    .andWhere('res_usr_id',reserve.res_usr_id)
    .andWhere('res_date_start',reserve.res_date_start)
    .andWhere('res_date_end',reserve.res_date_end)
    .andWhere('res_payment',false)
} 

const cancelGlobalUnpaidReserve = function(currentTimer){
    return knex.del('res_id')
    .from('public.reserves')
    .where('res_payment',false)
    .andWhere('res_payment_timer','<',currentTimer);
} 

// ============================ EXPORTS ================================//
exports.getReserveDate = getReserveDate;
exports.getReserveInfos = getReserveInfos;
exports.getUserReserve = getUserReserve;
exports.getReserveTenant = getReserveTenant;
exports.getReserveDelStatus = getReserveDelStatus;
exports.createReserve = createReserve;
exports.getDateResAdv = getDateResAdv;
exports.cancelReserve = cancelReserve;
exports.deleteReserve = deleteReserve;
exports.cancelGlobalUnpaidReserve = cancelGlobalUnpaidReserve;
exports.validReserve = validReserve;
exports.updateDelOwnerStatus = updateDelOwnerStatus;
exports.updateDelTenantStatus = updateDelTenantStatus;
