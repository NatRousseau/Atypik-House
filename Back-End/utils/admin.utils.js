const userServices = require ('../services/user_services.ts');
const async = require('async');

module.exports = {

    adminBypassStep1: async function(token){
        var rol = 0;
        await userServices.getRole(token)
        .then(result => {
            rol = result[0].usr_rol_id;  
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
        });
        return rol;
    },
    adminBypassStep2: async function(rol){
        var id,name;
        await userServices.getIsAdmin(rol)
        .then(result => {
            if (result.length >0) {
                id =  result[0].rol_id;
                name =  result[0].rol_name;
                }
            })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
        });
        return [id,name];
    },

    adminBypass: async function(token){
        rol = await this.adminBypassStep1(token);
        isAdmin = await this.adminBypassStep2(rol);
        return isAdmin
    }
}