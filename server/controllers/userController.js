const user = require('../models/models.js')


const userController = {};

userController.verifyUser = (req, res, next) => {
    
      const {email, password} = req.body;

      const queryString = `SELECT first_name FROM accounts WHERE email=$1 AND password=$2`
      
      user.query(queryString, [email, password], (err, result) => {
        if (err) {
          return next({
            log: `userController.verifyUser: ERROR: ${err}`,
            message: {
            err: 'Error occurred in userController.verifyUser. Check server log for more detail',
            },
            status: 400,
          })
        }
        else if(result.rows.length === 0){
          res.locals.info = 'User does not exist'
          return next()
        }else {
          res.locals.info = result.rows[0]
          return next()
        }
      });
  }

module.exports = userController;