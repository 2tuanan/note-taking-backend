const authControllers = require('../controllers/authControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/user-login', authControllers.user_login);
router.get('/get-user', authMiddleware, authControllers.get_user);

module.exports = router;