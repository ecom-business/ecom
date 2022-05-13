const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/login', userController.verifyUser, (req, res) => {
	res.status(200).json(res.locals.info)
});

module.exports = router;