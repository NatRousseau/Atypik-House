const database = require("../configs/database");

var User = function (user) {
    this.usr_id = user.id;
    this.usr_mail = user.mail;
    this.usr_password = user.password;
    this.usr_firstName = user.firstName;
    this.usr_lastName = user.lastName;
};


// =========================    CREATE  ========================= //

User.createUser = function (mail, password) {
    // return database.raw(
    //     "INSERT INTO public.users(usr_mail,usr_password) VALUES('" + mail + "', '" + password + "')",
    //     {
    //         mail,
    //         password
    //     },
    // );
    return database.insert([{usr_mail: mail, usr_password: password}]).into('public.users')
};

// =========================    UPDATE  ========================= //

User.updateUser = function (user) {
    return (
        "UPDATE public.users SET " +
        "usr_mail = @mail, " +
        "usr_password = @password " +
        "WHERE usr_id = @userId",
        {
            accessToken: user.usr_access_token,
            updateToken: user.usr_refresh_token,
            expiresIn: user.usr_expires_in,
            userId: user.usr_id
        }
    );
};

// =========================    GET  ========================= //
User.getUser = function () {
    return (
        "SELECT usr_id as id, usr_mail as mail, usr_password as password " +
        "FROM public.users"
    )
};

User.getUserByMail = function (mail) {
    return database.select('usr_id').from('public.users').where('usr_mail', mail)
};
// =========================    DELETE  ========================= //

User.deleteUser = function (userId) {
    return (
        "EXEC public.deleteUserById @userId",
        {
            userId
        }
    );
};

module.exports = User;
