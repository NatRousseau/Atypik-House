const advertServices = require ('../services/advert_services.ts');

const async = require('async');
const Advert = require('../models/advert');


module.exports = {

    // =========================    CREATE  ========================= //

    createAdvert: function (req, res) {
        var advert = new Advert(req.body);

        console.log(advert.adv_name,advert.adv_type,advert.adv_tenants,advert.adv_status );

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


    // =========================    GET  ========================= //
   
    getUserAdvert: function (req, res) {
        const dataAdvert = req.body;
        userAdvert=[];

       if (dataAdvert.adv_usr_id == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connécter.' });
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

    

}