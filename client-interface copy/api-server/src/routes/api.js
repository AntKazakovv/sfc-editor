const router = require('express').Router();
const getData = require('../handlers/getData.js');
const getTemplate = require('../handlers/getTemplate.js')
const updateTemplate = require('../handlers/updateTemplate.js')

// router.use(function timeLog(req, res, next) {
//   next();
// });

router.get('/template', getTemplate);
router.post('/template', updateTemplate);
router.get('/data', getData);

module.exports = router;
