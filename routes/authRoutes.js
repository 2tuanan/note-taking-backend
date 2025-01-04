const authControllers = require('../controllers/authControllers');
const router = require('express').Router();

router.post('/user-login', authControllers.user_login);

module.exports = router;