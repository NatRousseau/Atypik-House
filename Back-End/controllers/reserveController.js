const reserveServices = require ('../services/reserve_services.ts');
const advertServices = require ('../services/advert_services.ts');

const async = require('async');
const Reserve = require('../models/reserve');
const Advert = require('../models/advert');

module.exports = {

    // =========================    CREATE  ========================= //

    createReserve: function (req, res) {
        var reserve = new Reserve(req.body);

        if (reserve.res_usr_id == null 
            || reserve.res_adv_id == null 
            || reserve.res_date == null
            || reserve.res_adv_price == null
            || reserve.res_adv_tenants == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (reserve.res_adv_tenants <0
            || reserve.res_adv_price <0
            ) {
            return res.status(400).json({ 'error': 'paramètres falsifiés' });
        }

        if (reserve.res_usr_id == null 
            || reserve.res_usr_mail == null
            || reserve.res_usr_phone == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecter.' });
        }
    
        var currentDate= new Date();
        currentDate =formatDate(currentDate);

        for(i=0 ; i<reserve.res_date.length ; i++){     
            if (reserve.res_date[i] < currentDate) {
                wrongDate = reserve.res_date[i];
                return res.status(400).json({ 'Erreur': 'La date sélectionné est invalide',wrongDate});
            }
        }
    

        async.waterfall([
            function (next) {
                advertServices.getAdvertByidTenantPrice(reserve.res_adv_id)
                    .then(result => {
                        if (result[0].adv_price != reserve.res_adv_price || result[0].adv_tenants < reserve.res_adv_tenants) { // informations falsifiés
                            return res.status(400).json({ 'error': 'La réservation comporte des informations falsifiés.' });
                        } else { 
                            reserve.adv_id = null;
                            next(null)
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Création de la réservation impossible.' });
                    });
            },
            function (next) {
                for(i=0 ; i<reserve.res_date.length ; i++){     
                    reserveServices.getReserveDate(reserve.res_date[i],reserve.res_adv_id)
                        .then(result => {
                            console.log(result);
                            if (result.length>0) { // id existe pour cette date+annonce
                                wrongDate=reserve.res_date[i];
                                return res.status(400).json({ 'error': 'Une réservation à cette date éxiste déjà.',wrongDate });
                            }
                            
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Création de la réservation impossible.' });
                        });
                }
                next(null);
            },
            function () {
                var Hours =  new Date().getHours(); 
                var Mins  =  new Date().getMinutes();
                Mins = Mins+15;
                const timer = currentDate +"-"+ Hours +":"+ Mins;
                reserve.res_payment_timer = timer;
  
                for(i=0 ; i<reserve.res_date.length ; i++){
                    reserve.res_payment = false;
                
                    reserveServices.createReserve(reserve.res_date[i],reserve)
                        .then(result => {
                            if (result.rowCount === 1) { 
                                return res.status(200).json({'succes': 'Réservation créée et en attente de payment'});
                            } else {
                                return res.status(400).json({ 'error': 'La réservation n\'as pus être enregistré. ' });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Création de l\'annonce impossible.' });
                        });
                }

            }]
        );
    },


    // =========================    UPDATE  ========================= //

    

    // =========================    DELETE  ========================= //





    // =========================    GET  ========================= //
   
    getReservebyAdvert: function (req, res) {
        const dataAdvert = req.body;
        userAdvert=[];
        userReserve=[];

       if (dataAdvert.adv_usr_id == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecté.' });
        }
        
        async.waterfall([
            function (next) {
                advertServices.getUserAdvert(dataAdvert)
                    .then(result => {
                        if (result.length != null) {
                            for(i=0 ; i<result.length ; i++){     
                            userAdvert[i] = new Advert(result[i]);
                            }
                            next(null,userAdvert)
                        } else {
                            return res.status(200).json({ 'error': 'Vous ne possédez pas d\'annonces.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            },
            function (userAdvert) {
                for(i=0 ; i<userAdvert.length ; i++){
                    reserveServices.getReserveInfos(userAdvert[i].adv_id)
                        .then(result => {
                            console.log(result);
                            if (result.length != null) {
                                for(i=0 ; i<result.length ; i++){     
                                userReserve[i] = new Reserve(result[i]);
                            }
                                return res.status(200).json({'succes':'Réservations récupérés',userReserve});
                            } else {
                                return res.status(400).json({ 'error': 'Aucune réservation n\'est enregistré.' });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Création de l\'annonce impossible.' });
                        });
                }

            }]
        );
    }

}

    // ----------------------- INTERN ----------------------- //
    function formatDate(currentDate) {
        var date = new Date(currentDate),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }