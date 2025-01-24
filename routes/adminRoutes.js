const adminControllers = require('../controllers/adminControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.get('/get-users', authMiddleware, adminControllers.get_users);
router.delete('/reset-user/:id', authMiddleware, adminControllers.reset_user);
router.delete('/delete-user/:id', authMiddleware, adminControllers.delete_user);

module.exports = router;