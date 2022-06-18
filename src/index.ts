import dotenv from 'dotenv';
import http from 'http';
import { DataBase } from './data/data';
import { v4Id } from './constants';
import { getReqData, validateData } from './utils/utils';
import { IUser, IUserWithoutId } from './types';

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB = new DataBase();

const server = http.createServer(async (req, res) => {
  // /api/users : GET
  try {
    if (req.url === "/api/users") {
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(DB.users));
      }
  
      if (req.method === "POST") {
        const userDataRaw = await getReqData(req);
        const userData: IUserWithoutId = JSON.parse(userDataRaw);
  
        const isValidData = validateData(userData);
    
        if (!isValidData) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: 'wrong data was passed in request, some/all field(s) is/are absent/invalid' }));
          return;
        }
        
        const user = DB.createUser(userData);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
      }
    }
  
    // /api/users/id
    else if (req.url?.startsWith('/api/users')) {    
      if (req.url?.match(v4Id)) {
        try {
          const id = req.url.split('/')[3];
          const user = DB.getUser(id);
    
          if (!user) {
            throw new Error(`record with id: ${id} doesn't exist`);
          }
    
          // Get user by id
          if (req.method === 'GET') {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
          }
    
          // update user by id
          if (req.method === 'PUT') {
            const userDataRaw = await getReqData(req);
            const userData: IUserWithoutId = JSON.parse(userDataRaw);
            const isValidData = validateData(userData);
    
            if (!isValidData) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: 'wrong data was passed in request, some/all field(s) is/are absent/invalid' }));
              return;
            }
    
            const newUserData: IUser = {id, ...userData };
            const updatedUser = DB.updateUser(newUserData);
            
            if (!updatedUser) {
              throw new Error(`record with id: ${id} doesn't exist`);
            }
    
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updatedUser));
          }
    
          // delete user by id
          if (req.method === 'DELETE') {
            DB.deleteUser(id);
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end();
          }
    
        } catch (error: any) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: error.message }));
        }
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "UserId is invalid (not uuid)" }));
      }
    }
  
  
    // If no route present
    else {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Unknown route" }));
    }
  } catch (error: any) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error.message }));
  }
  
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});