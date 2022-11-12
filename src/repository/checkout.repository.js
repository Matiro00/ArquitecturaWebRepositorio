const database = require('../db/db.js');

const connection = database.DB;

const createCheckout = async function(checkout){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('INSERT INTO checkouts (id, id_user, date, totalPrice) VALUES (null,?,?,?)', 
            [checkout.idUser, checkout.date, checkout.totalPrice],
            function(err,result){
                if(err){
                    console.log(result)
                    return reject(err);
                }
                
                return resolve(result);
            });
        }
        catch(err){
            console.log(err)
            reject(err)
        }
    });
}

const getCheckout = async function(){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT * FROM checkouts', 
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

const getCheckoutById = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT * FROM checkouts WHERE id = ?',
            [id],
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

const getCheckoutByUserId = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT * FROM checkouts WHERE id_user = ?',
            [id],
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

const modifyCheckout = async function(checkout){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('UPDATE checkouts SET id_user = ?, date = ?',
            [checkout.idUser, checkout.date],
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

const deleteCheckout = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('DELETE FROM checkouts WHERE id = ?',
            [id],
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

module.exports = {
    createCheckout,
    getCheckout,
    getCheckoutByUserId,
    getCheckoutById,
    modifyCheckout,
    deleteCheckout
}