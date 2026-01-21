import axios from 'axios';

const API_BASE_URL = 'https://admin-dashboard-api-8g3j.onrender.com/api';

export const dashboardService = {
    getStats: async () => {
        const response = await axios.get(`${API_BASE_URL}/stats`);
        return response.data;
    },
    getRevenueData: async () => {
        const response = await axios.get(`${API_BASE_URL}/revenue`);
        return response.data;
    },
    getRecentUsers: async () => {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    }
};
