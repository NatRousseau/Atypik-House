var Advert = function (advert) {
    this.adv_id = advert.adv_id;
    this.adv_name = advert.adv_name;
    this.adv_type = advert.adv_type;
    this.adv_tenants = advert.adv_tenants;
    this.adv_usr_id = advert.adv_usr_id;
    this.adv_status = advert.adv_status;
    this.adv_cri_limit = advert.adv_cri_limit;
    this.adv_created_at = advert.adv_created_at;

};

module.exports = Advert;
