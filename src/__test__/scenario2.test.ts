import request from 'supertest';
import { server } from '../app/app';

describe('Scenario 2', () => {
  const agent = request.agent(server);

  describe('Try to open an unknown route', () => {
    test('It should respond with status 400 (Unknown route)', async () => {
      const response = await agent.get('/some/route');

      expect(response.body.message).toEqual('Unknown route');
      expect(response.statusCode).toBe(404);
    })
  })

  describe('Try to get user by invalid user id', () => {
    test('It should respond with status 400 (invalid id (not uuid))', async () => {
      const response = await agent.get('/api/users/invalid-id');

      expect(response.body.message).toEqual('UserId is invalid (not uuid)');
      expect(response.statusCode).toBe(400);
    })
  })

  describe('Try to update user by invalid user id', () => {
    test('It should respond with status 400 (invalid id (not uuid))', async () => {
      const response = await agent.put('/api/users/invalid-id');

      expect(response.body.message).toEqual('UserId is invalid (not uuid)');
      expect(response.statusCode).toBe(400);
    })
  })

  describe('Try to delete user by invalid user id', () => {
    test('It should respond with status 400 (invalid id (not uuid))', async () => {
      const response = await agent.del('/api/users/invalid-id');

      expect(response.body.message).toEqual('UserId is invalid (not uuid)');
      expect(response.statusCode).toBe(400);
    })
  })

  describe('Try to create user without sending data', () => {
    test('It should respond with status 500 (internal server error)', async () => {
      const response = await agent.post('/api/users');

      expect(response.statusCode).toBe(500);
    })
  })
})