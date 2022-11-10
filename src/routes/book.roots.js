const { Router } = require('express');
const bookController = require('../controller/book.controller.js');

const router = Router();
const book = '/book';
const bookById = book+'/:id';

router.get(book,bookController.getBook);
router.get(bookById,bookController.getBookById);
router.post(book,bookController.createBook);
router.put(bookById,bookController.modifyBook);
router.patch(bookById,bookController.modifyPartiallyBook);
router.delete(bookById,bookController.deleteBook);

module.exports = router;