const userRepository = require('../repository/user.repository.js');
const checkoutRepository = require('../repository/checkout.repository.js');
const genericRepository = require('../repository/generic.repository');
const User = require('../model/user.js');
const DeactivatedUserError = require('../errors/deactivatedEntity.error.js');
const NotFoundError = require('../errors/notFound.error.js');
const AlreadyCreatedEntity = require('../errors/alreadyCreatedEntity.error.js');
const LoginError = require('../errors/login.error.js');


const createUser = async function(user){
    const userAlreadyRegistred = await userRepository.getUserByName(user.name);
    if(userAlreadyRegistred.length == 0){
        await userRepository.createUser(user);
        const lastUserId = await genericRepository.getLastEntity('users');
        const respuesta = {
            mensaje: 'Se creo el usuario con exito',
            url: 'http://localhost:3000/user/'+lastUserId[0].id
        }
        return respuesta;
    }
    else{
        throw new AlreadyCreatedEntity('Ya existe un usuario con ese nombre');
    }
}

const getUser = async function(){
    let userList = await userRepository.getUser();
    userList.forEach(user => {
        if(user.isActive == 1){
            user.isActive = true;
        }
        else{
            user.isActive = false;
        }
    });
    return userList;
}

const getUserById = async function(id){
    const user = await userRepository.getUserById(id);
    if(user.length != 0){
        if(user[0].isActive == 1){
            user[0].isActive = true;
        }
        else{
            user[0].isActive = false;
        }
        return user;
    }
    else{
        throw new NotFoundError('Usuario no encontrado');
    }
}
const modifyUser = async function(user){
    const users = await userRepository.getUserById(user.id);
    const userAlreadyRegistred = await userRepository.getUserByName(user.name);
    console.log(users)
    console.log(userAlreadyRegistred)
    if(userAlreadyRegistred.length != 0){
        throw new AlreadyCreatedEntity('Ya existe un usuario con ese nombre');
    }
    if(users.length != 0){
        user.id= users[0].id;
        await userRepository.modifyUser(user);
        const respuesta = {
            mensaje: 'Se modifico el usuario con exito',
            usuario: user
        }
        return respuesta;
    }
    else{
        throw new NotFoundError('Usuario no encontrado');
    }
}
const deleteUser = async function(id){
    const user = await userRepository.getUserById(id);
    if(user.length != 0){
        const checkUserInCheckout = await checkoutRepository.getCheckoutByUserId(id);
        if(checkUserInCheckout.length == 0){
            await userRepository.deleteUser(id);
            const respuesta = {
                mensaje: 'Se elimino el usuario con exito',
                usuario: user
            }
            return respuesta;
        }
        else{
            await userRepository.deactivateUser(id);
            const respuesta = {
                mensaje: 'Se desactivo el usuario con exito',
                usuario: user
            }
            return respuesta;
        }
        
    }
    else{
        throw new NotFoundError('Usuario no encontrado');
    }
}
const login = async function(req){
    const user = new User(null,req.body.name,null,req.body.password);
    const userLogged =  await userRepository.login(user);
    if(userLogged.length != 0){
        if(userLogged[0].isActive){
            req.session.userLogged = userLogged[0].id;
        }
        else{
            throw new DeactivatedUserError('Error de login: El usuario esta desactivado');
        }
    }
    else{
        throw new LoginError('Error de login: Nombre o contraseña incorrectos');
    }
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    modifyUser,
    deleteUser,
    login,
}