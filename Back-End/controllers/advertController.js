const advertServices = require ('../services/advert_services.ts');

const async = require('async');
const Advert = require('../models/advert');


module.exports = {

    // =========================    CREATE  ========================= //

    createAdvert: function (req, res) {
        var advert = new Advert(req.body);

        if (advert.adv_name == null || advert.adv_type == null || advert.adv_tenants || advert.adv_status
            ) {
            return res.status(400).json({ 'error': 'Paramètres manquants.' });
        }

        if (advert.adv_usr_id == null) {
            return res.status(400).json({ 'error': '' });
        }
       

        async.waterfall([
            function (next) {
                advertServices.createAdvert(advert.adv_name, advert.adv_type, advert.adv_tenants, advert.adv_usr_id, advert.adv_status)
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


    // =========================    GET  ========================= //
   
    login: function (req, res) {
        const dataLogin = req.body;

        console.log(dataLogin);

        if (dataLogin.usr_mail == null
            || dataLogin.usr_password == null
            ) {
                console.log(dataLogin.usr_mail,dataLogin.usr_password);
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
                        console.log(result);
                        if (result === 1) {
                            console.log(user);
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

    

}