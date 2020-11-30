const express = require('express');
const saveController = require('../controller/saveController');

const router = express.Router();

// For save router, the route contains the parameter id then for post
// jump to saveIntoFile and for get jump to getFromFile
router.route('/:id').get(saveController.getFromFile).post(saveController.saveIntoFile);

module.exports = router;
