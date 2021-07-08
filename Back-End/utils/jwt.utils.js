const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const JWT_SIGN_SECRET_ACCESS = 't7f5g4d21s23q6d4d5s6w21c6v5b5b6f6d2w2w3x5c4c5s5s1v2x2w45fgdjdlkl4f5d54s5f4hs';

const EXPIRES_IN = '1h';

module.exports = {
    generateUserToken: function (userData) {
        return jwt.sign({
            userId: userData.usr_id,
            mail: userData.usr_mail,
        },
            JWT_SIGN_SECRET_ACCESS,
            {
                expiresIn: EXPIRES_IN
            })
    },
    getTokkenExpiresIn: function () {
        return EXPIRES_IN;
    },
    // parseAuthorization: function (authorization) {
    //     return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    // },
    generateupdateTokenForUser: function () {
        return randtoken.uid(256);
    },
    isExpired: function (token) {
        return jwt.verify(module.exports.parseAuthorization(token), JWT_SIGN_SECRET_ACCESS, function (err, decoded) {
            if (err) {
                return true;
            }
            return false;
        });
    },
    getHeadersData: function (token) {
        return jwt.verify(module.exports.parseAuthorization(token), JWT_SIGN_SECRET_ACCESS, function (err, decoded) {
            if (err) {
                return err;
            }
            return decoded;
        });
    }
}