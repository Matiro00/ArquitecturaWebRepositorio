const userService = require('../service/user.service.js');
const User = require('../model/user.js');
const DeactivatedUserError = require('../errors/deactivatedEntity.error.js');
const LoginError = require('../errors/login.error.js');
const AlreadyCreatedEntity = require('../errors/alreadyCreatedEntity.error.js');
const NotFoundError = require('../errors/notFound.error.js');

const createUser = async function(req,res, next){
    try{
        console.log('Controller level: Procesando la creacion del usuario');
        const user = new User(null,req.body.name,req.body.email,req.body.password,req.body.isActive);
        res.status(201).json(await userService.createUser(user));
    }
    catch(err){
        if(err instanceof AlreadyCreatedEntity){
            res.status(400).json({mensaje: err.message});
        }
        else{
            res.status(500).json({mensaje: err.message});
        }
    }
}
const getUser = async function(req,res, next){
    if(req.session.userLogged){
    console.log('Controller level: Procesando la muestra de usuarios');
    res.status(200).json(await userService.getUser());
    }
    else{
        res.status(401).json({mensaje: 'Se necesita loggearse'});
    }
}
const getUserById = async function(req,res, next){
    if(req.session.userLogged){
        console.log('Controller level: Procesando la muestra de usuarios por id');
        try{
            res.status(200).json(await userService.getUserById(req.params.id));
        }
        catch(err){
            if(err instanceof NotFoundError){
                res.status(404).json({mensaje: err.message});
            }
            else{
                res.status(500).json({mensaje: err.message});
            }
        }
    }
    else{
        res.status(401).json({mensaje: 'Se necesita loggearse'});
    }
}
const modifyUser = async function(req,res, next){
    if(req.session.userLogged){
        console.log('Controller level: Procesando la modificacion del usuario');
        const user = new User(req.params.id,req.body.name,req.body.email,req.body.password,req.body.isActive);
        console.log(req.body.isActive)
        try{
            res.status(200).json(await userService.modifyUser(user));
        }
        catch(err){
            if(err instanceof NotFoundError){
                res.status(404).json({mensaje: err.message});
            }
            else{
                res.status(500).json({mensaje: err.message});
            }
        }
    }
    else{
        res.status(401).json({mensaje: 'Se necesita loggearse'});
    }
}
const deleteUser = async function(req,res, next){
    if(req.session.userLogged){
        console.log('Controller level: Procesando la eliminacion del usuario');
        try{
            const mensaje = await userService.deleteUser(req.params.id);
            if(req.session.userLogged == req.params.id){
                req.session.destroy();
            }
            res.status(200).json(mensaje);
        }
        catch(err){
            if(err instanceof NotFoundError){
                res.status(404).json({mensaje: err.message});
            }
            else{
                res.status(500).json({mensaje: err.message});
            }
        }
    }
    else{
        res.status(401).json({mensaje: 'Se necesita loggearse'});
    }
}
const login = async function(req,res, next){
    console.log('Controller level: Procesando el login del usuario');
    try{
        await userService.login(req);
        res.status(200).json({mensaje: 'Se logeo con exito'});
    }
    catch(err){
        console.log(err)
        if(err instanceof DeactivatedUserError || err instanceof LoginError){
            res.status(400).json({mensaje: err.message});
        }
        else{
            res.status(404).json({mensaje: err.message});
        }
    }
    res.status(200).json();
}

const logout = async function(req,res, next){
    console.log('Controller level: Procesando el logout del usuario');
    try{
        req.session.destroy();
        res.status(200).json({mensaje: 'Se elimino la sesion con exito'});
    }
    catch (err){
        res.status(500).json({mensaje: err.message});
    }
    res.status(200).json();
}
module.exports = {
    createUser,
    getUser,
    getUserById,
    modifyUser,
    deleteUser,
    login,
    logout,
}