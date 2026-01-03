const express = require('express');
const router = express.Router();
const appController = require('../controller/appController');

// POST - Create a new contact
router.post('/', appController.setContacts);

// GET - Fetch all contacts
router.get('/', appController.getContacts);

// DELETE - Remove a contact
router.delete('/:id', appController.deleteContact);

module.exports = router;
