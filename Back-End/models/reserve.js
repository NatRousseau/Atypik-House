var Reserve = function (reserve) {
    this.res_id = reserve.res_id;
    this.res_usr_id = reserve.res_usr_id;
    this.res_usr_mail = reserve.res_usr_mail;
    this.res_usr_phone = reserve.res_usr_phone;
    this.res_adv_id = reserve.res_adv_id;
    this.res_date = reserve.res_date;
    this.res_created_at = reserve.res_created_at;
    this.res_adv_price = reserve.res_adv_price;
    this.res_payment = reserve.res_payment;
    this.res_payment_timer = reserve.res_payment_timer;
    this.res_adv_tenants = reserve.res_adv_tenants;



};
module.exports = Reserve;
