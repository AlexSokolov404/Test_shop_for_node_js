const Registration = require('../models/Registration.js')
const { validationResult } = require('express-validator')
const userService = require('../service/user-service')
const bcrypt = require('bcryptjs');

class authController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // return res.status(400).json({ message: "Ошибка при регистрации", errors })
        throw new Error("Ошибка при регистрации")
      }
      const { email, nickname, password } = req.body
      const userData = await userService.registration(email, nickname, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({ message: `Пользователь ${nickname} успешно зарегистрирован` })
      //res.redirect('/myProfile')
    } catch (e) {
      next(e)
    }
  }

  async login(req, res) {
    try {
      const { nickname, password } = req.body
      const userUnique = await Registration.findOne({ nickname })
      if (!userUnique) {
        return res.status(400).json({ message: `Пользователь ${nickname} не найден` })
      }
      const validPassword = bcrypt.compareSync(password, userUnique.password)
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль' })
      }
      const token = generateAccessToken(userUnique._id)
      res.redirect("/myProfile")
      //return res.json({token})
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка авторизации' })
    }
  }

  async logout(req, res) {
    try {

    } catch (e) {

    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async getUsers(req, res, next) {
    try {
      const datasUser = await Registration.find({})

      res.render('myProfile', {
        title: 'Мой профиль',
        style_headers: './styles/style_headers.css',
        isProfile: true,
        datasUser
      })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new authController()