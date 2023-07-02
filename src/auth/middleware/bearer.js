'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) {
      return next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);

    if (!validUser) {
      return next('Invalid Login');
    }

    req.user = validUser;
    req.token = validUser.token;

    next(); // Call next to proceed to the next middleware/route handler

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}
