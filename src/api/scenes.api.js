import httpClient from './httpClient';

const BASE_END_POINT = '/api'
const END_POINT = `${BASE_END_POINT}/scenes/`;

const getScene = (publicId) => httpClient.get(`${END_POINT}${publicId}/`);
const deleteScene = (publicId) => httpClient.delete(`${END_POINT}${publicId}/`);
const updateScene = (publicId, data) => httpClient.put(`${END_POINT}${publicId}/`, data);
const createScene = (data) => httpClient.post(END_POINT, data);
const duplicateScene = (publicId) => httpClient.post(`${END_POINT}${publicId}/duplicate/`);
const getGlobalResults = (publicId) => httpClient.get(`${END_POINT}${publicId}/global_results/`, {});

const checkTransportMode = (data) => httpClient.get(`${BASE_END_POINT}/validation/transport_mode`, {params: data});
const updateTransportMode = (scenePublicId, transportModePublicId, data) => httpClient.put(`${END_POINT}${scenePublicId}/transport_modes/${transportModePublicId}/`, data);
const deleteTransportMode = (scenePublicId, transportModePublicId) => httpClient.delete(`${END_POINT}${scenePublicId}/transport_modes/${transportModePublicId}/`);
const createTransportMode = (scenePublicId, data) => httpClient.post(`${END_POINT}${scenePublicId}/transport_modes/`, data);

export default {
    getScene,
    createScene,
    updateScene,
    deleteScene,
    duplicateScene,
    checkTransportMode,
    updateTransportMode,
    deleteTransportMode,
    createTransportMode,
    getGlobalResults
}