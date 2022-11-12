const userRepository = require('../repository/user.repository.js');
const bookRepository = require('../repository/book.repository.js');
const checkoutRepository = require('../repository/checkout.repository.js');
const checkoutItemRepository = require('../repository/checkoutItem.repository.js');
const genericRepository = require('../repository/generic.repository');
const NotFoundError = require('../errors/notFound.error.js');
const DeactivatedEntity = require('../errors/deactivatedEntity.error');
const OutOfStockError = require('../errors/outOfStock.error.js');

const createCheckout = async function(checkout){
    let totalPrice=0;
    let idCheckout;
    const user = await userRepository.getUserById(checkout.idUser); 
    if(user.length == 0){
        throw new NotFoundError('Id de usuario invalido');
    }
    if(user[0].isActive == 0){
        throw new DeactivatedEntity('El usuario ingresado esta desactivado');
    }
    for (let i = 0; i < checkout.items.length; i++) {
        const book = await bookRepository.getBookById(checkout.items[i].id);
        if(book.length != 0 && book[0].isForSale && book[0].amount-checkout.items[i].amount>0){
            totalPrice = totalPrice + book[0].price;
        }
        else{
            if(book.length == 0){
                throw new NotFoundError('El libro ingresado no existe');
            }
            else{
                if(!book[0].isForSale){
                    throw new DeactivatedEntity('El libro '+book[0].name+' no esta disponible para su venta');
                }
                else{
                    throw new OutOfStockError('El libro '+book[0].name+' no tiene suficiente stock');
                }
            }
        }
    }
    for (let i = 0; i < checkout.items.length; i++) {
        const book = await bookRepository.getBookById(checkout.items[i].id);
        await bookRepository.reduceAmount(book[0].id,checkout.items[i].amount);
    }
    checkout.totalPrice = totalPrice;
    await checkoutRepository.createCheckout(checkout);
    idCheckout = await genericRepository.getLastEntity('checkouts');
    checkout.items.forEach(async checkoutItem => {
        await checkoutItemRepository.createCheckoutItem(checkoutItem.id,idCheckout[0].id, checkoutItem.amount);
    });
    const respuesta = {
        mensaje: 'Se creo el comprobante con exito',
        url: 'http://localhost:3000/checkout/'+idCheckout[0].id
    }
    return respuesta;
}
const getCheckout = async function(){
    const checkoutList = await checkoutRepository.getCheckout();
    for (let i = 0; i < checkoutList.length; i++) {
        checkoutList[i].items = await checkoutItemRepository.getCheckoutItemByIdCheckout(checkoutList[i].id);
    }
    return checkoutList;
}
const getCheckoutById = async function(id){
    const checkoutList = await checkoutRepository.getCheckoutById(id);
    if(checkoutList.length == 0){
        throw new NotFoundError('Id del comprobante invalido');
    }
    checkoutList[0].items = await checkoutItemRepository.getCheckoutItemByIdCheckout(checkoutList[0].id);
    return checkoutList;
}
const modifyCheckout = async function(checkout){
    let checkoutResult = await checkoutRepository.getCheckoutById(checkout.id);
    if(checkoutResult.length == 0){
        throw new NotFoundError('Id del comprobante invalido');
    }
    const userResult = await userRepository.getUserById(checkout.idUser);
    if(userResult.length == 0){
        throw new NotFoundError('Usuario no encontrado');
    }
    if(userResult[0].isActive == 0){
        throw new DeactivatedEntity('El usuario ingresado se encuentra desactivado');
    }
    checkout.id = checkoutResult[0].id;
    await checkoutRepository.modifyCheckout(checkout);
    checkoutResult = await checkoutRepository.getCheckoutById(checkout.id);
    const respuesta = {
        mensaje: 'Se modifico el usuario con exito',
        checkout: checkoutResult[0]
    }
    return respuesta;
    
}

const deleteCheckout = async function(id){
    const checkout = await checkoutRepository.getCheckoutById(id);
    if(checkout.length != 0){
        await checkoutItemRepository.deleteCheckoutItem(id);
        await checkoutRepository.deleteCheckout(id);
        const respuesta = {
            mensaje: 'Se elimino el comprobante con exito',
            libro: checkout
        }
        return respuesta;
    }
    else{
        throw new NotFoundError('Id del comprobante invalido');
    }
}

module.exports = {
    createCheckout,
    getCheckout,
    getCheckoutById,
    modifyCheckout,
    deleteCheckout
}