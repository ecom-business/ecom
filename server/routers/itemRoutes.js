const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/getItems', itemController.getItems, (req, res) => {
	res.status(200).json(res.locals.items);
})

router.post('/postItem', itemController.postItem, (req, res) => {
	res.status(200).json(res.locals.items);
})

router.delete('/deleteItem/:id', itemController.deleteItem, (req, res) => {
	res.status(200).json(res.locals.items);
})

module.exports = router;