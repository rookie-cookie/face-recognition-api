const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//static database
const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},

		{
			id: '1234',
			name: 'Sally',
			email: 'Sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}

//root route
app.get('/', (req,res) => {
	res.send('this is working');
})

// signin route --> POST = success / fail
app.post('/signin', (req,res) => {
	//res.send('signing in');
	if (req.body.email === database.users[0].email &&
		  req.body.password === database.users[0].password){
		res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
});


app.listen(3000, () => {
	console.log('server has started...');
});


/* ROUTES
/ 					--> res = this is working
/signin				--> POST = success / fail
/register 			--> POST = user
/profile/:userId 	--> GET = user
/image 				--> PUT = user
*/