const userServices = require ('../services/user_services.ts');

const async = require('async');
const User = require('../models/user');

const jwtUtils = require('../utils/jwt.utils');

const bcrypt = require('bcrypt');

const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;  // TO DO : edit mail regex ; pwd : done

module.exports = {

    // =========================    CREATE  ========================= //

    register: function (req, res) {
        var user = new User(req.body);

        if (user.usr_mail == null
            || user.usr_password == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (!MAIL_REGEX.test(user.usr_mail)) {
            return res.status(400).json({ 'error': 'Adresse mail non valide.' });
        }
        //  RFC 5322 Official Standard , avoid caracters for exemple :   ( {|}~-]+(?:\.[a )

        if (user.usr_mail.length > 255) {
            return res.status(400).json({ 'error': 'Adresse mail trop longue.' });
        }

        // if (user.usr_firstName.length > 255) {
        //     return res.status(400).json({ 'Erreur': 'Le prénom d\'utilisateur est trop long.' });
        // }
        // if (user.usr_lastName.length > 255) {
        //     return res.status(400).json({ 'Erreur': 'Le nom d\'utilisateur est trop long.' });
        // }

        if (!PWD_REGEX.test(user.usr_password)) {
            return res.status(400).json({ 'error': 'Mot de passe non valide ( 4 caracteres min , 1 chiffre , 1 maj , 1 min).' });
        }

        async.waterfall([
            function (next) {
                userServices.getUserByMail(user.usr_mail)
                    .then(result => {
                        if (result.length>0) { // User already exist
                            return res.status(400).json({ 'error': 'Adresse mail déjà utilisée.' });
                        } else { // mail free
                            user.usr_id = null;
                            hashPassword(user.usr_password, (bcryptedPassword) => {
                                next(null, bcryptedPassword);
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Inscription impossible.' });
                    });
            },
            function (hashedPassword) {
                user.usr_password = hashedPassword;
                userServices.createUser(user.usr_mail, user.usr_password)
                    .then(result => {
                        if (result.rowCount === 1) {
                            return res.status(200).json({ 'succes': 'Reussite de l\'enregistrement.' });
                        } else throw Error(result);
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Erreur lors de l\'enregistrement.' });
                    });
            }
        ],
    )},

    // =========================    UPDATE  ========================= //


    updateToken: function (req, res) {
        var updateToken = req.body.usr_refresh_token;

        if (!updateToken) {
            return res.status(498).json({ 'error': 'Pas de update token.' });
        }

        async.waterfall([
            function (next) {
                userServices.getUserByUpdateToken(updateToken)
                    .then(result => {
                        if (result.length > 0) {
                            next(null, result[0])
                        } else {
                            return res.status(498).json({ 'error': 'Clé non trouvée' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Erreur avec la clé provisoire' });
                    });
            },
            function (params, next) {
                var user = new User(params);
                user.usr_access_token = jwtUtils.generateUserToken(user);
                userServices.updateToken(user)
                    .then(result => {
                        if (result === 1) {
                            next(user);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible d\'enregistrer la nouvelle clé provisoire.' });
                    });
            }],
            function (result) {
                var body = {
                    'access_token': result.usr_access_token,
                    'refresh_token': updateToken
                };
                return res.status(201).json(body);
            });
    },

    // =========================    GET  ========================= //
   
    login: function (req, res) {
        const dataLogin = req.body;

        if (dataLogin.usr_mail == null
            || dataLogin.usr_password == null
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }
        
        async.waterfall([
            function (next) {
                userServices.getUserIsLogin(dataLogin.usr_mail)
                    .then(result => {
                        if (result.length != null) {        
                            user = new User(result[0]);
                            next(null,user);
                        } else {
                            return res.status(404).json({ 'error': 'L\'utilisateur n\'existe pas.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
            },
            function (user,next) {
                bcrypt.compare(dataLogin.usr_password, user.usr_password, (err, test) => {
                    if (err) {
                        console.error('Erreur lors de la verification du mot de passe.');
                        console.error(err);
                        return res.status(500).json({ 'error': 'Identifiants non reconnus.' });
                    }
                    else if (!err && test === true) {
                        next(null, user);
                    }
                    else {
                        return res.status(404).json({ 'error': 'Identifiants non reconnus.' });
                    }
                });
            },
            function (user, next) {
                user.usr_access_token = jwtUtils.generateUserToken(user);
                user.usr_refresh_token = jwtUtils.generateupdateTokenForUser();
                user.usr_expires_in = jwtUtils.getTokenExpiresIn();
                userServices.updateAuthToken(user)
                    .then(result => {
                        if (result === 1) {
                            next(user);
                            
                        } else {
                            return res.status(498).json({ 'error': 'Identifiants non reconnus.' });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Erreur lors de l\'attribution du token.' });
                    });
            }],
            function (user) {
                return res.status(200).json({
                    'userId': user.usr_id,
                    'userMail': user.usr_mail,
                    'userFirstName': user.usr_firstName,
                    'userLastName': user.usr_lastName,
                    'access_token': user.usr_access_token,
                    'refresh_token': user.usr_refresh_token
                });
            }
        );
    },

    // =========================    DELETE  ========================= //

    deleteToken: function (req, res) {
        var updateToken = req.body.usr_refresh_token;

        if (updateToken == null) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        async.waterfall([
            function (next) {
                userServices.resetupdateToken(updateToken)
                    .then(result => {
                        if (result === 1) {
                            next(null, result);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de revoquer la clé provisoire' });
                    });
            }],
            function (result) {
                return res.status(201).json({ "success": "La déconnexion à réussie !" });
            });
    }

};

    // ----------------------- INTERN ----------------------- //
    let hashPassword = function (password, callback) {
        bcrypt.hash(password, 5, function (err, bcryptedPassword) {
            if (!err) {
                callback(bcryptedPassword);
            } else {
                return res.status(500).json({ 'error': 'Erreur de chiffrement.' });
            }
        });
    };
