const express = require("express");
const morgan = require('morgan');
const bp = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
let pokemons = require('./data');
const PokemonModel = require('./models/pokemon');
const { success } = require("./help");

const app = express();
const port = 3000;

const sequelize = new Sequelize(
    'pokedex',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() =>console.log('Connected...')).catch(err => console.error(err));

const Pokemon = PokemonModel(sequelize, DataTypes);
sequelize.sync({force: true}).then(() =>{console.log("La base de donnée 'Pokedex' a bien été synchronisée")});

const logger = (req, res, next) =>{
    console.log(`URL: ${req.url}`);
    next();
}

app.use(morgan('dev')).use(bp.json());



app.get('/', (req, res) => res.send("Hello again, Express "));
app.get('/api/pokemons', (req, res) => {
    const message = "Success"
    res.json(success(message, pokemons));
});

app.listen(port, () => console.log(`Notre aplication Node est lancé sur le port: ${port}`));

