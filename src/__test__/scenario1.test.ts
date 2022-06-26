import request from 'supertest';
import { app } from '../app/app';
import { DataBase } from '../data/data';

const DB = new DataBase();

const server = app(DB);

describe('Scenario 1', () => {
  const agent = request.agent(server);
  const newUser = {
    username: 'Oleg',
    age: 34,
    hobbies: ['hobby 1', 'hobby 2']
  }

  describe("Get all records with a GET api/users request", () => {
    test("It should respond with an empty array", async () => {
      const response = await agent.get("/api/users");
      expect(response.body).toEqual([]);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('A new object is created by a POST api/users request', () => {
    test("It should respond with newly created user", async () => {
      const response = await agent
        .post('/api/users')
        .send(newUser)
        .set('Accept', 'application/json');
      
      expect(response.body.username).toEqual(newUser.username);
      expect(response.body.age).toEqual(newUser.age);
      expect(response.body.hobbies).toEqual(newUser.hobbies);
      expect(response.statusCode).toBe(201);
    });
  });

  describe('With a GET api/user/{userId} request, we try to get the created record by its id', () => {
    test("It should respond with newly created user", async () => {
      const response = await agent
        .post('/api/users')
        .send(newUser)
        .set('Accept', 'application/json');
    
      const id = response.body.id;
      
      const getResponse = await agent.get(`/api/users/${id}`);
      
      expect(getResponse.body).toEqual(response.body);
      expect(getResponse.statusCode).toBe(200);
    });
  });

  describe('We try to update the created record with a PUT api/users/{userId} request', () => {
    test('It should response with updated user with the same id', async () => {
      const { body } = await agent
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');
      
      const updateUser = {
        ...body,
        age: 50
      };

      const response = await agent
        .put(`/api/users/${body.id}`)
        .send(updateUser)
        .set('Accept', 'application/json');

      expect(response.body.id).toEqual(updateUser.id);
      expect(response.body.username).toEqual(updateUser.username);
      expect(response.body.age).toEqual(updateUser.age);
      expect(response.body.hobbies).toEqual(updateUser.hobbies);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('With a DELETE api/users/{userId} request, we delete the created object by id', () => {
    test('It should return status code 204 (user deleted)', async () => {
      const { body } = await agent
        .post('/api/users')
        .send(newUser)
        .set('Accept', 'application/json');
      
      const response = await agent.del(`/api/users/${body.id}`)

      expect(response.statusCode).toBe(204);
    });
  });

  describe('With a GET api/users/{userId} request, we are trying to get a deleted object by id', () => {
    test(`It should return status code 404 (user with id doesn't exist)`, async () => {
      const { body } = await agent
        .post('/api/users')
        .send(newUser)
        .set('Accept', 'application/json');
      
      await agent.del(`/api/users/${body.id}`);

      const response = await agent.get(`/api/users/${body.id}`);
      
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toEqual(`record with id: ${body.id} doesn't exist`);
    });
  });
})