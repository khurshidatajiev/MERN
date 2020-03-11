const { Router } = require('express');
const  bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const  router = Router();
const User = require('../models/User');

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов')
      .isLength({ min: 6})
  ],
  async (req, res) => {

    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.mapped(),
          message: 'Некорректные данные при регистрации'
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if(candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashedPassword = await bycrypt.hash(password, 12);
      const user = new User({ email, password:  hashedPassword });

      await user.save();
      res.status(201).json({ message: 'Пользователь успешно создан' });

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.mapped(),
          message: 'Некорректные данные при авторизации'
        });
      }

      const {  email, password } = req.body;
      const user = await User.findOne({ email });

      if(!user) {
        return res.status(500).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await bycrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      res.json({ token, userId: user.id, message: 'Вы успешно авторизовались'});

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  }
);

module.exports = router;
