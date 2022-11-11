const userService = require('../service/user.service.js');
const User = require('../model/user.js');

const createUser = async function(req,res, next){
    console.log('Controller level: Procesando la creacion del usuario');
    const user = new User(null,req.body.name,req.body.email,req.body.password,req.body.isActive);
    res.status(201).json(await userService.createUser(user));
}
const getUser = async function(req,res, next){
    console.log('Controller level: Procesando la muestra de usuarios');
    res.status(200).json(await userService.getUser());
}
const getUserById = async function(req,res, next){
    console.log('Controller level: Procesando la muestra de usuarios por id');
    try{
        res.status(200).json(await userService.getUserById(req.params.id));
    }
    catch(err){
        res.status(404).json({mensaje: err.message});
    }
}
const modifyUser = async function(req,res, next){
    console.log('Controller level: Procesando la modificacion del usuario');
    const user = new User(req.params.id,req.body.name,req.body.email,req.body.password,req.body.isActive);
    try{
        res.status(200).json(await userService.modifyUser(user));
    }
    catch(err){
        res.status(404).json({mensaje: err.message});
    }
}
const deleteUser = async function(req,res, next){
    console.log('Controller level: Procesando la eliminacion del usuario');
    try{
        res.status(200).json(await userService.deleteUser(req.params.id));
    }
    catch(err){
        res.status(404).json({mensaje: err.message});
    }
}
const login = function(req,res, next){
    console.log('Controller level: Procesando el login del usuario');
    res.status(200).json(userService.login());
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    modifyUser,
    deleteUser,
    login
}