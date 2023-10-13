const express = require('express');
const contactsService = require('../services/contacts.service');
const { validateBody, isValidId, isAuth } = require('../middlewares');
const { schemas } = require('../models/contact.model');

const router = express.Router();

router.post('/', isAuth, validateBody(schemas.createSchema), contactsService.create);

router.get('/', isAuth, contactsService.findAll);

router.get('/:id', isAuth, isValidId, contactsService.findOne);

router.put('/:id', isAuth, isValidId, validateBody(schemas.createSchema), contactsService.update);

router.patch(
  '/:id/favorite',
  isAuth,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsService.updateFavorite
);

router.delete('/:id', isAuth, isValidId, contactsService.remove);

module.exports = router;
