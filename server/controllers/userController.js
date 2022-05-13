const user = require('../models/models.js')


const userController = {
	verifyUser: async (req, res, next) => {

    try {

      const {email, password} = req.body;

      console.log('email:', email, "password:", password)
      
      const queryString = `SELECT first_name FROM accounts WHERE email=$1 AND password=$2`
      
      const response = user.query(queryString, [email, password], (err, result) => {
        console.log('this is result', result)
        if (err) {
          next(err)
        } 
        else {
          if (!result.rows.length){
          console.log('inside else')
          return next()
        }
        }
      });
      console.log('out here')
      res.locals.info = response.rows[0]
      next()
    }

    catch(err){
			console.error(err)
			return next({
        log: `userController.verifyUser: ERROR: ${err}`,
        message: {
        err: 'Error occurred in userController.verifyUser. Check server log for more detail',
        },
        status: 400,
      })
    }
  }
}

module.exports = userController;