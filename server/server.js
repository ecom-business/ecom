const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const cors = require('cors');

//Middleware 
// module exports = chunk of codes are modules
app.use(express.json());
// lets you view information
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());

const userRouter = require('./routers/userRouter.js');
const itemRouter = require('./routers/itemRoutes.js')

app.use('/users', userRouter)
app.use('/items', itemRouter)


app.use('*', (req, res) => {
	return res
		.status(404)
		.json({ err: 'endpoint requested is not found' });
});

app.use((err, req, res, next) => {
	const defaultErr = {
		log: `Express error handler caught unknown middleware error ${err}`,
		status: 500,
		message: {
			err: 'An error occurred. Please contact the Astro team.',
		},
	};

  const errorObj = Object.assign({}, defaultErr, err);

	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}...`)
})

// for testing
module.exports = app