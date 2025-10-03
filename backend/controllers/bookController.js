const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');

exports.getBooks = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = 5;
  const skip = (page - 1) * limit;
  const [total, books] = await Promise.all([
    Book.countDocuments(),
    Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
  ]);
  const totalPages = Math.ceil(total / limit);
  res.json({ page, totalPages, total, books });
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
  const book = await Book.findById(id).populate('addedBy', 'name email').lean();
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const reviews = await Review.find({ bookId: id }).populate('userId', 'name').sort({ createdAt: -1 }).lean();
  let avgRating = 0;
  if (reviews.length) avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  res.json({ book, reviews, avgRating });
};

exports.createBook = async (req, res) => {
  const { title, author, description, genre, year } = req.body;
  const book = await Book.create({ title, author, description, genre, year, addedBy: req.user._id });
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  if (!book.addedBy.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
  Object.assign(book, req.body);
  await book.save();
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  if (!book.addedBy.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
  await book.remove();
  await Review.deleteMany({ bookId: book._id });
  res.json({ message: 'Deleted' });
};
