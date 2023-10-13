const express = require('express');
const usersService = require('../services/users.service');
const { validateBody, isAuth } = require('../middlewares');
const { schemas } = require('../models/user.model');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), usersService.register);

router.post('/login', validateBody(schemas.loginSchema), usersService.login);

router.post('/logout', isAuth, usersService.logout);

router.get('/current', isAuth, usersService.current);

router.patch('/subscription', isAuth, validateBody(schemas.updateSubscriptionSchema), usersService.updateSubscription);

module.exports = router;
