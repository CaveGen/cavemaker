const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');


const app = express();
const PORT = 3000;


const DB_URI = 'mongodb+srv://staskusscott:iTCnI0Xt8H94Skjz@cluster0.rxxfq3r.mongodb.net/?retryWrites=true&w=majority;'  
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


const userRouter = express.Router();
app.use('/user', userRouter);

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.post('/signup', userController.createUser, (req, res) => {
    //any other middleware needed? I don't think so...
    res.send(`Sign up successful! Welcome, ${res.locals.user.username}, to the wild world of caves`)
});


app.post('/login', userController.verifyUser,  (req, res) => {
   //middleware to check for session cookies needed?
   //cookieController.setSSIDCookie,
    if (res.locals.result === true) {
      res.status(200).send('You logged in sucessfully!');
    } else {
      res.status(401)
    }
  
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





//want to have a global error handler? 