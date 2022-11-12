const userRepository = require('../repository/user.repository.js');
const bookRepository = require('../repository/book.repository.js');
const checkoutRepository = require('../repository/checkout.repository.js');
const checkoutItemRepository = require('../repository/checkoutItem.repository.js');
const genericRepository = require('../repository/generic.repository');

const createCheckout = async function(checkout){
    let totalPrice;
    let idCheckout;
    const user = await userRepository.getUserById(checkout.idUser); 
    if(user.length == 0){
        throw new Error('Id de usuario invalido');
    }
    for (let i = 0; i < checkout.items.length; i++) {
        const book = await bookRepository.getBookById(checkout.items[i].id);
        if(book.length != 0 && book[0].isForSale && book[0].amount-1>0){
            totalPrice =+ book[0].price;
            await bookRepository.reduceAmount(book[0].id);
        }
        else{
            if(book.length != 0){
                throw new Error('El libro ingresado no existe');
            }
            else{
                throw new Error('El libro ingresado no esta disponible');
            }
        }
    }
    checkout.totalPrice = totalPrice;
    await checkoutRepository.createCheckout(checkout);
    idCheckout = await genericRepository.getLastEntity('checkouts');
    checkout.items.forEach(async checkoutItem => {
        await checkoutItemRepository.createCheckoutItem(checkoutItem.id,idCheckout[0].id);
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
        throw new Error('Id del comprobante invalido');
    }
    checkoutList[0].items = await checkoutItemRepository.getCheckoutItemByIdCheckout(checkoutList[0].id);
    return checkoutList;
}
const modifyCheckout = async function(checkout){
    console.log(checkout)
    let checkoutResult = await checkoutRepository.getCheckoutById(checkout.id);
    if(checkoutResult.length == 0){
        throw new Error('Id del comprobante invalido');
    }
    if(await userRepository.getUserById(checkout.idUser).length == 0){
        throw new Error('Id del usuario invalido');
    }
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
        throw new Error('Id del comprobante invalido');
    }
}

module.exports = {
    createCheckout,
    getCheckout,
    getCheckoutById,
    modifyCheckout,
    deleteCheckout
}