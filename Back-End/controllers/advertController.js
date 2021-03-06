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
            || advert.adv_adress == null
            || advert.adv_city == null
            || advert.adv_postal == null
            || advert.adv_price == null
            || advert.adv_describe == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (advert.adv_usr_id == null 
            || advert.adv_usr_mail == null
            || advert.adv_usr_phone == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecter.' });
        }
       
        if (advert.adv_name.length > 255) {
            return res.status(400).json({ 'Erreur': 'Le nom de l\'annonce est trop long.' });
        }

        if (advert.adv_name.length <1 ) {
            return res.status(400).json({ 'Erreur': 'Le nom de l\'annonce est trop court.' });
        }

        if (advert.adv_describe.length > 255) {
            return res.status(400).json({ 'Erreur': 'La description de l\'annonce est trop longue.' });
        }

        if (advert.adv_adress.length > 255) {
            return res.status(400).json({ 'Erreur': 'L\'adresse est trop longue.' });
        }

        if (advert.adv_city.length > 255) {
            return res.status(400).json({ 'Erreur': 'Le nom de ville est trop long.' });
        }

        async.waterfall([
            function (next) {
                advertServices.getAdvertByName(advert)
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
            || advert.adv_adress == null
            || advert.adv_city == null
            || advert.adv_postal == null
            || advert.adv_price == null
            || advert.adv_describe == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (advert.adv_usr_id == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecter.' });
        }

        if (advert.adv_name.length > 255) {
            return res.status(400).json({ 'Erreur': 'Le nom de l\'annonce est trop long.' });
        }

        if (advert.adv_describe.length > 255) {
            return res.status(400).json({ 'Erreur': 'La description de l\'annonce est trop longue.' });
        }


        if (advert.adv_name.length <1 ) {
            return res.status(400).json({ 'Erreur': 'Le nom de l\'annonce est trop court.' });
        }


        if (advert.adv_adress.length > 255) {
            return res.status(400).json({ 'Erreur': 'L\'adresse est trop longue.' });
        }

        if (advert.adv_city.length > 255) {
            return res.status(400).json({ 'Erreur': 'Le nom de ville est trop long.' });
        }

        if (advert.adv_id == null
            ) {
            return res.status(400).json({ 'error': 'Aucune annonce sélectionnée.' });
        }
        
        async.waterfall([
            function (next) {
                advertServices.getAdvertOwner(advert.adv_id,advert.adv_usr_id)
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
                advertServices.updateAdvert(advert)
                    .then(result => {
                        if (result != 1) {
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

    getAdvertbyId: function (req, res) {
        const dataAdvert = req.body;
        var selectedAdvert;

       if (dataAdvert.adv_id == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez sélectionner une annonce' });
        }
        
        async.waterfall([
            function () {
                advertServices.getAdvertByID(dataAdvert)
                    .then(result => {
                        if (result.length >0) {   
                            selectedAdvert = result;
                            return res.status(200).json({'succes':'Annonces récupérés',selectedAdvert});
                        }
                        else {
                            return res.status(200).json({ 'error': 'Aucune annonce correspondante.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Aucune correspondance à l\'annonce sélectionné.' });
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

        async.waterfall([
            function () {
                advertServices.getAdvertByTimestamp(min,max)
                    .then(result => {
                        if (result.length != null) {
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