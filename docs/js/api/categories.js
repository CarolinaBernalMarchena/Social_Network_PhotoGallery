"use_strict";
import { BASE_URL, requestOptions } from "./common.js";

const categorieApi = {
    getByCat: function (categorieName) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/`+categorieName+`/categoryAll`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

const categorieApi2 = {
    getById: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/categoryAll`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getPhotoCategories: function (idCategory) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/getCategories/`+idCategory, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    postCategory: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/categories`,formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    deleteCategories: function (idPhoto) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${BASE_URL}/picturecategories/`+idPhoto, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    postPictureCategory: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/picturecategories`,formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getCategoryNames: function (idPhoto) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/getPhotoCategories/`+idPhoto, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

export { categorieApi, categorieApi2};
