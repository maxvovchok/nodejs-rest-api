const express = require('express');
const contactsController = require('../controllers/contacts.controller');
const { validateBody, isValidId, authenticate } = require('../middlewares');
const { schemas } = require('../models/contactsModel');

const router = express.Router();

router.post('/', authenticate, validateBody(schemas.createSchema), contactsController.create);

router.get('/', authenticate, contactsController.findAll);

router.get('/:id', authenticate, isValidId, contactsController.findOne);

router.put('/:id', authenticate, isValidId, validateBody(schemas.createSchema), contactsController.update);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), contactsController.updateFavorite);

router.delete('/:id', authenticate, isValidId, contactsController.remove);

module.exports = router;
