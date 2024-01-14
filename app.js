const express = require("express");
let pokemons = require('./data')

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("Hello again, Express "));

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p  => p.id === id);
    res.send(`Vous avez démandé le pokemon ${pokemon.name}`)
});

app.get('/api/pokemons', (req, res) => {
    res.send(`Vous avez ${pokemons.length} pokemons`);
});

app.listen(port, () => console.log(`Notre aplication Node est lancé sur le port: ${port}`));

