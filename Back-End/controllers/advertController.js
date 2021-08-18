const advertServices = require ('../services/advert_services.ts');

const async = require('async');
const Advert = require('../models/advert');


module.exports = {

    // =========================    CREATE  ========================= //

    createAdvert: function (req, res) {
        var advert = new Advert(req.body);


        if (advert.adv_name == null 
            || advert.adv_type == null 
            || advert.adv_tenants == null
            || advert.adv_status == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (advert.adv_usr_id == null) {
            return res.status(400).json({ 'error': 'Veuillez vous connecter.' });
        }
       

        async.waterfall([
            function (next) {
                advertServices.getAdvertByName(advert)
                    .then(result => {
                        if (result.length>0) { // Nom d'annonce déjà existant
                            return res.status(400).json({ 'error': 'Une annonce du même nom existe déjà.' });
                        } else { // adv_name free
                            advert.adv_id = null;
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
                advertServices.createAdvert(advert)
                    .then(result => {
                        if (result.rowCount === 1) { 
                            return res.status(200).json({'succes': 'Annonce créée'});
                        } else {
                            return res.status(400).json({ 'error': 'L\'annonce n\'as pus être enregistré. ' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Création de l\'annonce impossible.' });
                    });
            }
        ],
    )},

    // =========================    UPDATE  ========================= //

    updateAdvert: function (req, res) {
        var advert = new Advert(req.body);

        if (advert.adv_name == null 
            || advert.adv_type == null 
            || advert.adv_tenants == null
            || advert.adv_status == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

       if (advert.adv_usr_id == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecté.' });
        }

        if (advert.adv_id == null
            ) {
            return res.status(400).json({ 'error': 'Aucune annonce sélectionnée.' });
        }
        
        async.waterfall([
            function () {
                advertServices.updateAdvert(advert)
                    .then(result => {
                        if (result.length != null) {
                            return res.status(200).json({ 'error': 'Erreur lors de la mise à jour.' });
                            
                        } else {
                            return res.status(200).json({'succes':'Annonce mise à jour'});
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            }]
        );
    },

    // =========================    DELETE  ========================= //



    deleteAdvert: function (req, res) {
        var advert = new Advert(req.body);

       if (advert.adv_usr_id == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecté.' });
        }

        if (advert.adv_id == null
            ) {
            return res.status(400).json({ 'error': 'Aucune annonce sélectionnée.' });
        }
        
        async.waterfall([
            function () {
                advertServices.deleteAdvert(advert)
                    .then(result => {
                        if (result.length != null) {
                            return res.status(200).json({'succes':'Annonce supprimé'});
                        } else {         
                            return res.status(200).json({ 'error': 'Erreur lors de la suppression.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            }]
        );
    },

    // =========================    GET  ========================= //
   
    getUserAdvert: function (req, res) {
        const dataAdvert = req.body;
        userAdvert=[];

       if (dataAdvert.adv_usr_id == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecté.' });
        }
        
        async.waterfall([
            function () {
                advertServices.getUserAdvert(dataAdvert)
                    .then(result => {
                        if (result.length != null) {
                            for(i=0 ; i<result.length ; i++){     
                            userAdvert[i] = new Advert(result[i]);
                        }
                            return res.status(200).json({'succes':'Annonces récupérés',userAdvert});
                        } else {
                            return res.status(200).json({ 'error': 'Vous ne possédez pas d\'annonces.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            }]
        );
    },

    getAdvertByTimestamp: function (req, res) {
        const pagenumber = req.body;
        advertByTimestamp=[];

       if (pagenumber.page == null
            ) {
            return res.status(400).json({ 'error': 'erreur durant la procédure de chargement.' });
        }
        else
        {
            min = pagenumber.page-10;
            max = pagenumber.page;

        }
        console.log(min,max);

        async.waterfall([
            function () {
                advertServices.getAdvertByTimestamp(min,max)
                    .then(result => {
                        if (result.length != null) {
                            console.log(result);
                            for(i=0 ; i<result.length ; i++){     
                                advertByTimestamp[i] = new Advert(result[i]);
                        }
                            return res.status(200).json({'succes':'Annonces récupérés',advertByTimestamp});
                        } else {
                            return res.status(200).json({ 'error': 'Impossible de charger les annonces.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible d\'accéder aux annonces.' });
                    });
            }]
        );
    }
    

}