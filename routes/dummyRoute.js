const express = require('express');

const router = express.Router();

router.route('/?*').get(function (req, res) {
  console.log(`In router`);
  res.status(200).json({
    status: 'SUCCESS',
  });
});

module.exports = router;
