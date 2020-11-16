const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { isReviewAuthor, isLoggedIn, validateReview } = require('../middleware');
const reviews = require('../controllers/reviews');

// Add review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// Delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;