const User = require('../models/userModel.js');


const userController = {}

userController.createUser = (req, res, next) => {
  const { username, password } = req.body; //destructuring for security purposes
  User.create({ username: username, password: password })//INSTEAD of doing newUser = new User ({obj}) then .save that--> User.create makes AND saves a new instance of User schema
    .then(user => {

      //create ONCHANGE listener on front end, fetches the current input value from username field, does FindOne, and if the username already exists, it tells them "no" but if their input is unique then it tells them in real time they're good

      //BUILD check for username already existing in DB... 

      //can also set .id = user._id // and .session = true for SSID cookie --> see auth challenge   
      res.locals.user = user;
      return next();
    })
    .catch(err => {
      console.log('the database error: ', err);
      const error = { log: "There was an error creating new user in database." }
      next(error)
    })
};

//NEED TO SET UP BCRYPT....

userController.verifyUser = (req, res, next) => {

  const { username, password } = req.body;


  User.findOne({ username }).exec()
    .then(result => {
      if (password === result.password) {
        res.locals.result = true;
        return next();
      }
      else {
        res.locals.result = false;
        return next()
      }
    })
    .catch(err => {
      const error = { log: "There was an error verifying user login." }
      return next(error);
    })
}

userController.getAllUsers = (req, res, next) => {
  User.find({}, 'username').exec()
    .then(data => {
      res.locals.users = [];
      data.forEach((user) => {
        res.locals.users.push(user.username);
      })
      return next();
    })
    .catch(err => {
      const error = { log: "Failed during userController.getAllUsers." }
      return next(error);
    })
}


userController.addMap = (req, res, next) => {
  const { username, newMap } = req.body;
  const { mapName, mapData } = newMap;

  User.findOne({ username }).exec()
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      console.log('the current maps:', user.savedMaps);
      user.savedMaps[mapName] = mapData;
      user.markModified('savedMaps');
      console.log('the maps after saving: ', user.savedMaps);
      return user.save();
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      const error = { log: "Failed during userController.addMap." }
      return next(error);
    })
}

userController.deleteMap = (req, res, next) => {
  const { username, mapName } = req.body;

  User.findOne({ username }).exec()
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      if (user.savedMaps[mapName]) {
        delete user.savedMaps[mapName];
      }
      else {
        return res.status(404).json({ message: "Map not found in entries" })
      }

      user.markModified('savedMaps');
      return user.save();
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      const error = { log: "Failed during userController.deleteMap." }
      return next(error);
    })
}


userController.shareMap = (req, res, next) => {
  const { username, mapName, mapData } = req.body;

  if (!username || !mapName || !mapData) {
    return res.status(400).json({ message: 'Error: Incomplete data provided.' })
  }

  User.findOne({ username }).exec()
    .then(user => {
      user.savedMaps[mapName] = mapData;
      user.markModified('savedMaps');
      user.sharedMaps[mapName] = mapData;
      user.markModified('sharedMaps');
      return user.save();
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      const error = { log: 'Failed during userController.shareMap' }
      return next(error);
    })
}


userController.unshareMap = (req, res, next) => {
  const { username, mapName } = req.body

  User.findOne({ username }).exec()
    .then(user => {
      if (!user.sharedMaps[mapName]) {
        return res.status(404).json({ message: 'Error: Could not find entry in database.' })
      }

      delete user.sharedMaps[mapName];
      user.markModified('sharedMaps');
      return user.save();
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      const error = { log: 'Failed during userController.unshareMap' }
      return next(error);
    })
}


userController.addFriend = (req, res, next) => {
  const { username, friend } = req.body;

  User.findOne({ username: friend }).exec()
    .then(friendUser => {
      if (!friendUser) {
        return res.status(404).json({ message: "Friend not found" });
      }

      return User.findOne({ username }).exec();
    })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.friendList.push(friend);
      user.markModified('friendList');
      return user.save();
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      const error = { log: "Failed during userController.addFriend.", message: err.message };
      return next(error);
    });
}


userController.removeFriend = (req, res, next) => {
  const { username, friend } = req.body;


  User.findOne({ username }).exec()
    .then(user => {
      user.friendList.forEach((entry, index) => {
        if (entry === friend) {
          user.friendList.splice(index, 1);
          user.markModified('friendList');
          return user.save();
        }
      })
    })
    .then(() => {
      return next();
    })
    .catch(err => {
      const error = { log: "Failed during userController.deleteFriend." }
      return next(error);
    })
}


userController.getFriendMaps = (req, res, next) => {
  const { username } = req.params;

  User.findOne({ username }).exec()
    .then(user => {
      console.log(`found the user: ${user}`)
      const friendPromises = user.friendList.map((friendUsername) => {
        return User.findOne({ username: friendUsername }).exec();
      });

      return Promise.all(friendPromises);
    })
    .then(friendsData => {
      const friendMaps = {};

      friendsData.forEach(friend => {
        friendMaps[friend.username] = friend.sharedMaps;
      });

      res.locals.friendListMaps = friendMaps;
      console.log('all the friendly maps: ', res.locals.friendListMaps);
      return next();
    })
    .catch(err => {
      const error = { log: 'Failed during userController.getFriendMaps.' };
      return next(error);
    })
}


userController.getPrivateMaps = (req, res, next) => {
  const { username } = req.params;

  User.findOne({ username }).exec()
    .then(user => {
      console.log(`Found the user ${user}`)
      const mapCollection = {};
      for (let key in user.savedMaps) {
        mapCollection[key] = user.savedMaps[key];
      }
      res.locals.mapCollection = mapCollection;
      console.log('the maps, hopefully.', res.locals.mapCollection);
      return next()
    })
    .catch(err => {
      const error = { log: 'Failed during userController.getFriendMaps.' };
      return next(error);
    })
}




module.exports = userController