import express, { Request, Response } from 'express';
import consumers = require('node:stream/consumers');

const app = express();
const port = 3000;
const etudiants = [
{ id: 1, nom: "Dupont", prenom: "Jean" },
{ id: 2, nom: "Martin", prenom: "Sophie" },
{ id: 3, nom: "Doe", prenom: "John" },
];


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
        timestamp: new Date().toISOString();
    });

});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

function greet(name: string): string{
    return `Salut c'est ${name}`;
}

let message = greet("Greg")

console.log(message)