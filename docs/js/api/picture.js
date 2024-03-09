"use_strict";
import { BASE_URL, requestOptions } from "./common.js";
const pictureApi = {
    getAll: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/pictures`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};
const pictureApi2 = {
    getAll: function (idUsuario) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/picturesByFollowerUser/`+idUsuario, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

const pictureIdApi = {
    getById: function (idPhoto) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/pictures/`+idPhoto, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    postPhoto: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/pictures`,formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    putPhoto: function (formData,idPhoto) {
        return new Promise(function (resolve, reject) {
            axios
                .put(`${BASE_URL}/pictures/`+idPhoto, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    deletePhoto: function (idPhoto) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${BASE_URL}/pictures/`+idPhoto,  requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

const CommentApi = {
    getComments: function (idComment) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/comments/`+idComment, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    postComment: function (formData) {
            return new Promise(function (resolve, reject) {
                axios
                    .post(`${BASE_URL}/comments`,formData, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            });
        },
};

const RatingApi = {
    postRating: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/ratings`,formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    deleteRating: function (userid,photoId) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${BASE_URL}/deleteRating/`+userid+'/'+photoId, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    deleteAllRating: function (photoId) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${BASE_URL}/deleteRating/`+photoId, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
}

const EditApi = {
    getComments: function (idPhoto) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/pictures/`+idPhoto, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

export { pictureApi, pictureApi2, pictureIdApi, CommentApi, EditApi, RatingApi};