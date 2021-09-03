var Reserve = function (reserve) {
    this.res_id = reserve.res_id;
    this.res_usr_id = reserve.res_usr_id;
    this.res_usr_mail = reserve.res_usr_mail;
    this.res_usr_phone = reserve.res_usr_phone;
    this.res_adv_id = reserve.res_adv_id;
    this.res_adv_name = reserve.res_adv_name;
    this.res_date_start = reserve.res_date_start;
    this.res_date_end = reserve.res_date_end;
    this.res_created_at = reserve.res_created_at;
    this.res_adv_price = reserve.res_adv_price;
    this.res_payment = reserve.res_payment;
    this.res_payment_timer = reserve.res_payment_timer;
    this.res_adv_tenants = reserve.res_adv_tenants;
    this.res_del_tenant = reserve.res_del_tenant;
    this.res_del_owner = reserve.res_del_owner;



};
module.exports = Reserve;
