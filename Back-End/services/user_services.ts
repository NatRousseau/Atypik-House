var knex = require('../configs/knex/knex.js');
const User = require('../models/user');

// =========================    CREATE  ========================= //

const createUser = function (user) {
    return knex.insert([{usr_mail: user.usr_mail,
        usr_password: user.usr_password,
        usr_phone: user.usr_phone,
        usr_firstName: user.usr_firstName,
        usr_lastName: user.usr_lastName
    }]).into('public.users')
};

// =========================    UPDATE  ========================= //

const updateUser = function (user) { 
    return knex.update({
        usr_mail: user.usr_mail,
        usr_password: user.usr_password
    })
    .into('public.users')
    .where('usr_id',user.usr_id)
};

const updateAuthToken = function (user) { 
    return knex.update({
        usr_access_token: user.usr_access_token,
        usr_refresh_token: user.usr_refresh_token,
        usr_expires_in: user.usr_expires_in
    })
    .into('public.users')
    .where('usr_id',user.usr_id)
};

const updateToken = function (user) { 
    return knex.update({
        usr_access_token: user.usr_access_token
    })
    .into('public.users')
    .where('usr_id',user.usr_id)
};

const resetupdateToken = function (updateToken) { 
    return knex.update({
        usr_refresh_token: null
    })
    .into('public.users')
    .where('usr_refresh_token',updateToken)
};

// =========================    GET GENERIC ========================= //
const getRole =  function (token) {
    return knex.select('usr_rol_id').from('public.users').where('usr_access_token',token)
}; 

const getUserCheckToken =  function (token) {
    return knex.select('usr_id','usr_mail').from('public.users').where('usr_access_token',token)
}; 

const getUserByMail =  function (mail) {
    return knex.select('usr_id').from('public.users')
    .where('usr_mail', mail)
};
const getUserByPhone =  function (phone) {
    return knex.select('usr_id').from('public.users')
    .where('usr_phone', phone)
}; 

const getUserByUpdateToken =  function (updateToken) {
    return knex.select('usr_id','usr_mail').from('public.users').where('usr_refresh_token', updateToken)
};  

const getUserIsRegister = function(id,first,last){
    return knex.select('usr_id','usr_firstName','usr_lastName').from('public.users').where('usr_id',id).andWhere('usr_firstName',first).andWhere('usr_lastName',last)
};

const getUserIsLogin = function (mail){
    return knex.select('usr_id','usr_password','usr_mail','usr_phone','usr_firstName','usr_lastName').from('public.users').where('usr_mail', mail)
};

// =========================    GET ADMIN ========================= //
const getIsAdmin =  function (rol) {
    return knex.select('rol_id','rol_name').from('public.roles').where('rol_id', rol)
};  

// =========================    DELETE  ========================= //

const deleteUser = function (user){
    return knex.del('usr_id')
    .from('public.users')
    .where('usr_id',user.usr_id)
};
// ============================ EXPORTS ================================//
exports.createUser = createUser;

exports.updateUser = updateUser;
exports.updateAuthToken = updateAuthToken;
exports.resetupdateToken = resetupdateToken;
exports.updateToken = updateToken;

exports.getRole = getRole;
exports.getUserCheckToken  = getUserCheckToken ;
exports.getIsAdmin = getIsAdmin;
exports.getUserIsLogin = getUserIsLogin;
exports.getUserIsRegister = getUserIsRegister;
exports.getUserByUpdateToken = getUserByUpdateToken;
exports.getUserByMail = getUserByMail;
exports.getUserByPhone = getUserByPhone;

exports.deleteUser = deleteUser;