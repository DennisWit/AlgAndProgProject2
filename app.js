const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ошибка при подключении к MongoDB:'));

// Определение схемы и модели MongoDB
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  color: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Добавление заголовков CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешает запросы с любых источников
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Обработка POST-запроса с данными от клиента
app.post('/submit', async (req, res) => {
  try {
    const { name, phone, color } = req.body;

    // Сохранение данных в MongoDB
    const newUser = new User({
      name,
      phone,
      color,
    });
    await newUser.save();

    res.json({ success: true, message: 'Данные успешно сохранены.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера.' });
  }
});

app.listen(PORT, () => {
  console.log('Сервер работает на порте:', {PORT});
});