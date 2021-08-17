var User = function (user) {
    this.usr_id = user.usr_id;
    this.usr_mail = user.usr_mail;
    this.usr_password = user.usr_password;
    this.usr_rol_id = user.usr_rol_id;
    this.usr_firstName = user.usr_firstName;
    this.usr_lastName = user.usr_lastName;
    this.usr_access_token = user.usr_access_token;
    this.usr_refresh_token = user.usr_refresh_token;
    this.usr_expires_in = user.usr_expires_in;
};

module.exports = User;
    