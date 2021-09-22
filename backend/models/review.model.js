import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const reviewSchema = new Schema({
    name: {required: true, type:String},
    user_id: {required: true, type:String},
    date: {type: Date, required: true},
    text: {type: String, required: true},
    restaurant_id: {type:Schema.Types.ObjectId, ref:'Restaurant'}
}, { timestamps: true});

const Review = {
    schema: reviewSchema,
    model: mongoose.model('Review', reviewSchema, 'reviews')
}



// export const Review = mongoose.model('Review', reviewSchema, 'reviews');

export default Review;