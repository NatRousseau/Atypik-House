const async = require('async');
const User = require('../models/user');

const bcrypt = require('bcrypt');


const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;  // TO DO : edit mail regex ; pwd : done

module.exports = {

    // =========================    CREATE  ========================= //

    register: function (req, res) {
        console.log(req.body);
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
            return res.status(400).json({ 'Erreur': 'Adresse mail trop longue.' });
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
                User.getUserByMail(user.usr_mail)
                    .then(result => {
                        console.log(result)
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
            function (hashedPassword, next) {
                user.usr_password = hashedPassword;
                User.createUser(user.usr_mail, user.usr_password)
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


    // =========================    DELETE  ========================= //

}

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
