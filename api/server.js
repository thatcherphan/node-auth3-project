const express = require('express');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "This user api is ALIVE!"})
})

module.exports = server;