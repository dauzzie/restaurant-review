import mongoose from 'mongoose';
import Review from '../models/review.model.js'

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    address: {
        building: String,
        coord: Array,
        street: String,
        zipcode: String,
        Object},
    borough: String,
    cuisine: String,
    grades: Array,
    name: String,
    restaurant_id: String,
    reviews: [Review.schema]
}, { timestamps: true});

const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'restaurants');

export default Restaurant;