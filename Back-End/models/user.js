var modelsUtils = require('../utils/models.utils.js');

var User = function (user) {
    this.usr_id = user.id;
    this.usr_mail = user.mail;
    this.usr_password = user.password;
    this.usr_firstName = user.firstName;
    this.usr_lastName = user.lastName;
};


// =========================    CREATE  ========================= //

User.createUser = function (user) {
    return modelsUtils.promise(
        "INSERT INTO AtypikHouse-BDD.users(usr_mail,usr_password) " +
        "OUTPUT Inserted.usr_id " +
        "VALUES(" +
        "@password," +
        "@mail" +
        ")",
        {
            password: user.usr_password,
            mail: user.usr_mail

        }
    );
};

// =========================    UPDATE  ========================= //

User.updateUser = function (user) {
    return modelsUtils.promise(
        "UPDATE AtypikHouse-BDD.users SET " +
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
    return modelsUtils.promise(
        "SELECT usr_id as id, usr_mail as mail, usr_password as password " +
        "FROM AtypikHouse-BDD.users"
    )
};

User.getUserByMail = function (mail) {
    return modelsUtils.promise(
        "SELECT usr_id " +
        "FROM AtypikHouse-BDD.users " +
        "WHERE usr_mail = @mail",
        {
            mail
        }
    );
};
// =========================    DELETE  ========================= //

User.deleteUser = function (userId) {
    return modelsUtils.promise(
        "EXEC AtypikHouse-BDD.deleteUserById @userId",
        {
            userId
        }
    );
};

module.exports = User;