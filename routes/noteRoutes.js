const noteControllers = require('../controllers/noteControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/add-note',authMiddleware, noteControllers.add_note);
router.get('/get-notes',authMiddleware, noteControllers.get_notes);
router.delete('/delete-note/:id',authMiddleware, noteControllers.delete_note);

module.exports = router;