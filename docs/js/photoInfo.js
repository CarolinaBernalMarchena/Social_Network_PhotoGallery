"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { pictureIdApi } from "/js/api/picture.js";
import { CommentApi } from "/js/api/picture.js";
import { categorieApi2 } from "/js/api/categories.js";
import { RatingApi } from "/js/api/picture.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from './utils/session.js';

const errorsDiv = document.getElementById("errors");

function main() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idPhoto = urlParams.get('id');
    let loggedUser = sessionManager.getLoggedUser();
    let idComment = urlParams.get('idC');
    let cont = document.getElementById("cont");
    let cont2 = document.getElementById("cont2");
    console.log(cont);
    var spiner = parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);
    pictureIdApi.getById(idPhoto)
        .then(picture => {
            cont.removeChild(spiner);
            console.log(picture);
            for (let photo of picture) {
                if(photo.rating==null){
                    photo.rating="Without rating yet";
                }
                var pictureCard = parseHTML('<div style="margin-top: 1em;"><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right;"><img onclick="irPerfil(' + photo.userId + ')";" class="img-fluid;border-style: outset;" height="75" width="75" src="' + photo.profilePictureUrl + '"></div><div class=" col-7 "><div style="padding-top: 1em; font-size: 150%;"><b>' + photo.userName + '</b></div></div></div></div><div><div style="text-align:right;padding-top: 1em;padding-right: 42%; font-size: 75%;">Photo rating: ' + photo.rating + '✰</div><div style="text-align:center;"><img class="img-fluid" height="305" width="305" src="' + photo.url + '"></div><div style="text-align:right;padding-right: 42%; font-size: 75%"><i>' + new Date(photo.uploadDate).toDateString() + '</i></div><div style="text-align:center;font-size: 130%">' + photo.title + '</div><div style="padding-top: 1em; text-align:center;">' + photo.description + '</div></div>');
                cont.appendChild(pictureCard);
            }

        })
        .catch(error => {
            console.log(error);
            //messageRenderer.showErrorAsAlert(error)
        });
    //Categorias de la foto
    console.log(cont5);
    categorieApi2.getCategoryNames(idPhoto)
        .then(categories => {
            console.log(categories);
            if(categories!=null && categories.length>0){
                cont6.append( parseHTML("<div style='text-align: center;'>This photo has the following categories:</div> "))
            }else{
                cont6.append( parseHTML("<div  style='text-align: center;'>This photo has no category:</div> "))

            }
            for (let cat of categories) {
                var categoryCard = parseHTML('<div style="text-align: center;"><div class=" badge badge-primary "  onclick="goToCategory(' + `'` + cat.categoryName + `'` + ')">' + cat.categoryName + '</div></div>');
                cont5.appendChild(categoryCard);
            }

        })
        .catch(error => {
            if (error == 'Not found') {

            } else {
                console.log(error);
                //messageRenderer.showErrorAsAlert(error)
            }

        });

    //Comentarios de la foto
    console.log(cont2);
    CommentApi.getComments(idPhoto)
        .then(comments => {
            console.log(comments);
            for (let cmmts of comments) {
                var pictureCard = parseHTML('<div style="margin-top: 4em;"><div class=" container "><div class="row"><div class=" col-3 " style="text-align: right;"><img onclick="irPerfil(' + cmmts.userId + ')";class="img-fluid;border-style: outset;" height="45" width="45" src="' + cmmts.profilePictureUrl + '"></div><div class=" col-9 "><div>' + cmmts.commentText + '</div><div style="text-align:left;font-size: 75%"><i>' + new Date(cmmts.commentDate).toDateString() + '</i></div></div></div></div>');
                cont2.appendChild(pictureCard);
            }

        })
        .catch(error => {
            console.log(error);
            //messageRenderer.showErrorAsAlert(error)
        });

    let cont3 = document.getElementById("cont3");
    var buttons = "";
    if (loggedUser == null) {
        buttons = parseHTML('<div></div>');
    } else {
        buttons = parseHTML('<div><form id="comment-form"><div><div style="text-align: center;scroll-padding-top: 2em;"><textarea id="commentText" name="commentText" rows="10" cols="40"></textarea></div><div style="text-align: center;"><button type="submit" id=" button-comment " class=" btn btn-success ">Comment</button></div></div></form></div>');
    } cont3.appendChild(buttons);

    if (loggedUser != null) {
        const commentForm = document.getElementById("comment-form");

        commentForm.addEventListener("submit", function (event) {
            sendComment(event);
        });
    }

    let cont4 = document.getElementById("cont4");
    var buttons = "";
    if (loggedUser == null) {
        buttons = parseHTML('<div></div>');
    } else {
        buttons = parseHTML('<div><div style="text-align: center"><label for="rating-input "> Rate this photo: </label></div><form id="rating-form" name="rating-form"><div style="text-align: center;" class=" form-group "><select style="width: 50%;display: initial;" id=" rating-input " name="ratingValue" class=" form-control "><option value="1">✰</option><option value="2">✰✰</option><option value="3">✰✰✰</option><option value="4">✰✰✰✰</option><option value="5">✰✰✰✰✰</option></select></div><div style="text-align: center"><button type=" submit " id=" button-rate " class=" btn btn-success "> Rate </button></div></form></div>');
    } cont3.appendChild(buttons);

    if (loggedUser != null) {
        const ratingForm = document.getElementById("rating-form");

        ratingForm.addEventListener("submit", function (event) {
            sendRate(event);
        });
    }

}

document.addEventListener("DOMContentLoaded", main);


function sendComment(event) {
    event.preventDefault();
    errorsDiv.innerHTML = "";
    const commentForm = document.getElementById("comment-form");

    let formData = new FormData(commentForm);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idPhoto = urlParams.get('id');

    let loggedUser = sessionManager.getLoggedUser();
    console.log(loggedUser);
    formData.append('userId', loggedUser.userId);
    formData.append('pictureId', idPhoto);
    const yourDate = new Date()

    formData.append('commentDate', yourDate.toISOString().split('T')[0]);

    sendCommentPost(formData);
}

function sendCommentPost(formData) {
    console.log(formData);
    CommentApi.postComment(formData)
        .then(res => {
            console.log(res);
            location.reload();
        })
        .catch(error => messageRenderer.showErrorAsAlert(error));
}

//publicar rating
function sendRate(event) {
    event.preventDefault();
    errorsDiv.innerHTML = "";
    const ratingForm = document.getElementById("rating-form");

    let formData = new FormData(ratingForm);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idPhoto = urlParams.get('id');

    let loggedUser = sessionManager.getLoggedUser();
    formData.append('userId', loggedUser.userId);
    formData.append('pictureId', idPhoto);
    const yourDate = new Date()

    formData.append('ratingDate', yourDate.toISOString().split('T')[0]);

    sendRatePost(formData);
}

async function sendRatePost(formData) {
    let loggedUser = sessionManager.getLoggedUser();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idPhoto = urlParams.get('id');

    await RatingApi.deleteRating(loggedUser.userId,idPhoto)
    .then(res => {
        console.log(res);
    })
    .catch(error => messageRenderer.showErrorAsAlert(error));


    RatingApi.postRating(formData)
        .then(res => {
            console.log(res);
            refresh()
            messageRenderer.showSuccessAsAlert('Rating updated');
        })
        .catch(error => messageRenderer.showErrorAsAlert(error));
}


//recargar rating
function refresh(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idPhoto = urlParams.get('id');

    let cont = document.getElementById("cont");
    //vacio el contenedor actual, para volver a llenarlo
    cont.innerHTML = '';


    console.log(cont);
    var spiner = parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);
    pictureIdApi.getById(idPhoto)
    .then(picture => {
        cont.removeChild(spiner);
        console.log(picture);
        for (let photo of picture) {
            if(photo.rating==null){
                photo.rating="Without rating yet";
            }
            var pictureCard = parseHTML('<div style="margin-top: 1em;"><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right;"><img onclick="irPerfil(' + photo.userId + ')";" class="img-fluid;border-style: outset;" height="75" width="75" src="' + photo.profilePictureUrl + '"></div><div class=" col-7 "><div style="padding-top: 1em; font-size: 150%;"><b>' + photo.userName + '</b></div></div></div></div><div><div style="text-align:right;padding-top: 1em;padding-right: 42%; font-size: 75%;">Photo rating: ' + photo.rating + '✰</div><div style="text-align:center;"><img class="img-fluid" height="305" width="305" src="' + photo.url + '"></div><div style="text-align:right;padding-right: 42%; font-size: 75%"><i>March 26, 2021</i></div><div style="text-align:center;font-size: 130%">' + photo.title + '</div><div style="padding-top: 1em; text-align:center;">' + photo.description + '</div></div>');
            cont.appendChild(pictureCard);
        }

    })
    .catch(error => {
        console.log(error);
        //messageRenderer.showErrorAsAlert(error)
    });
}
