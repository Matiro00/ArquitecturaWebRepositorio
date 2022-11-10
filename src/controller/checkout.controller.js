const checkoutService = require('../service/checkout.service.js');

const createCheckout = function(req,res, next){
    console.log('Controller level: Procesando la creacion del checkout');
    return res.send(checkoutService.createCheckout());
}
const getCheckout = function(req,res, next){
    console.log('Controller level: Procesando la muestra del checkout');
    return res.send(checkoutService.getCheckout());
}
const getCheckoutById = function(req,res, next){
    console.log('Controller level: Procesando la muestra del checkout por id');
    return res.send(checkoutService.getCheckoutById());
}
const modifyCheckout = function(req,res, next){
    console.log('Controller level: Procesando la modificacion del checkout');
    return res.send(checkoutService.modifyCheckout());
}
const modifyPartiallyCheckout = function(req,res, next){
    console.log('Controller level: Procesando la modificacion parcial del checkout');
    return res.send(checkoutService.modifyPartiallyCheckout());
}
const deleteCheckout = function(req,res, next){
    console.log('Controller level: Procesando la eliminacion del checkout');
    return res.send(checkoutService.deleteCheckout());
}

module.exports = {
    createCheckout,
    getCheckout,
    getCheckoutById,
    modifyCheckout,
    modifyPartiallyCheckout,
    deleteCheckout
}