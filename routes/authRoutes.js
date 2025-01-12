const authControllers = require('../controllers/authControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/admin-login', authControllers.admin_login);
router.post('/user-login', authControllers.user_login);
router.get('/get-user', authMiddleware, authControllers.get_user);
router.post('/user-register', authControllers.user_register);

module.exports = router;