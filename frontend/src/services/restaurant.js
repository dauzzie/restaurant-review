import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/v1/';

class RestaurantDataService {
    getAll(page = 0) {
        return axios.get(baseUrl + `restaurants?page=${page}`);
    }

    get(id) {
        console.log(baseUrl + `restaurants/id/${id}`);
        return axios.get(baseUrl + `restaurants/id/${id}`);
    }

    find(query, by = "name", page = 0) {
        console.log(baseUrl + `restaurants?${by}=${query}&page=${page}`);
        return axios.get(baseUrl + `restaurants?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return axios.post(baseUrl + "review", data);
    }

    updateReview(data) {
        return axios.put(baseUrl + "review", data);
    }

    deleteReview(id, userId) {
        return axios.delete(baseUrl + `review?id=${id}`, {
            data: { user_id: userId },
        });
    }

    getCuisines() {
        return axios.get(baseUrl + `restaurants/cuisines`);
    }
}

export default new RestaurantDataService();