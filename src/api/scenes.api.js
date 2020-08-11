import httpClient from './httpClient';

const BASE_END_POINT = '/api'
const END_POINT = `${BASE_END_POINT}/scenes/`;

const getScene = (publicId) => httpClient.get(`${END_POINT}${publicId}`);
const deleteScene = (publicId) => httpClient.delete(`${END_POINT}${publicId}`);
const updateScene = (publicId) => httpClient.patch(`${END_POINT}${publicId}`);
const createScene = (name, n, p, l, g, graph) => httpClient.post(END_POINT, {name, n, p, l, g, graph});
const duplicateScene = (publicId) => httpClient.post(`${END_POINT}${publicId}/duplicate/`);

export default {
    getScene,
    createScene,
    updateScene,
    deleteScene,
    duplicateScene
}