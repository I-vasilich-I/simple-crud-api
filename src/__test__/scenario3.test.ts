import request from 'supertest';
import { server } from '../app/app';

describe('Scenario 3', () => {
  const agent = request.agent(server);

  describe('Try to create user without username', () => {
    test('It should respond with status 400 (wrong data)', async () => {
      const response = await agent
        .post('/api/users')
        .send({ age: 34, hobbies: []})
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('wrong data was passed in request, some/all field(s) is/are absent/invalid')
    })
  })

  describe('Try to create user without age', () => {
    test('It should respond with status 400 (wrong data)', async () => {
      const response = await agent
        .post('/api/users')
        .send({ username: 'Oleg', hobbies: []})
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('wrong data was passed in request, some/all field(s) is/are absent/invalid')
    })
  })

  describe('Try to create user without hobbies', () => {
    test('It should respond with status 400 (wrong data)', async () => {
      const response = await agent
        .post('/api/users')
        .send({ username: 'Oleg', age: 35 })
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('wrong data was passed in request, some/all field(s) is/are absent/invalid')
    })
  })

  describe('Try to create user with wrong username type (not string)', () => {
    test('It should respond with status 400 (wrong data)', async () => {
      const response = await agent
        .post('/api/users')
        .send({ username: 456, age: 35, hobbies: ['hobby 1', 'hobby 2'] })
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('wrong data was passed in request, some/all field(s) is/are absent/invalid')
    })
  })

  describe('Try to create user with wrong age type (not number)', () => {
    test('It should respond with status 400 (wrong data)', async () => {
      const response = await agent
        .post('/api/users')
        .send({ username: 456, age: '35', hobbies: ['hobby 1', 'hobby 2'] })
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('wrong data was passed in request, some/all field(s) is/are absent/invalid')
    })
  })

  describe('Try to create user with wrong hobbies (not an Array)', () => {
    test('It should respond with status 400 (wrong data)', async () => {
      const response = await agent
        .post('/api/users')
        .send({ username: 456, age: '35', hobbies: 'hobby 1, hobby 2' })
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('wrong data was passed in request, some/all field(s) is/are absent/invalid')
    })
  })

  describe('Try to create user with wrong hobbies type (not an string[])', () => {
    test('It should respond with status 400 (wrong data)', async () => {
      const response = await agent
        .post('/api/users')
        .send({ username: 456, age: '35', hobbies: [1, 2, 3, 'hobby'] })
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('wrong data was passed in request, some/all field(s) is/are absent/invalid')
    })
  })
})