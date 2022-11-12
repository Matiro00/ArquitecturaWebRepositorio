const Checkout = require('../model/checkout.js');
const checkoutService = require('../service/checkout.service.js');
const DeactivatedEntity = require('../errors/deactivatedEntity.error.js');
const NotFoundError = require('../errors/notFound.error.js');
const OutOfStockError = require('../errors/outOfStock.error.js');
const createCheckout = async function(req,res, next){
    if(req.session.userLogged){
        try{
            console.log('Controller level: Procesando la creacion del checkout');
            const checkout = new Checkout(null,req.body.idUser,req.body.items,req.body.date,0);
            return res.send(await checkoutService.createCheckout(checkout));
        }
        catch(err){
            if(err instanceof DeactivatedEntity || err instanceof OutOfStockError){
                res.status(400).json({mensaje: err.message});
            }
            else if(err instanceof NotFoundError){
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
const getCheckout = async function(req,res, next){
    if(req.session.userLogged){
        console.log('Controller level: Procesando la muestra del checkout');
        return res.send(await checkoutService.getCheckout());
    }
    else{
        res.status(401).json({mensaje: 'Se necesita loggearse'});
    }
}
const getCheckoutById = async function(req,res, next){
    if(req.session.userLogged){
        try{
            console.log('Controller level: Procesando la muestra del checkout por id');
            return res.send(await checkoutService.getCheckoutById(req.params.id));
        }
        catch(err){
            res.status(404).json({mensaje: err.message});
        }
    }
    else{
        res.status(401).json({mensaje: 'Se necesita loggearse'});
    }
}
const modifyCheckout = async function(req,res, next){
    if(req.session.userLogged){
        try{
            console.log('Controller level: Procesando la modificacion del checkout');
            const checkout = new Checkout(req.params.id,req.body.idUser,null,req.body.date,0);
            return res.send(await checkoutService.modifyCheckout(checkout));
        }
        catch(err){
            if(err instanceof DeactivatedEntity){
                res.status(400).json({mensaje: err.message});
            }
            else if(err instanceof NotFoundError){
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

const deleteCheckout = async function(req,res, next){
    if(req.session.userLogged){
    console.log('Controller level: Procesando la eliminacion del checkout');
        try{
            return res.send(await checkoutService.deleteCheckout(req.params.id));
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

module.exports = {
    createCheckout,
    getCheckout,
    getCheckoutById,
    modifyCheckout,
    deleteCheckout
}