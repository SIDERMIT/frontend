import httpClient from './httpClient';

const BASE_END_POINT = '/api'
const END_POINT = `${BASE_END_POINT}/transport_networks/`;

const getTransportNetwork = (publicId) => httpClient.get(`${END_POINT}${publicId}/`);
const deleteTransportNetwork = (publicId) => httpClient.delete(`${END_POINT}${publicId}/`);
const updateTransportNetwork = (publicId, name, route_set) => httpClient.patch(`${END_POINT}${publicId}/`, {name, route_set});
const createTransportNetwork = (scene_public_id, name, route_set) => httpClient.post(END_POINT, {scene_public_id, name, route_set});
const duplicateTransportNetwork = (publicId) => httpClient.post(`${END_POINT}${publicId}/duplicate/`);
const createDefaultRoutes = (scene_public_id, default_routes) => httpClient.post(`${END_POINT}create_default_routes/`, {scene_public_id, default_routes});

const runOptimization = (publicId) => httpClient.post(`${END_POINT}${publicId}/run_optimization/`);
const cancelOptimization = (publicId) => httpClient.post(`${END_POINT}${publicId}/cancel_optimization/`);

export default {
    getTransportNetwork,
    deleteTransportNetwork,
    updateTransportNetwork,
    createTransportNetwork,
    duplicateTransportNetwork,
    createDefaultRoutes,
    runOptimization,
    cancelOptimization
}