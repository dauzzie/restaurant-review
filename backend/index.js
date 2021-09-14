import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurants_dao.js"
import ReviewsDAO from "./dao/reviews_dao.js";

dotenv.config();

const mongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

mongoClient.connect(
    process.env.RESTREVIEW_DB_URI,
    {
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser: true}
).catch(err => {
    console.log(err.stack);
    process.exit(1);
}).then(async client => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    });
});