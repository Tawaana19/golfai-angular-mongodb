var express = require('express');
var router = express.Router();
const service = require('../services/PropertyService')

router.get('/', async function (req, res, next) {
  const data = await service.getPropertyDetails(req.query.searchParam)
  res.status(200).json(data)
});

module.exports = router;
