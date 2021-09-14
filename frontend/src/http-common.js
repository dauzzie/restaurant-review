import axios from 'axios';

export default axios.create({
    baseuRL: "http://localhost:3000/api/v1/restaurants",
    headers: {
        "Content-type": "application/json"
    }
});