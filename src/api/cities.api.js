import httpClient from './httpClient';

const BASE_END_POINT = '/api'
const END_POINT = `${BASE_END_POINT}/cities/`;

const getAllCities = (limit) => httpClient.get(END_POINT, {params:{limit}});
const getCity = (publicId) => httpClient.get(`${END_POINT}${publicId}`);
const deleteCity = (publicId) => httpClient.delete(`${END_POINT}${publicId}`);
const updateCity = (publicId, data) => httpClient.patch(`${END_POINT}${publicId}/`, data);
const createCity = (name, n, p, l, g, graph) => httpClient.post(END_POINT, {name, n, p, l, g, graph});
const duplicateCity = (publicId) => httpClient.post(`${END_POINT}${publicId}/duplicate/`);
const getPajekFile = (n,p,l,g) => httpClient.get(`${END_POINT}build_graph_file`, {params:{n,p,l,g}});

const getRecentOptimizations = () => httpClient.get(`${BASE_END_POINT}/recent_optimizations`, {});

export default {
    getAllCities,
    getCity,
    createCity,
    updateCity,
    deleteCity,
    getRecentOptimizations,
    duplicateCity,
    getPajekFile
}