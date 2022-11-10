const userService = require('../service/user.service.js');

const createUser = function(req,res, next){
    console.log('Controller level: Procesando la creacion del usuario');
    return res.send(userService.createUser());
}
const getUser = function(req,res, next){
    console.log('Controller level: Procesando la muestra de usuarios');
    return res.send(userService.getUser());
}
const getUserById = function(req,res, next){
    console.log('Controller level: Procesando la muestra de usuarios por id');
    return res.send(userService.getUserById());
}
const modifyUser = function(req,res, next){
    console.log('Controller level: Procesando la modificacion del usuario');
    return res.send(userService.modifyUser());
}
const modifyPartiallyUser = function(req,res, next){
    console.log('Controller level: Procesando la modificacion parcial del usuario');
    return res.send(userService.modifyPartiallyUser());
}
const deleteUser = function(req,res, next){
    console.log('Controller level: Procesando la eliminacion del usuario');
    return res.send(userService.deleteUser());
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    modifyUser,
    modifyPartiallyUser,
    deleteUser
}