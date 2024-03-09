"use_strict";
import { BASE_URL, requestOptions } from "./common.js";
const userProfile = {
    getProfile: function (idUser) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/users/`+idUser, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getFollow: function (idUser) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/myfollowings/`+idUser, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    deleteFollow: function (followerId,accountOwnerId) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${BASE_URL}/userFollowers/` +followerId+ `/` +accountOwnerId, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    follow: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/userFollowers`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

const userPictures = {
    getPicturesApi: function (idUser) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/picturesUsers/`+idUser, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    myPicturesApi: function (idUser) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/myPictures/`+idUser, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};



export {userProfile, userPictures};