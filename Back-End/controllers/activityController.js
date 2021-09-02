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
            }]
        );
    },

    // =========================    UPDATE  ========================= //

    updateActivity: function (req, res) {
        var activity = new Activity(req.body);

         
        if (activity.act_name == null
            || activity.act_id == null 
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
                            next(null)
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            },
            function () {
                activityServices.updateActivity(activity)
                    .then(result => {
                        if (result != 1) { 
                            return res.status(400).json({ 'error': 'L\'activité n\'as pus être mise à jour ou n\'éxiste plus.' });
                        } else {
                            return res.status(200).json({'succes': 'Activité mise à jour'});
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Mise à jour de l\'activité impossible.' });
                    });
            }]
        );
    },    

    // =========================    DELETE  ========================= //


    deleteActivity: function (req, res) {
        var activity = new Activity(req.body);

         
        if (activity.act_id == null 
            || activity.act_adv_id == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (activity.act_usr_id == null 
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecter.' });
        }
    
        async.waterfall([
            function (next) {
                advertServices.getAdvertOwner(activity.act_adv_id,activity.act_usr_id)
                    .then(result => {
                        if (result.length <1) {
                            return res.status(200).json({ 'error': 'Vous n\'êtes pas le propriétaire de l\'annonce, ou celle-ci n\'existe plus.' });
                        }
                        else{
                            next(null)
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            },
            function () {
                activityServices.deleteActivity(activity)
                    .then(result => {
                        if (result.length > 0) { 
                            return res.status(200).json({'succes': 'Activité supprimé'});
                        } else {
                            return res.status(400).json({ 'error': 'L\'activité n\'as pus être supprimé. ' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Suppression de l\'activité impossible.' });
                    });
            }]
        );
    },
    // =========================    GET  ========================= //
   
    getActivityByID: function (req, res) {
        const dataActivity = req.body;
        var selectedActivity;

       if (dataActivity.adv_id == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez sélectionner une annonce' });
        }
        
        async.waterfall([
            function () {
                activityServices.getActivityByID(dataActivity)
                    .then(result => {
                        if (result.length >0) {   
                            selectedActivity = result;
                            return res.status(200).json({'succes':'Activités récupérés',selectedActivity});
                        }
                        else {
                            return res.status(200).json({ 'error': 'Aucune activité correspondante.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Aucune correspondance à l\'annonce sélectionné.' });
                    });
            }]
        );
    },

    getOneActivityByID: function (req, res) {
        const activity = new Activity(req.body);

       if (activity.act_id == null
            || activity.act_adv_id == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez sélectionner une activité.' });
        }
        
        async.waterfall([
            function () {
                activityServices.getOneActivityByID(activity)
                    .then(result => {
                        if (result.length >0) {   
                            return res.status(200).json({'succes':'Activité récupéré:',result});
                        }
                        else {
                            return res.status(200).json({ 'error': 'Aucune activité correspondante.'});
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Aucune correspondance à l\'annonce sélectionné.' });
                    });
            }]
        );
    }
   
}