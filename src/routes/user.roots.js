const { Router } = require('express');
const userController = require('../controller/user.controller.js');

const router = Router();
const user = '/user';
const userById = user+'/:id';

router.get(user,userController.getUser);
router.get(userById,userController.getUserById);
router.post(user,(userController.createUser));
router.put(userById,userController.modifyUser);
router.patch(userById,userController.modifyPartiallyUser);
router.delete(userById,userController.deleteUser);

module.exports = router;