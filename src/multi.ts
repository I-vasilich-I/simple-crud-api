import cluster from 'cluster';
import { app } from './app/app';
import { cpus } from 'os';
import { DataBase } from './data/data';

const PORT = process.env.PORT || 5000;

const numCPUs = cpus().length;
const server = app(new DataBase());

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  server.listen(PORT, () => {
    console.log(`Server thread with process id: ${process.pid} started on port: ${PORT}`)
  });
}