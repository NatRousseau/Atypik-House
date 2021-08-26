const commentaryServices = require ('../services/commentary_services.ts');

const async = require('async');
const Commentary = require('../models/commentary');


module.exports = {

    // =========================    CREATE  ========================= //

    createCommentary: function (req, res) {
        var commentary = new Commentary(req.body);


        if (commentary.adv_name == null 
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }


        async.waterfall([
            function (next) {
                commentaryServices.getAdvertByName(commentary)
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
                commentaryServices.createCommentary(commentary)
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
     )}

    // =========================    UPDATE  ========================= //

    

    // =========================    DELETE  ========================= //


    // =========================    GET  ========================= //
   
   
}