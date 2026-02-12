import express from 'express';
import type { Request, Response } from 'express';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';

const app = express();
const port = 3000;
const etudiants = [
{ id: 1, nom: "Dupont", prenom: "Jean" },
{ id: 2, nom: "Martin", prenom: "Sophie" },
{ id: 3, nom: "Doe", prenom: "John" },
];

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

startServer();

app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur mon serveur API');
});

app.get('/api/data',(req: Request, res: Response) =>{
    res.json(etudiants);
});

app.get('/api/hello/:name',(req: Request, res: Response) =>{
    let name = req.params.name;
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString()
    });

});

function greet(name: string): string {
  return `Salut c'est ${name}`;
}

const message = greet('Greg');

console.log(message);
