import httpClient from './httpClient';

const BASE_END_POINT = '/api'
const END_POINT = `${BASE_END_POINT}/transport_networks/`;

const getTransportNetwork = (publicId) => httpClient.get(`${END_POINT}${publicId}`);
const deleteTransportNetwork = (publicId) => httpClient.delete(`${END_POINT}${publicId}`);
const updateTransportNetwork = (publicId) => httpClient.patch(`${END_POINT}${publicId}`);
const createTransportNetwork = (name, n, p, l, g, graph) => httpClient.post(END_POINT, {name, n, p, l, g, graph});
const duplicateTransportNetwork = (publicId) => httpClient.post(`${END_POINT}${publicId}/duplicate/`);

export default {
    getTransportNetwork,
    deleteTransportNetwork,
    updateTransportNetwork,
    createTransportNetwork,
    duplicateTransportNetwork
}