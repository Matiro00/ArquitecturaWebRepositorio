const Book = require('../model/book.js');
const bookService = require('../service/book.service.js');
const AlreadyCreatedEntity = require('../errors/alreadyCreatedEntity.error.js');
const DeactivatedEntity = require('../errors/deactivatedEntity.error.js');
const NotFoundError = require('../errors/notFound.error.js');

const createBook = async function(req,res, next){
    if(req.session.userLogged){
        try{
            console.log('Controller level: Procesando la creacion de libro');
            const book = new Book(null,req.body.name,req.body.author,req.body.price,req.body.isForSale,req.body.amount);
            return res.status(201).json(await bookService.createBook(book));
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
    else{
        
        res.status(401).json({mensaje: 'Se necesita loggearse'});
    }
}

const getBook = async function(req,res, next){
    if(req.session.userLogged){
        console.log('Controller level: Procesando la muestra de libros');
        return res.status(200).json(await bookService.getBook());
    }
    else{
        res.status(401).json({mensaje: 'Se necesita loggearse'});
    }
}

const getBookById = async function(req,res, next){
    if(req.session.userLogged){
        console.log('Controller level: Procesando la muestra de libros por id');
        try{
            res.status(200).json(await bookService.getBookById(req.params.id));
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

const modifyBook = async function(req,res, next){
    if(req.session.userLogged){
        console.log('Controller level: Procesando la modificacion del libro');
        const book = new Book(req.params.id,req.body.name,req.body.author,req.body.price,req.body.isForSale,req.body.amount)
        try{
            res.status(200).json(await bookService.modifyBook(book));
        }
        catch(err){
            if(err instanceof NotFoundError){
                res.status(404).json({mensaje: err.message});
            }
            if(err instanceof AlreadyCreatedEntity){
                res.status(400).json({mensaje: err.message});
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

const deleteBook = async function(req,res, next){
    if(req.session.userLogged){
        console.log('Controller level: Procesando la eliminacion del libro');
        try{
            res.status(200).json(await bookService.deleteBook(req.params.id));
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
    createBook,
    getBook,
    getBookById,
    modifyBook,
    deleteBook
}