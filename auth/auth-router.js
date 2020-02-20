const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error adding this user"});
        })
})

router.post('/login', (req, res) => {
    let {username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);

                res.status(200).json({
                    message: `Welcome ${user.username} to Thatcher's API!!`,
                    token: token
                });
            } else {
                res.status(401).json({message: "You shall not pass! (invalid credential)"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Cannot log this user in"})
        })
})

function genToken(user) {
    const payload = {
      userid: user.id,
      username: user.username,
      role: user.department
      //other things: right? 
    };
  
    const options = {
      expiresIn: '1h'
    };

    const token = jwt.sign(payload, secrets.jwtSecret, options);
  
    return token;
  }

module.exports = router;