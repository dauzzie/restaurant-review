import Restaurant from '../models/restaurant.model.js'

export default class RestaurantController {
    
    static getRestaurants = async(req, res) => {

        let query = req.query;
        let filters = {}

        if(req.query.cuisine) {
            filters.cuisine = req.query.cuisine;
        }if(req.query.zipcode) {                               
            filters.zipcode = req.query.zipcode;
        }if(req.query.name) {
            filters.name = {$regex: req.query.name, $options: "i"};
        }
        console.log(filters, req.query);

        const perPage = query.restaurantsPerPage? Number(query.restaurantsPerPage) :20;
        const pg = query.page? Number(query.page) : 0;
        let count;

        await Restaurant.count(filters)
        .then(num => {
            count = num;
            return Restaurant.find(filters)
            .limit(perPage)
            .skip(perPage*pg)
            .exec();
        })
        .then(rests => {
            res.status(200).json({
                restaurants_list: rests,
                page: pg,
                filters: filters,
                entries_per_page: perPage,
                total_results: count
            });
        })
        .catch(err => res.status(404).json('Error: finding restaurant: '+ err));
        
    };

    static getRestaurantById = async(req, res) => {
        let id = req.params.id || {};
        Restaurant.findById(id)
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(404).json('Error: ' + err));
    }

    static getCuisines = async(req, res) => {
        Restaurant.find({}, "cuisine")
        .distinct("cuisine")
        .then(cuisines => res.json(cuisines))
        .catch(e => res.status(404).json('Error: ' + e));
    };
}
