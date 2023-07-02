'use strict';

module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const statusMessage = err.statusMessage || 'Server Error';
  const errorMessage = 'Invalid Login';

  res.status(statusCode);
  res.setHeader('Content-Type', 'text/plain');
  res.send(errorMessage);

  res.end();
};