const criteriaServices = require ('../services/criteria_services.ts');
const advertServices = require ('../services/advert_services.ts');

const adminUtils = require('../utils/admin.utils');
const async = require('async');
const Criteria = require('../models/criteria');


module.exports = {

    // =========================    CREATE  ========================= //

    createCriteria: function (req, res) {
        var criteria = new Criteria(req.body);
        var token = req['headers'].authorization.slice(7);

        if (criteria.cri_name == null 
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        async.waterfall([
            function (next) {
                adminUtils.adminBypass(token)
                    .then(result => {
                        if (result.length <0) {
                            return res.status(200).json({ 'error': 'Une erreur est survenue dans le processus de vérification admin.' });
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
                if(isAdmin[0]!= null && isAdmin[1]=="Admin"){ //TO DO : si le client demande plusieurs roles , adapter comparatif à liste de roles
                    criteriaServices.createCriteria(criteria)
                        .then(result => {
                            console.log(result);
                            if (result.rowcount === 1) {
                                return res.status(200).json({'succes':'Critère ajouté.'});
                            } else { 
                                return res.status(400).json({ 'error': 'Un critère du même nom existe déjà.' });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Création de l\'annonce impossible.' });
                        });
                }
                else{
                    return res.status(200).json({ 'error': 'Vous devez être un administrateur.' });
                }
            }]
        );
    },


    // =========================    UPDATE  ========================= //


    // =========================    DELETE  ========================= //

    deleteCriteria: function (req, res) {
        var criteria = new Criteria(req.body);


        if (criteria.cri_name == null 
            || criteria.cri_id ==null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }


        async.waterfall([
            function (next) {
                adminUtils.adminBypass(token)
                    .then(result => {
                        if (result.length <0) {
                            return res.status(200).json({ 'error': 'Une erreur est survenue dans le processus de vérification admin.' });
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
                if(isAdmin[0]!= null && isAdmin[1]=="Admin"){ //TO DO : si le client demande plusieurs roles , adapter comparatif à liste de roles
                    criteriaServices.deleteCriteria(criteria)
                        .then(result => {
                            console.log(result)
                            if (result.length>0) { 
                                console.log("if");
                                return res.status(400).json({ 'error': 'TRUC.' });
                            } else { 
                                console.log("else");
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Création de l\'annonce impossible.' });
                        });
                    }
                else{
                    return res.status(200).json({ 'error': 'Vous devez être un administrateur.' });
                }
            }]
        );
    },
    // =========================    GET  ========================= //
   
    getCriteria: function (req, res) {

        async.waterfall([
            function () {
                criteriaServices.getCriteria(criteria)
                    .then(result => {
                        if (result.length>0) { 
                            //retourne cri_id & name
                            return res.status(400).json({ 'error': 'Une annonce du même nom existe déjà.' });
                        } else { 
                           
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Création de l\'annonce impossible.' });
                    });
            }]
        );
    },
    

    getAdvertByCriteria: function (req, res) {
        datas = req.body;
        const pagenumber = datas[0]
        var criteria = new Criteria(datas[1]);
        advertByCriteria=[];

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
                function (next) {
                    criteriaServices.getAdvertByCritera(criteria)
                        .then(result => {
                            if (result.length <0) {

                                return res.status(200).json({ 'error': 'JSP MAIS VOILA.' });
                            }
                            else{
                                console.log("CHIBRE");
                                next(null)
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                        });
                },
                function () {
                advertServices.getAdvertWithCriteriaByTimestamp(min,max,adv_id)
                    .then(result => {
                        if (result.length != null) {
                            for(i=0 ; i<result.length ; i++){     
                                advertByCriteria[i] = new Advert(result[i]);
                        }
                            return res.status(200).json({'succes':'Annonces récupérés',advertByCriteria});
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
    },

}