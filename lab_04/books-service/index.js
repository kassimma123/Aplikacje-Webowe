const express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'twoj_sekretny_klucz';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db'
});

const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    year: DataTypes.INTEGER
});

const aurthenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.get('/api/books', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

app.get('/api/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    book ? res.json(book) : res.status(404).send('Nie znaleziono ksiąki');
});

app.post('/api/books', aurthenticateToken, async (req, res) => {
    const {title, author, year} = req.body;
    const newBook = await Book.create({title, author, year});
    res.status(201).json({id : newBook.id});
});

app.delete('/api/books/:id', aurthenticateToken, async (req, res) => {
    await Book.destroy({where: {id: req.params.id}});
    res.send('Usunięto książkę');
});

sequelize.sync().then(() => {
  app.listen(3001, () => console.log('Serwis Książek działa na porcie 3001'));
});