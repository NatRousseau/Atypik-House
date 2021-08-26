const activityServices = require ('../services/activity_services.ts');

const async = require('async');
const Activity = require('../models/activity');


module.exports = {

    // =========================    CREATE  ========================= //

    createActivity: function (req, res) {
        var activity = new Activity(req.body);


        if (activity.act_name == null 
            || activity.act_adv_id == null
            || activity.act_adress == null
            || activity.act_city == null
            || activity.act_postal == null
            || activity.act_describe == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (activity.act_usr_id == null 
            || activity.act_usr_mail == null
            || activity.act_usr_phone == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecter.' });
        }


        async.waterfall([
            function (next) {
                activityServices.getAdvertByName(activity)
                    .then(result => {
                        if (result.length>0) { // Nom d'annonce déjà existant
                            return res.status(400).json({ 'error': 'Une annonce du même nom existe déjà.' });
                        } else { // adv_name free
                            advert.adv_id = null;
                            advert.adv_up = false;
                            advert.adv_cri_limit = 2;
                            next(null)
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Création de l\'annonce impossible.' });
                    });
            },
            function () {
                activityServices.createActivity(activity)
                    .then(result => {
                        if (result.rowCount === 1) { 
                            return res.status(200).json({'succes': 'Activité créée'});
                        } else {
                            return res.status(400).json({ 'error': 'L\'activité n\'as pus être enregistré. ' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Création de l\'activité impossible.' });
                    });
            }
        ],
     )}

    // =========================    UPDATE  ========================= //

    

    // =========================    DELETE  ========================= //


    // =========================    GET  ========================= //
   
   
}