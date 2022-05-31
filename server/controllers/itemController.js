const item = require('../models/models');

const itemController = {};

itemController.getItems = (req, res, next) => {
	const query = `SELECT * FROM products`

	item.query(query, ((err ,result) => {
		if(err){
			return next({
        log: `itemController.getItems: ERROR: ${err}`,
        message: {
        err: 'Error occurred in itemController.getItems. Check server log for more detail',
        },
        status: 400,
      })
		}else if(result.rows.length === 0){
			res.locals.items = 'There are no items to display'
			return next()
		}else {
			console.log('Item controller getItems: ', result.rows)
			res.locals.items = result.rows
			return next()
		}
	}))
}

itemController.postItem = (req, res, next) => {
	const { item_name, price, stock } = req.body;
	const query = `
	INSERT INTO products (Item_name, price, stock) 
	VALUES ($1, $2, $3)
	`

	item.query(query, [item_name, price, stock], ((err ,result) => {
		if(err){
			return next({
        log: `itemController.postItem: ERROR: ${err}`,
        message: {
        err: 'Error occurred in itemController.postItem. Check server log for more detail',
        },
        status: 400,
      })
		}
		res.locals.items = 'item has been posted'
		return next()
		
	}))
}

module.exports = itemController;