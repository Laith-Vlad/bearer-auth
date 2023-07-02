'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js'); // Change "user" to "users"

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError(res);
  }

  const basic = req.headers.authorization.split(' ').pop(); 

  try {
    const decodedValues = base64.decode(basic);
    const [username, password] = decodedValues.split(':').map(value => value.trim());
    console.log('username and pass', username, password);
    
    try {
      req.users = await users.authenticateBasic(username, password);
      next();
    } catch (error) {
      console.error(error);
      res.status(403).send('Invalid Login');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid credentials format');
    return;
  }
};

function base64Decode(str) {
  try {
    return base64.decode(str);
  } catch (error) {
    if (error.name === 'InvalidCharacterError') {
      throw new Error('Invalid character: the string to be decoded is not correctly encoded.');
    }
    throw error;
  }
}

function _authError(res) {
  res.status(403).send('Invalid login');
}
