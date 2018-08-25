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
	res.send(database.users);
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


// register route --> POST = user
app.post('/register', (req,res) => {
	const {email, name, password} = req.body;
	database.users.push({
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()		
	});
	res.json(database.users[database.users.length- 1]);
})

//profile/:userId route	--> GET = user
app.get('/profile/:id', (req,res) => {
	const {id} = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
		found = true;
		return res.json(user);
	} 
	})
	if (!found) {
		res.status(400).json('user does not exist');
	}
})

//image route --> PUT = user
app.post('/image', (req,res) => {
	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
		found = true;
		user.entries++;
		return res.json(user.entries);
	} 
	})
	if (!found) {
		res.status(400).json('user does not exist');
	}
})


app.listen(3000, () => {
	console.log('server has started...');
});


/* ROUTES
/ 								--> res = this is working
/signin						--> POST = success / fail
/register 				--> POST = user
/profile/:userId 	--> GET = user
/image 						--> POST = user
*/