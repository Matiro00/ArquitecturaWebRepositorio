const database = require('../db/db.js');

const connection = database.DB;

const createBook = async function(book){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('INSERT INTO books(id, name, author, price, isForSale, amount) VALUES (null,?,?,?,?,?);', 
            [book.name, book.author, book.price,book.isForSale,book.amount],
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

const getBook = async function(){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT * FROM books',
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

const getBookById = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT * FROM books WHERE id = ?',
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

const getBookByName = async function(name){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT * FROM books WHERE name = ?',
            [name],
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

const modifyBook = async function(book){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('UPDATE books SET name = ?, author = ?, price = ?, isForSale = ?, amount = ? WHERE id = ?',
            [book.name, book.author, book.price,book.isForSale,book.amount,book.id],
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

const reduceAmount = async function(id, amount){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('UPDATE books SET amount = amount - ? WHERE id = ?',
            [amount,id],
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



const deleteBook = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('DELETE FROM books WHERE id = ?',
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

const deactivateBook = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('UPDATE books SET isForSale = 0 WHERE id = ?',
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
    createBook,
    getBook,
    getBookById,
    getBookByName,
    modifyBook,
    deleteBook,
    reduceAmount,
    deactivateBook
}