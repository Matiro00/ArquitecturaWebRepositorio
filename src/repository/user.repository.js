const database = require('../db/db.js');

const connection = database.DB;

const createUser =  function(user){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('INSERT INTO users (id, name, email, password, isActive) VALUES (null,?,?,?,?);',
            [user.name, user.email, user.password,user.isActive],
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

const getUser =  function(){
    return new Promise ((resolve,reject) =>{
        try{
            connection.query('SELECT * FROM users',
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

const getUserById = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT * FROM users WHERE id = ?',
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

const getUserByName = async function(name){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT * FROM users WHERE name = ?',
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

const modifyUser = async function(user){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('UPDATE users SET name = ?, email = ?, password = ?, isActive = ? WHERE id = ?',
            [user.name, user.email, user.password,user.isActive,user.id],
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

const deactivateUser = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('UPDATE users SET isActive = false WHERE id = ?',
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

const deleteUser = async function(id){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('DELETE FROM users WHERE id = ?',
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

const login = async function(user){
    return new Promise ((resolve,reject) =>{
        try{
            connection.execute('SELECT * FROM users WHERE name = ? AND password = ?',
            [user.name, user.password],
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
    createUser,
    getUser,
    getUserById,
    getUserByName,
    modifyUser,
    deleteUser,
    login,
    deactivateUser
}