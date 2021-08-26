const activityServices = require ('../services/activity_services.ts');
const advertServices = require ('../services/advert_services.ts');

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
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecter.' });
        }
       
        if (activity.act_describe.length > 255) {
            return res.status(400).json({ 'Erreur': 'La description est trop longue.' });
        }

        if (activity.act_describe.length <1 ) {
            return res.status(400).json({ 'Erreur': 'La description est trop courte.' });
        }
        

        if (activity.act_adress.length > 255) {
            return res.status(400).json({ 'Erreur': 'L\'adresse est trop longue.' });
        }

        if (activity.act_adress.length < 1) {
            return res.status(400).json({ 'Erreur': 'L\'adresse est trop courte.' });
        }

        if (activity.act_city.length > 255) {
            return res.status(400).json({ 'Erreur': 'Le nom de ville est trop long.' });
        }

        async.waterfall([
            function (next) {
                advertServices.getAdvertOwner(activity.act_adv_id,activity.act_usr_id)
                    .then(result => {
                        if (result.length <1) {
                            return res.status(200).json({ 'error': 'Vous n\'êtes pas le propriétaire de l\'annonce, ou celle-ci n\'existe plus.' });
                        }
                        else{
                            activity.act_id = null;
                            next(null)
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
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