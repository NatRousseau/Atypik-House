const reserveServices = require ('../services/reserve_services.ts');
const advertServices = require ('../services/advert_services.ts');
const userServices = require ('../services/user_services.ts');

const async = require('async');
const Reserve = require('../models/reserve');

module.exports = {

    // =========================    CREATE  ========================= //

    createReserve: function (req, res) {
        var reserve = new Reserve(req.body);

        if (reserve.res_usr_id == null 
            || reserve.res_adv_id == null 
            || reserve.res_adv_name == null
            || reserve.res_date_start == null
            || reserve.res_date_end == null
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
        currentDate = formatDate(currentDate);

        var currentYear= new Date().getFullYear();
        maxyear = new Date(currentYear + 1,11,31);
        maxyear = formatDate(maxyear);

        if(reserve.res_date_end > maxyear || reserve.res_date_start > maxyear){
            return res.status(400).json({ 'Erreur': 'La date sélectionnée est supérieure à la période donné.',maxyear});
        }
      
        if (reserve.res_date_start < currentDate || reserve.res_date_end < currentDate ) {
            wrongDateStart = reserve.res_date_start;
            wrongDateEnd = reserve.res_date_end;
            return res.status(400).json({ 'Erreur': 'La date sélectionné est invalide',wrongDateStart,wrongDateEnd});
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
                let count=0;
                reserveServices.getDateResAdv(reserve.res_adv_id)
                    .then(result => {
                        if (result.length >0) { 
                            for(i=0;i<result.length;i++){
                                if((reserve.res_date_start >= formatDate(result[i].res_date_start) &&  reserve.res_date_start <= formatDate(result[i].res_date_end))
                                    || (reserve.res_date_end >= formatDate(result[i].res_date_start) &&  reserve.res_date_end <= formatDate(result[i].res_date_end))
                                    || (reserve.res_date_start <= formatDate(result[i].res_date_start) &&  reserve.res_date_end >= formatDate(result[i].res_date_end))
                                    ){
                                    count++;
                                }
                            }
                            if(count>0){
                                return res.status(200).json({'error': 'Ensemble de dates sélectionnés invalide',count});
                            }
                            next(null)
                        }
                        else {
                            next(null)
                            } 
                        })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Création de la réservation impossible.' });
                    });
            },
            function () {
                var Hours =  new Date().getHours(); 
                var Mins  =  new Date().getMinutes();
                Mins = Mins+15;
                const timer = currentDate +"-"+ Hours +":"+ Mins;
                reserve.res_payment_timer = timer;
                reserve.res_payment = false;
                
                reserveServices.createReserve(reserve.res_date_start,reserve.res_date_end,reserve)
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
            }]
        );
    },


    // =========================    UPDATE  ========================= //

    

    // =========================    DELETE  ========================= //





    // =========================    GET  ========================= //
   
    getReservebyAdvert: function (req, res) {
        const dataAdvert = req.body;
        userReserve=[];

        if (dataAdvert.usr_id == null 
            ) {
            return res.status(400).json({ 'error': 'veuillez vous connecter.' });
        }
        if (dataAdvert.adv_id == null 
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }
        
        async.waterfall([
            function (next) {
                advertServices.getUserAdvertOwner(dataAdvert)
                    .then(result => {
                        if (result.length != null) {
                            next(null)
                        } else {
                            return res.status(200).json({ 'error': 'Vous ne possédez pas cette annonce.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            },
            function () {
                reserveServices.getReserveInfos(dataAdvert.adv_id)
                    .then(result => {
                        if (result.length != null) {
                            for(i=0 ; i<result.length ; i++){     
                                userReserve[i] = new Reserve(result[i]);
                                }
                                return res.status(200).json({'succes':'Réservations récupérés',userReserve});
                            }
                            else{
                                return res.status(400).json({ 'error': 'Aucune réservation n\'est enregistré.' });
                            }
                        })
                        
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Récupération de l\'annonce impossible.' });
                        });
            }]
        );
    },

    getUserReserve: function (req, res) {
        const reserve = new Reserve(req.body);
        let token = req['headers'].authorization.slice(7);
        var id;
        var name;
        
        userReserve=[];

        if (reserve.res_usr_id == null 
            || reserve.res_usr_mail == null
            ) {
            return res.status(400).json({ 'error': 'veuillez vous connecter.' });
        }
        
        async.waterfall([
            function (next) {
                userServices.getUserCheckToken(token)
                    .then(result => {
                        if (result.length >0) {
                            id =  result[0].usr_id;
                            name =  result[0].usr_mail;
                            next(null);
                        } else {
                            return res.status(200).json({ 'error': 'Utilisateur introuvable.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            },
            function () {
                if(id != reserve.res_usr_id || name != reserve.res_usr_mail){
                    return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                }
                else{
                    reserveServices.getUserReserve(reserve)
                        .then(result => {
                            if (result.length != null) {
                                for(i=0 ; i<result.length ; i++){     
                                    userReserve[i] = new Reserve(result[i]);
                                    }
                                    return res.status(200).json({'succes':'Réservations récupérés',userReserve});
                                }
                                else{
                                    return res.status(400).json({ 'error': 'Aucune réservation n\'est enregistré.' });
                                }
                            })
                            
                            .catch(error => {
                                console.error(error);
                                return res.status(500).json({ 'error': 'Récupération de l\'annonce impossible.' });
                            });
                }
            }]
        );
    },



    getDatebyAdvRes: function (req, res) {
        var reserve = new Reserve(req.body);

        if (reserve.res_adv_id == null 
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        async.waterfall([
            function () {
                reserveServices.getDateResAdv(reserve.res_adv_id)
                    .then(result => {
                        if (result.length != null) { // return date
                            return res.status(200).json({'succes':'Dates liées à l\'annonce récupérés',result});
                        }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Création de la réservation impossible.' });
                        });
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