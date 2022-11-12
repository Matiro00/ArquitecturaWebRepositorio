const bookRepository = require('../repository/book.repository.js');
const genericRepository = require('../repository/generic.repository');
const checkoutRepository = require('../repository/checkout.repository.js');

const createBook = async function(book){
    const bookAlreadyRegistred = await bookRepository.getBookByName(book.name);
    if(bookAlreadyRegistred.length == 0){
        await bookRepository.createBook(book);
        const lastBookId = await genericRepository.getLastEntity('books');
        const respuesta = {
            mensaje: 'Se creo el usuario con exito',
            url: 'http://localhost:3000/user/'+lastBookId[0].id
        }
        return respuesta;
    }
    else{
        throw new Error('Ya existe un libro con ese nombre');
    }
}
const getBook = async function(){
    let bookList = await bookRepository.getBook();
    bookList.forEach(book => {
        if(book.isForSale == 1){
            book.isForSale = true;
        }
        else{
            book.isForSale = false;
        }
    });
    return bookList;
}
const getBookById = async function(id){
    const book = await bookRepository.getBookById(id);
    if(book.length != 0){
        if(book.isForSale == 1){
            book.isForSale = true;
        }
        else{
            book.isForSale = false;
        }
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
        const checkUserInCheckout = await checkoutRepository.getCheckoutByUserId(id);
        if(checkUserInCheckout.length == 0){
            await bookRepository.deleteBook(id);
            const respuesta = {
                mensaje: 'Se elimino el libro con exito',
                libro: book
            }
            return respuesta;
        }
        else{
            await bookRepository.deactivateUser(id);
            const respuesta = {
                mensaje: 'Se desactivo el libro para proximas compras con exito',
                usuario: user
            }
            return respuesta;
        }
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