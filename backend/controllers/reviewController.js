const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res) => {
  const { bookId } = req.params;
  const { rating, reviewText } = req.body;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const existing = await Review.findOne({ bookId, userId: req.user._id });
  if (existing) {
    existing.rating = rating;
    existing.reviewText = reviewText;
    await existing.save();
    return res.json(existing);
  }
  const review = await Review.create({ bookId, userId: req.user._id, rating, reviewText });
  res.status(201).json(review);
};

exports.editReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) return res.status(404).json({ message: 'Not found' });
  if (!review.userId.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) return res.status(404).json({ message: 'Not found' });
  if (!review.userId.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
  await review.remove();
  res.json({ message: 'Deleted' });
};
