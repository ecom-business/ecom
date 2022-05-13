const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());

const temp = require('./routers/tempRouter.js');

app.use('/api', (req, res) => {
	res.send('hello???')
})

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