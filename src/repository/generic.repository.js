const database = require('../db/db.js');

const connection = database.DB;

const getLastEntity = (entity) =>{
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT id FROM '+entity+' ORDER BY id DESC LIMIT 1',
            function(err,result){
                if(err){
                    return reject(err);
                }

                return resolve(result);
            });
        }
        catch(err){
            reject(err)
        }
    });
}

module.exports = {getLastEntity};