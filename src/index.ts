import { app } from './app/app';
import { DataBase } from './data/data';

const DB = new DataBase();

const PORT = process.env.PORT || 5000;

const server = app(DB);

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});