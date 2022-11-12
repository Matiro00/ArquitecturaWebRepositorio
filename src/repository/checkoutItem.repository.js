const database = require('../db/db.js');

const connection = database.DB;

const createCheckoutItem = async function(idBook, idCheckout){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('INSERT INTO checkout_items(id, id_book, id_checkout) VALUES (null,?,?);', 
            [idBook, idCheckout],
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

const getCheckoutItemByIdCheckout = async function(idCheckout){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT books.id,books.name,books.author,books.price FROM checkout_items JOIN books ON checkout_items.id_book=books.id WHERE checkout_items.id_checkout = ?; ', 
            [idCheckout],
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


const deleteCheckoutItem = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('DELETE FROM checkout_items WHERE id_checkout = ?',
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
    createCheckoutItem,
    getCheckoutItemByIdCheckout,
    deleteCheckoutItem
}