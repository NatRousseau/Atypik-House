const criteriaServices = require ('../services/criteria_services.ts');
const advertServices = require ('../services/advert_services.ts');
const async = require('async');

module.exports = {

    criteriaStep1: async function(criId){
        var count = 0;
        var res = []
        for(let i=0; i<criId.length;i++){
            await criteriaServices.getAdvertByCritera(criId[i])
                    .then(result => {
                        if (result.length != null) {  
                            res[i] = result;
                            count++;
                        } else {
                            return res.status(200).json({ 'error': 'Impossible de charger les annonces.' });
                        }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                        });
            }
            await (count = criId.length)
            return res;
    },
    criteriaStep2: async function(res){
        var global = [];
        var globalTrier=[];
        var count =0;
        var countglobal= 0;
        for(let i=0; i<res.length;i++){
            for(let r=0; r<res[i].length;r++){
                global[count] = Number(res[i][r].ria_adv_id);
                count++;   
            }  
        }
        await (count = res.length)
        
        function getOccurrence(array, value) {
            var count = 0;
            array.forEach((v) => (v === value && count++));
            return count;
        }
        for(let x=0; x<global.length;x++){
            value = getOccurrence(global,global[x]);
            if(value == count){
                if( globalTrier.includes(global[x])== false ){
                globalTrier[countglobal] = global[x];
                countglobal++;
                }
                else{
                    countglobal++;
                }
            }
        }
        return globalTrier;
    },

    criteriaStep: async function(criId){
        res = await this.criteriaStep1(criId);
        globalTrier = await this.criteriaStep2(res);
        return globalTrier
    },

    criteriAdvertStep: async function(min,max,advIdlist){
    var count = 0;
    var res = []
    for(let i=0; i<advIdlist.length;i++){
        await advertServices.getAdvertWithCriteriaByTimestamp(min,max,advIdlist[i])
                .then(result => {
                    if (result.length != null) {  
                        res[count] = result[0];
                        
                        count++;
                    } else {
                        return res.status(200).json({ 'error': 'Impossible de charger les annonces.' });
                    }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).json({ 'error': 'Impossible de vérifier les identifiants.' });
                    });
        }
        await (count == res.length);
        return res;
    }
    
    
}