import Restaurant from '../models/restaurant.model.js'
import Review from '../models/review.model.js'
import {ObjectId} from 'mongodb';

let ReviewModel = Review.model;

export default class ReviewController {
    static PostReview = async(req, res) => {
        let restaurant_id = ObjectId(req.body.restaurant_id);
        const review = req.body.text;
        const name = req.body.name;
        const user_id = req.body.user_id;
        const date = new Date();

        const newReview = new ReviewModel(
            {
                restaurant_id: restaurant_id,
                name: name,
                text: review,
                user_id:user_id,
                date:date
            }
        );

        await Restaurant.findById(restaurant_id)
        .then(restaurant => {
            restaurant.reviews.push(newReview);
            newReview.save()
            .then(() => restaurant.save())
            .then(() => res.status(200).json('Review posted!'))
            .catch(err => res.status(500).json(('Error: restaurant not saved, Error: ' + err)))
        })
        .catch(err => res.status(500).json('Error: no restaurant_id found, Error: ' + err));
    }

    static UpdateReview = async(req, res) => {
        const review_id = ObjectId(req.body.review_id);
        const user_id = req.body.user_id;
        const text = req.body.text;
        const date = new Date();

        await ReviewModel.findOne({_id:review_id, user_id: user_id})
        .then((review) => {
            review.text = text;
            review.date = date;
            review.save()
            .catch(err => res.status(500).json('Review not saved' + err))
            return Restaurant.findById(review.restaurant_id).exec()
        })
        .then((restaurant) => {
            console.log(restaurant.reviews);
            restaurant.reviews.id(review_id).text = text;
            restaurant.reviews.id(review_id).date = date;
            restaurant.save()
            .catch(err => res.status(500).json('Restaurant not saved, Error: ' + err))
            res.status(200).json('Review updated!');
        })
        .catch((err) => res.status(500).json({error: 'No review found: ' + err}));

        
    }

    static DeleteReview = async(req, res) => {
        const review_id = ObjectId(req.body.review_id);
        const user_id = req.body.user_id;
        const date = new Date();

        let review;

        await ReviewModel.findOne({_id: review_id, user_id:user_id})
        .then(review => {
            console.log(review);
            let target = Restaurant.findById(review.restaurant_id);
            review.remove();
            return target.exec();
        })
        .then(restaurant => {
            restaurant.reviews.id(review_id).remove();
            restaurant.save()
            .catch(err => res.status(500).json('Restaurant not saved, Error: ' + err))
        })
        .then(() => res.status(200).json('Reveiw removed!'))
        .catch((err) => res.status(500).json({error: 'No review found: ' + err}));
    }
}
