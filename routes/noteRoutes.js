const noteControllers = require('../controllers/noteControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/add-note',authMiddleware, noteControllers.add_note);

module.exports = router;