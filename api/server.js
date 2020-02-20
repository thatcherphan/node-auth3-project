const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({message: "This user api is ALIVE!"})
})

module.exports = server;