'use strict';

const { users } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin( req , res , next ) {
  try {

    const response = {
     
      id: req.users.id,
      username: req.users.username,
    
      token: req.users.token
    };

    res.status(200).json(response);
} catch (error) {
  console.error(error);
  const statusCode = 403;
  next({ status: statusCode, message: 'Invalid login' });
  res.status(statusCode).send('Invalid login');
}
}
async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(userRecord => userRecord.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}
