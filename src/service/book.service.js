const bookRepository = require('../repository/book.repository.js');

const createBook = async function(book){
    const bookCreated = await bookRepository.createBook(book);
    const respuesta = {
        mensaje: 'Se creo el libro con exito',
        url: 'http://localhost:3000/book/'+bookCreated.insertId
    }
    return respuesta;
}
const getBook = async function(){
    const books = await bookRepository.getBook();
    if(books.length != 0){
        return books;
    }
    else{
        throw new Error('Libro no encontrado');
    }
}
const getBookById = async function(id){
    const book = await bookRepository.getBookById(id);
    if(book.length != 0){
        return book;
    }
    else{
        throw new Error('Libro no encontrado');
    }
}
const modifyBook = async function(book){
    const books = await bookRepository.getBookById(book.id);
    if(books.length != 0){
        await bookRepository.modifyBook(book);
        const respuesta = {
            mensaje: 'Se modifico el usuario con exito',
            libro: book
        }
        return respuesta;
    }
    else{
        throw new Error('Libro no encontrado');
    }
}
const deleteBook = async function(id){
    const book = await bookRepository.getBookById(id);
    if(book.length != 0){
        await bookRepository.deleteBook(id);
        const respuesta = {
            mensaje: 'Se elimino el usuario con exito',
            libro: book
        }
        return respuesta;
    }
    else{
        throw new Error('Libro no encontrado');
    }
}

module.exports = {
    createBook,
    getBook,
    getBookById,
    modifyBook,
    deleteBook
}