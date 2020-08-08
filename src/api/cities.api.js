import httpClient from './httpClient';

const BASE_END_POINT = '/api'
const END_POINT = `${BASE_END_POINT}/cities`;

const getAllCities = (limit) => httpClient.get(END_POINT, {limit});
const getCity = (publicId) => httpClient.get(`${END_POINT}/${publicId}`);
const deleteCity = (publicId) => httpClient.delete(`${END_POINT}/${publicId}`);
const updateCity = (publicId) => httpClient.patch(`${END_POINT}/${publicId}`);
const createCity = () => httpClient.post(END_POINT, {});
const duplicateCity = (publicId) => httpClient.post(`${END_POINT}/${publicId}/duplicate`);

const getRecentOptimizations = () => httpClient.get(`${BASE_END_POINT}/recent_optimizations`, {});

export default {
    getAllCities,
    getCity,
    createCity,
    updateCity,
    deleteCity,
    getRecentOptimizations,
    duplicateCity,
}