const adminControllers = require('../controllers/adminControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.get('/get-users', authMiddleware, adminControllers.get_users);

module.exports = router;