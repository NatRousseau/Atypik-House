const commentaryServices = require ('../services/commentary_services.ts');
const userServices = require ('../services/user_services.ts');

const adminUtils = require('../utils/admin.utils');
const async = require('async');
const Commentary = require('../models/commentary');


module.exports = {

    // =========================    CREATE  ========================= //

    createCommentary: function (req, res) {
        var commentary = new Commentary(req.body);

         
        if (commentary.com_text == null 
            || commentary.com_adv_id == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (commentary.com_usr_id == null
            || commentary.com_usr_firstName == null
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecter.' });
        }
       
        if (commentary.com_text.length > 255) {
            return res.status(400).json({ 'Erreur': 'Le commentaire est trop long.' });
        }

        if (commentary.com_text.length <1 ) {
            return res.status(400).json({ 'Erreur': 'Le commentaire est trop court.' });
        }
        

        async.waterfall([
            function (next) {
                userServices.getUserIsRegister(commentary.com_usr_id,commentary.com_usr_firstName,commentary.com_usr_lastName)
                    .then(result => {
                        if (result.length <1) {
                            return res.status(200).json({ 'error': 'Vous n\'êtes pas enregistré ou votre compte n\'existe plus.' });
                        }
                        else{
                            commentary.com_id = null;
                            next(null)
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            },
            function () {
                commentaryServices.createCommentary(commentary)
                    .then(result => {
                        if (result.rowCount === 1) { 
                            return res.status(200).json({'succes': 'Commentaire créée'});
                        } else {
                            return res.status(400).json({ 'error': 'Le commentaire n\'as pus être enregistré. ' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Création du commentaire impossible.' });
                    });
            }]
        );
    },


    // =========================    UPDATE  ========================= //

    

    // =========================    DELETE  ========================= //

    deleteCommentary: function (req, res) {
        var commentary = new Commentary(req.body);
        var token = req['headers'].authorization.slice(7);

        if (commentary.com_id == null 
            || commentary.com_adv_id == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (commentary.com_usr_id == null 
            ) {
            return res.status(400).json({ 'error': 'Veuillez vous connecter.' });
        }
    
        async.waterfall([
            function (next) {
            adminUtils.adminBypass(token)
                .then(result => {
                    if (result.length <0) {
                        return res.status(200).json({ 'error': 'Une erreur est survenue dans le processus de suppression.' });
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
            function (next) {
                if(isAdmin[0]!= null && isAdmin[1]=="Admin"){ //TO DO : si le client demande plusieurs roles , adapter comparatif à liste de roles
                    next(null);
                }
                else{
                    commentaryServices.getCommentaryOwner(commentary)
                        .then(result => {
                            if (result.length <1) {
                                return res.status(200).json({ 'error': 'Vous n\'êtes pas le propriétaire du commentaire, ou celui-ci n\'existe plus.' });
                            }
                            else{
                                next(null)
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                        });
                };
            },
            function () {
                commentaryServices.deleteCommentary(commentary)
                    .then(result => {
                        if (result.length > 0) { 
                            return res.status(200).json({'succes': 'Commentaire supprimé'});
                        } else {
                            return res.status(400).json({ 'error': 'Le commentaire n\'as pus être supprimé ou à déjà été supprimé. ' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Suppression du commentaire impossible.' });
                    });
            }]
        );
    },

    // =========================    GET  ========================= //
   
    getCommentarybyAdvert: function (req, res) {
        var commentary = new Commentary(req.body);
        var selectedCommentary;

        if (commentary.com_adv_id == null 
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }
    
        async.waterfall([
            function () {
                commentaryServices.getCommentarybyAdvert(commentary)
                    .then(result => {
                        if (result.length >0) {   
                            selectedCommentary = result;
                            return res.status(200).json({'succes':'Commentaires récupérés',selectedCommentary});
                        }
                        else {
                            return res.status(200).json({ 'error': 'Aucun commentaire correspondant.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Aucun commentaire ne correspond à l\'annonce sélectionné.' });
                    });
            }]
        );

    },


}