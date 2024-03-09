"use_strict";
import { BASE_URL, requestOptions } from "./common.js";


const artistsApi = {
    getAll: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/artists`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    postArtists: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/artists`,formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

export { artistsApi };