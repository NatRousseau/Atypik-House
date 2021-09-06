const criteriaServices = require ('../services/criteria_services.ts');

const adminUtils = require('../utils/admin.utils');
const criteriaUtils = require('../utils/criteria.utils');
const async = require('async');
const Criteria = require('../models/criteria');
const Advert = require('../models/advert');
const { nextTick } = require('process');


module.exports = {

    // =========================    CREATE  ========================= //

    createCriteria: function (req, res) {
        var criteria = new Criteria(req.body);
        var token = req['headers'].authorization.slice(7);

        if (criteria.cri_name == null 
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (criteria.cri_name.length > 255) {
            return res.status(400).json({ 'error': 'Nom de critère trop long.' });
        }
        if (criteria.cri_name.length <1 ) {
            return res.status(400).json({ 'error': 'Nom de critère trop court.' });
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
                            if (result != null ) {
                                return res.status(200).json({'succes':'Critère ajouté.'});
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Création du critère impossible.' });
                        });
                }
                else{
                    return res.status(200).json({ 'error': 'Vous devez être un administrateur.' });
                }
            }]
        );
    },

    

    linkCriteriAdvert: function(req, res) {
        datas = req.body;
        var advert = datas.ria_adv_id;
        var limit = datas.adv_cri_limit;
        var criId = datas.ria_cri_id;

        if (criId == null
            || advert == null 
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (criId.length > limit){
            return res.status(400).json({ 'error': 'Le montant de critères sélectionnés dépasse la limte de l\'annonce' })
        }

        async.waterfall([
            function (next) {
                criteriaServices.clearlinkcriteriAdvert(advert)
                    .then(result => {
                        if ( result != null) {
                            next(null);
                        }
                        else{
                            next(null);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Création de l\'annonce impossible.' });
                    });
            },
            function () {
                criteriaUtils.linkcriteriAdvertStep(advert,criId)
                    .then(result => {
                        if (result == criId.length) { 
                            return res.status(200).json({'succes':'Lien des critères à l\'annonce sauvegardés'});
                        } else { 
                            return res.status(400).json({ 'error': 'Aucun critères n\'ont pus êtres récupérés.' });
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

    updateCriteriAdvert:function (req, res) {
        datas = req.body;
        var advert = datas.ria_adv_id;
        var criId = datas.ria_cri_id;
        var token = req['headers'].authorization.slice(7);

        
        async.waterfall([
            function () {
                criteriaServices.getCriteria()
                    .then(result => {
                        if (result.length>0) { 
                            return res.status(200).json({'succes':'Critères récupérés',result});
                        } else { 
                            return res.status(400).json({ 'error': 'Aucun critères n\'ont pus êtres récupérés.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Création de l\'annonce impossible.' });
                    });
            }]
        );
    },

    // =========================    DELETE  ========================= //

    deleteCriteria: function (req, res) {
        var criteria = new Criteria(req.body);
        var token = req['headers'].authorization.slice(7);

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
                            if (result.length>0) { 
                                return res.status(200).json({'succes':'Critère supprimé.'});
                            } else { 
                                return res.status(400).json({ 'error': 'Aucun critère n\'a pus être supprimé.' });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Suppression du critère impossible.' });
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
                criteriaServices.getCriteria()
                    .then(result => {
                        if (result.length>0) { 
                            return res.status(200).json({'succes':'Critères récupérés',result});
                        } else { 
                            return res.status(400).json({ 'error': 'Aucun critères n\'ont pus êtres récupérés.' });
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
        const pagenumber = datas.page
        var criId = datas.cri_id

        advIdlist = [];
        advList = [];

       if (pagenumber == null
            ) {
            return res.status(400).json({ 'error': 'erreur durant la procédure de chargement.' });
        }
        else
        {
            min = pagenumber-10;
            max = pagenumber;

        }

        async.waterfall([
                function (next) {
                    criteriaUtils.criteriaStep(criId)
                        .then(result => {
                             if (result.length != null) {  
                                    advIdlist = result;
                                    next(null);
                            } else {
                                return res.status(200).json({ 'error': 'Aucune annonce ne correspond à ces critères de recherche..' });
                            }
                            })
                            .catch(error => {
                                console.error(error);
                                return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                            });
                },
                function () {
                    criteriaUtils.criteriAdvertStep(min,max,advIdlist)
                        .then(result => {
                            if (result.length != null) {
                                for(i=0 ; i<result.length ; i++){     
                                    advList[i] = new Advert(result[i]);
                            }
                                return res.status(200).json({'succes':'Annonces récupérés',advList});
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