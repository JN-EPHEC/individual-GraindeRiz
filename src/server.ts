import express from 'express';
import type { Request, Response } from 'express';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import rootRoutes from './routes/rootRoutes.js';
import nameRoutes from './routes/nameRoutes.js'
import sequelize from './config/database.js';


const app = express();
const port = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected.");

    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}.`);
    });
  }
  catch (error){
    console.error("Unable to connect to the database:", error);
  };
}
app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/students', studentRoutes);

//app.use('/', rootRoutes);

app.use('/api/hello', nameRoutes);

app.use('/',express.static('public'));



startServer();
