const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Potrzebne do komunikacji z Serwisem 1

const app = express();
app.use(express.json());
const SECRET_KEY = 'twoj_sekretny_klucz';

const sequelize = new Sequelize({ dialect: 'sqlite', storage: './database_orders.db' });

// Model Zamówienia zgodny z tabelą orders [cite: 59, 60, 61, 62, 63]
const Order = sequelize.define('Order', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  bookId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false }
});

// Middleware JWT - wymagane dla POST, DELETE, PATCH [cite: 75]
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Brak tokena!" });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token niepoprawny!" });
    req.user = user;
    next();
  });
};

// --- ENDPOINTY ---

// GET /api/orders/:userId - lista zamówień użytkownika 
app.get('/api/orders/:userId', async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.params.userId } });
  res.json(orders);
});

// POST /api/orders - dodaj zamówienie (Wymaga sprawdzenia książki w Serwisie 1) 
app.post('/api/orders', authenticateToken, async (req, res) => {
  const { userId, bookId, quantity } = req.body;
  try {
    // Sprawdzenie czy bookId istnieje w Serwisie 1 (nie bezpośrednio w bazie!) 
    await axios.get(`http://localhost:3001/api/books/${bookId}`);
    
    const order = await Order.create({ userId, bookId, quantity });
    res.status(201).json({ id: order.id });
  } catch (error) {
    res.status(404).json({ message: "Książka nie istnieje w serwisie książek!" });
  }
});

// PATCH /api/orders/:orderId - aktualizacja zamówienia [cite: 66]
app.patch('/api/orders/:orderId', authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.orderId);
  if (order) {
    await order.update(req.body);
    res.json(order);
  } else res.status(404).json({ message: "Zamówienie nie istnieje" });
});

// DELETE /api/orders/:orderId - usuwanie zamówienia [cite: 66]
app.delete('/api/orders/:orderId', authenticateToken, async (req, res) => {
  await Order.destroy({ where: { id: req.params.orderId } });
  res.json({ message: "Zamówienie usunięte" });
});

sequelize.sync().then(() => {
  app.listen(3002, () => console.log('Serwis Zamówień działa na porcie 3002'));
});