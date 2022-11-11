const userRepository = require('../repository/user.repository.js');
const User = require('../model/user.js');

const createUser = async function(user){
    const userAlreadyRegistred = await userRepository.getUserByName(user.name);
    if(userAlreadyRegistred.length == 0){
        const userCreated = await userRepository.createUser(user);
        const respuesta = {
            mensaje: 'Se creo el usuario con exito',
            url: 'http://localhost:3000/user/'+userCreated.insertId
        }
        return respuesta;
    }
    else{
        throw new Error('Ya existe un usuario con ese nombre');
    }
}

const getUser = async function(){
    return await userRepository.getUser();
}

const getUserById = async function(id){
    const user = await userRepository.getUserById(id);
    if(user.length != 0){
        return user;
    }
    else{
        throw new Error('Usuario no encontrado');
    }
}
const modifyUser = async function(user){
    const users = await userRepository.getUserById(user.id);
    if(users.length != 0){
        await userRepository.modifyUser(user);
        const respuesta = {
            mensaje: 'Se modifico el usuario con exito',
            usuario: user
        }
        return respuesta;
    }
    else{
        throw new Error('Usuario no encontrado');
    }
}
const deleteUser = async function(id){
    const user = await userRepository.getUserById(id);
    if(user.length != 0){
        await userRepository.deleteUser(id);
        const respuesta = {
            mensaje: 'Se elimino el usuario con exito',
            usuario: user
        }
        return respuesta;
    }
    else{
        throw new Error('Usuario no encontrado');
    }
}
const login = async function(req){
    const user = new User(null,req.body.name,null,req.body.password);
    const userLogged =  await userRepository.login(user);
    if(userLogged.length != 0){
        req.session.userLogged = userLogged[0].id;
    }
    else{
        throw new Error('Error de login: Nombre o contraseña incorrectos');
    }
}
module.exports = {
    createUser,
    getUser,
    getUserById,
    modifyUser,
    deleteUser,
    login
}