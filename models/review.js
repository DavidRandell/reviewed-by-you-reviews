// models/review.js

const mongoose = require('mongoose');

const Review = mongoose.model('Reviews', {
    title: String,
    description: String,
    movieTitle: String,
    movieRating: Number,
    reviewDate: Date,
    reviewTime: Number
});

module.exports = Review;