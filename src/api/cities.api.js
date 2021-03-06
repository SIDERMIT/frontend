import httpClient from './httpClient';

const BASE_END_POINT = '/api'
const END_POINT = `${BASE_END_POINT}/cities/`;

const getAllCities = (limit) => httpClient.get(END_POINT, {params:{limit}});
const getCity = (publicId) => httpClient.get(`${END_POINT}${publicId}/`);
const deleteCity = (publicId) => httpClient.delete(`${END_POINT}${publicId}/`);
const updateCity = (publicId, data) => httpClient.patch(`${END_POINT}${publicId}/`, data);
const createCity = (name, n, p, l, g, etha, etha_zone, angles, gi, hi, graph) => httpClient.post(END_POINT, {name, n, p, l, g, etha, etha_zone, angles, gi, hi, graph, step: 'step1'});
const duplicateCity = (publicId) => httpClient.post(`${END_POINT}${publicId}/duplicate/`);
const getPajekFile = (n,p,l,g, etha, etha_zone, angles, gi, hi) => httpClient.get(`${END_POINT}build_graph_file_from_parameters/`, {params:{n, p, l, g, etha, etha_zone, angles, gi, hi}});
const getGraphFromPajekFile = (graph) => httpClient.get(`${END_POINT}network_data_from_pajek_file/`, {params:{graph}});
const getMatrixData = (publicId, y, a, alpha, beta) => httpClient.get(`${END_POINT}${publicId}/build_matrix_data/`, {params:{y, a, alpha, beta}});
const getMatrixFromFile = (publicId, content) => httpClient.post(`${END_POINT}${publicId}/build_matrix_from_file/`, {content});

const getRecentOptimizations = () => httpClient.get(`${BASE_END_POINT}/recent_optimizations`, {});

export default {
    getAllCities,
    getCity,
    createCity,
    updateCity,
    deleteCity,
    getRecentOptimizations,
    duplicateCity,
    getPajekFile,
    getGraphFromPajekFile,
    getMatrixData,
    getMatrixFromFile
}