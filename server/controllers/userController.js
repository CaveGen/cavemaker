const User = require('../models/userModel.js');


const userController ={}

userController.createUser = (req, res, next) => { 
  const {username, password} = req.body; //destructuring for security purposes
  User.create({username: username, password: password})//INSTEAD of doing newUser = new User ({obj}) then .save that--> User.create makes AND saves a new instance of User schema
    .then(user => {

    //can also set .id = user._id // and .session = true for SSID cookie --> see auth challenge
            
      res.locals.user = user;
      return next();
    })
    .catch (err => {
        const error = {log: "there was an error creating new user in database!"}
        next(err)
    })
  };


userController.verifyUser = (req, res, next) => {

  const {username, password} = req.body;

  //NEED TO SET UP BCRYPT....

  User.findOne({username}).exec()
    .then(result =>{
      if (password === result.password){
        res.locals.verify = true;
        return next();
      }
      else {
        res.locals.verify = false;
        return next()
      }
    })
    .catch (err => {
      const error = {log: 'there was an error verifying user login'}
      return next(error)
    })
}


userController.updateMap = (req, res, next) => {

}



module.exports = userController