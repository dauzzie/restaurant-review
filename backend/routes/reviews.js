import express from 'express';
import ReviewController from '../controller/review.controller.js';

const router = express.Router();

router
.route("/")
.post(ReviewController.PostReview)
.put(ReviewController.UpdateReview)
.delete(ReviewController.DeleteReview);

export default router;