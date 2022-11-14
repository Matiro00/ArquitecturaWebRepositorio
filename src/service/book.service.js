const bookRepository = require('../repository/book.repository.js');
const genericRepository = require('../repository/generic.repository');
const checkoutRepository = require('../repository/checkout.repository.js');
const NotFoundError = require('../errors/notFound.error.js');
const AlreadyCreatedEntity = require('../errors/alreadyCreatedEntity.error.js');

const createBook = async function(book){
    const bookAlreadyRegistred = await bookRepository.getBookByName(book.name);
    if(bookAlreadyRegistred.length == 0){
        await bookRepository.createBook(book);
        const lastBookId = await genericRepository.getLastEntity('books');
        const respuesta = {
            mensaje: 'Se creo el libro con exito',
            url: 'http://localhost:3000/user/'+lastBookId[0].id
        }
        return respuesta;
    }
    else{
        throw new AlreadyCreatedEntity('Ya existe un libro con ese nombre');
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
        if(book[0].isForSale == 1){
            book[0].isForSale = true;
        }
        else{
            book[0].isForSale = false;
        }
        return book;
    }
    else{
        throw new NotFoundError('Libro no encontrado');
    }
}
const modifyBook = async function(book){
    const books = await bookRepository.getBookById(book.id);
    const booksByName = await bookRepository.getBookByName(book.name);
    if(booksByName.length != 0){
        throw new AlreadyCreatedEntity('Ya existe un libro con ese nombre');
    }
    if(books.length != 0){
        book.id = books[0].id;
        await bookRepository.modifyBook(book);
        const respuesta = {
            mensaje: 'Se modifico el libro con exito',
            libro: book
        }
        return respuesta;
    }
    else{
        throw new NotFoundError('Libro no encontrado');
    }
}
const deleteBook = async function(id){
    const book = await bookRepository.getBookById(id);
    if(book.length != 0){
        const checkUserInCheckout = await checkoutRepository.getCheckoutByBookId(id);
        if(checkUserInCheckout.length == 0){
            if(book[0].isForSale == 1){
                book[0].isForSale = true;
            }
            else{
                book[0].isForSale = false;
            }
            await bookRepository.deleteBook(id);
            const respuesta = {
                mensaje: 'Se elimino el libro con exito',
                libro: book
            }
            return respuesta;
        }
        else{
            await bookRepository.deactivateBook(id);
            book[0].isForSale = false;
            const respuesta = {
                mensaje: 'Se desactivo el libro para proximas compras con exito',
                libro: book
            }
            return respuesta;
        }
    }
    else{
        throw new NotFoundError('Libro no encontrado');
    }
}

module.exports = {
    createBook,
    getBook,
    getBookById,
    modifyBook,
    deleteBook
}