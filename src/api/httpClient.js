import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000, // indicates, 1000ms ie. 1 second
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient;