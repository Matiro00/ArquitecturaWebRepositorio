const bookService = require('../service/book.service.js');

const createBook = function(req,res, next){
    console.log('Controller level: Procesando la creacion de libro');
    return res.send(bookService.createBook());
}
const getBook = function(req,res, next){
    console.log('Controller level: Procesando la muestra de libros');
    return res.send(bookService.getBook());
}
const getBookById = function(req,res, next){
    console.log('Controller level: Procesando la muestra de libros por id');
    return res.send(bookService.getBookById());
}
const modifyBook = function(req,res, next){
    console.log('Controller level: Procesando la modificacion del libro');
    return res.send(bookService.modifyBook());
}
const modifyPartiallyBook = function(req,res, next){
    console.log('Controller level: Procesando la modificacion parcial del libro');
    return res.send(bookService.modifyPartiallyBook());
}
const deleteBook = function(req,res, next){
    console.log('Controller level: Procesando la eliminacion del libro');
    return res.send(bookService.deleteBook());
}

module.exports = {
    createBook,
    getBook,
    getBookById,
    modifyBook,
    modifyPartiallyBook,
    deleteBook
}