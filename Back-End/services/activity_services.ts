var knex = require('../configs/knex/knex.js')
const Activity = require('../models/activity');

// =========================    CREATE  ========================= //

const createActivity = function (activity) {
    return knex.insert([{
        act_name: activity.act_name,
        act_adv_id: activity.act_adv_id,
        act_adress: activity.act_adress,
        act_city:activity.act_city,
        act_postal: activity.act_postal,
        act_describe: activity.act_describe,
        act_usr_id: activity.act_usr_id
    }]).into('public.activitys')
};

// =========================    UPDATE  ========================= //

const updateActivity = function(activity){
    return knex.update({
        act_name: activity.act_name,
        act_adress: activity.act_adress,
        act_city:activity.act_city,
        act_postal: activity.act_postal,
        act_describe: activity.act_describe
    })
    .into('public.activitys')
    .where('act_usr_id',activity.act_usr_id)
    .andWhere('act_id',activity.act_id)
};


// =========================    GET  ========================= //

const getActivityByID =  function (dataActivity) {
    return knex.select('act_id','act_name','act_adv_id','act_adress','act_city','act_postal','act_describe','act_usr_id')
    .from('public.activitys')
    .where('act_adv_id',dataActivity.adv_id)
}; 

const getOneActivityByID =  function (activity) {
    return knex.select('act_id','act_name','act_adv_id','act_adress','act_city','act_postal','act_describe','act_usr_id')
    .from('public.activitys')
    .where('act_id',activity.act_id)
    .andWhere('act_adv_id',activity.act_adv_id)
}; 

// =========================    DELETE  ========================= //

const deleteActivity = function(activity){
    return knex.del('act_id')
    .from('public.activitys')
    .where('act_id',activity.act_id)
    .andWhere('act_usr_id',activity.act_usr_id)
};
// ============================ EXPORTS ================================//
exports.createActivity = createActivity;
exports.getActivityByID = getActivityByID;
exports.getOneActivityByID = getOneActivityByID;
exports.deleteActivity = deleteActivity;
exports.updateActivity = updateActivity;