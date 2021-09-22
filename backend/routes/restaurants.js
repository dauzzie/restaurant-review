import express from 'express';
import RestaurantController from '../controller/restaurant.controller.js';


const router = express.Router();

router.route("/").get(RestaurantController.getRestaurants);
router.route("/id/:id").get(RestaurantController.getRestaurantById);
router.route("/cuisines").get(RestaurantController.getCuisines);

export default router;