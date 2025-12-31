const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'twoj_sekretny_klucz'; // Musi być taki sam we wszystkich serwisach!

const sequelize = new Sequelize({ dialect: 'sqlite', storage: './database.db' });

// Model Użytkownika zgodnie z zadaniem [cite: 68]
const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

// POST /api/register - Rejestracja 
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Szyfrowanie [cite: 71]
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ id: user.id });
  } catch (err) {
    res.status(400).json({ error: "Email musi być unikalny" });
  }
});

// POST /api/login - Logowanie i zwrot JWT 
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Błędne dane logowania" });
  }
});

sequelize.sync().then(() => {
  app.listen(3003, () => console.log('Serwis Użytkowników działa na porcie 3003'));
});