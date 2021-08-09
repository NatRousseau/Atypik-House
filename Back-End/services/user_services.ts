// const database = require("../configs/database");
const knex = require('../configs/knex/knex.js');
const User = require('../models/user');

// =========================    CREATE  ========================= //

const createUser = function (mail,password) {
    return knex.insert([{usr_mail: mail, usr_password: password}]).into('public.users')
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
// =========================    GET  ========================= //
// User.getUser = function () {
//     return (
//         "SELECT usr_id as id, usr_mail as mail, usr_password as password " +
//         "FROM public.users"
//     )
// };

const getUserByMail =  function (mail) {
    return knex.select('usr_id').from('public.users').where('usr_mail', mail)
};  

const getUserIsLogin = function (mail){
    return knex.select('usr_id','usr_password','usr_mail').from('public.users').where('usr_mail', mail)
};

// =========================    DELETE  ========================= //

// User.deleteUser = function (userId) {
//     return (
//         "EXEC public.deleteUserById @userId",
//         {
//             userId
//         }
//     );
// };

// ============================ EXPORTS ================================//
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.updateAuthToken = updateAuthToken;
exports.getUserIsLogin = getUserIsLogin;
exports.getUserByMail = getUserByMail;