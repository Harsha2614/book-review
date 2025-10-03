const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addReview, editReview, deleteReview } = require('../controllers/reviewController');

router.post('/:bookId', protect, addReview);
router.put('/:id', protect, editReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
