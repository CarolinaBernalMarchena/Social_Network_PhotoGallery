"use_strict";
import { BASE_URL, requestOptions } from "./common.js";


const mobilesApi = {
    getAll: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/mobiles`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    postMobile: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/mobiles`,formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

export { mobilesApi};