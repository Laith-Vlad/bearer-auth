'use strict';

process.env.SECRET = "TEST_SECRET";

const { db, users } = require('../../../../../src/auth/models');
const { handleSignin } = require('../../../../../src/auth/router/handlers.js');

beforeAll(async () => {
  await db.sync();
  await users.create({ username: 'test', password: 'test' });
});
afterAll(async () => {
  await db.drop();
});

describe('Testing the signin handler', () => {

  const res = {
    send: jest.fn(() => res),
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  };
  const next = jest.fn();

  test('Should find a User when a `user` is present on the request', async () => {
  let req = {
    users: await users.findOne({ where: { username: 'test' } }),
  };

  await handleSignin(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      id: expect.any(Number),
      username: expect.any(String),
      
      token: expect.any(String),
    })
  );
});

test('Should trigger error handler when no user is present on the request', async () => {
  let req = {};
  jest.clearAllMocks();

  await handleSignin(req, res, next);
  expect(res.status).toHaveBeenCalledWith(403);
  expect(res.send).toHaveBeenCalledWith('Invalid login');
  expect(res.json).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalled();
});
});
