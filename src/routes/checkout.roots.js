const { Router } = require('express');
const checkoutController = require('../controller/checkout.controller.js');

const router = Router();
const checkout = '/checkout';
const checkoutById = checkout+'/:id';

router.get(checkout,checkoutController.getCheckout);
router.get(checkoutById,checkoutController.getCheckoutById);
router.post(checkout,checkoutController.createCheckout);
router.put(checkoutById,checkoutController.modifyCheckout);
router.delete(checkoutById,checkoutController.deleteCheckout);

module.exports = router;