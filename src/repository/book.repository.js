const database = require('../db/db.js');

const connection = database.DB;

const createBook = async function(book){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('INSERT INTO books(id, name, author, price, isForSale) VALUES (null,?,?,?,?);', 
            [book.name, book.author, book.price,book.isForSale],
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

const modifyBook = async function(book){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('UPDATE books SET name = ?, author = ?, price = ?, isForSale = ?',
            [book.name, book.author, book.price,book.isForSale],
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

module.exports = {
    createBook,
    getBook,
    getBookById,
    modifyBook,
    deleteBook
}