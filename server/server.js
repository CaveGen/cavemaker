const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
//RECAP: Needed to require in cors
const cors = require('cors');


const app = express();
//RECAP: Needed to use invocation of cors.
app.use(cors());
const PORT = 3000;

//RECAP: This URI had a semi-colon at the end of 'majority'. Caused an error that was allowing users to create accounts in DB but would send back global error handler. Moving semi-colon to outside of the string fixed.
const DB_URI = 'mongodb+srv://staskusscott:iTCnI0Xt8H94Skjz@cluster0.rxxfq3r.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.static('public'));

// app.get('/', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });
// app.use(express.static('public'));

// const userRouter = express.Router();
// app.use('/user', userRouter);

//app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/users', userController.getAllUsers, (req, res) => {
  res.status(200).send(res.locals.users);
})

app.post('/signup', userController.createUser, (req, res) => {
  //any other middleware needed? I don't think so...
  res.status(200).json({ success: true, message: `Sign up successful! Welcome, ${res.locals.user.username}, to the wild world of caves` })
});

app.post('/login', userController.verifyUser, (req, res) => {
  //middleware to check for session cookies needed?
  //cookieController.setSSIDCookie,
  if (res.locals.result === true) {
    res.json({ success: true, message: 'You logged in sucessfully!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid user credentials' })
  }

});

app.post('/map/create', userController.addMap, (req, res) => {
  res.status(200).json({ message: 'Map added successfully!', success: true })
})

app.delete('/map/delete', userController.deleteMap, (req, res) => {
  res.status(200).json({ message: 'Map removed!', success: true })
})

app.post('/map/share', userController.shareMap, (req, res) => {
  res.status(200).json({ message: 'Map shared!', success: true })
})

app.delete('/map/unshare', userController.unshareMap, (req, res) => {
  res.status(200).json({ message: 'Map removed from shared!', success: true })
})

app.get('/friendmaps/:username', userController.getFriendMaps, (req, res) => {
  res.status(200).json({ message: 'Maps gathered from friends!', success: true, maps: res.locals.friendListMaps })
})

app.post('/friend/add', userController.addFriend, (req, res) => {
  res.status(200).json({ message: 'Friend added!', success: true })
})

app.delete('/friend/delete', userController.removeFriend, (req, res) => {
  res.status(200).json({ message: 'Friend deleted!', success: true })
})


//Catch-all route handler.
app.use((req, res) => res.status(404).send(`Couldn't find the page you're looking for. . .`));

//Global error handler.
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});