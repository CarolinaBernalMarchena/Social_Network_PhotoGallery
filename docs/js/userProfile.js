"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { userProfile } from "/js/api/users.js";
import { userPictures } from "/js/api/users.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from './utils/session.js';

const followForm = document.getElementById("follow");

function main() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idUser = urlParams.get('id');
    let loggedUser = sessionManager.getLoggedUser();
    if (loggedUser != null && idUser == loggedUser.userId) {
        location.href = "/myProfile.html";

    }
    let cont = document.getElementById("cont");
    let cont2 = document.getElementById("cont2");
    console.log(cont);

    let boton = '';
    var spiner = parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);
    if (loggedUser != null) {

        userProfile.getFollow(loggedUser.userId)
            .then(user => {

                console.log(user);
                let follow = false;
                for (let us of user) {
                    if (us.userId == idUser) {
                        follow = true;
                        break;
                    }
                }
                if (follow) {
                    boton = '<button  style="border-radius: 40px; background-color: white; color: #969FAA; border-color: #969FAA; width: 50%;"class=" btn btn-primary " id="follow-button">UNFOLLOW</button>'

                } else {
                    boton = '<button type=" submit " style="border-radius: 40px; background-color: white; color: #969FAA; border-color: #969FAA; width: 50%;"class=" btn btn-primary " id="follow-button">Follow</button>'

                }

                userProfile.getProfile(idUser)
                    .then(user => {
                        cont.removeChild(spiner);
                        console.log(user);
                        for (let us of user) {
                            var userCard = parseHTML('<div style="background-color: #BDD4F2 ;"><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; padding-top: 0.5em;"><img class="img-fluid;border-style: outset;" height="75" width="75" src="' + us.profilePictureUrl + '"></div><div class=" col-7 "><div style="padding-top: 1em; font-size: 150%;"><b>' + us.userName + '</b></div></div><div style="text-align: center; padding-top: 1em;width: 100%;">' + boton + '</div></div></div><div style="padding-top: 0.5em;" class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Name:</div><div class=" col-7" style="padding-left: 0em; color: #969FAA"><div>' + us.NAME + '</div></div></div></div><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Surname:</div><div class=" col-7" style="padding-left: 0em; color: #969FAA"><div>' + us.surname + '</div></div></div></div><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Email:</div><div class=" col-7" style="padding-left: 0em; padding-bottom: 1em; color: #969FAA"><div>' + us.email + '</div></div></div></div></div>');
                            cont.appendChild(userCard);
                        }
                        let deleteBtn = document.getElementById("follow-button");
                        if (follow) {
                            deleteBtn.onclick = handleDelete;
                        } else {
                            deleteBtn.onclick = handlefollow;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        messageRenderer.showErrorAsAlert(error)
                    });

            })
            .catch(error => {
                console.log(error);
                boton = '<button type=" submit " style="border-radius: 40px; background-color: white; color: #969FAA; border-color: #969FAA; width: 50%;"class=" btn btn-primary " id="follow-button">Follow</button>'

                //messageRenderer.showErrorAsAlert(error)
                userProfile.getProfile(idUser)
                .then(user => {
                    cont.removeChild(spiner);
                    console.log(user);
                    for (let us of user) {
                        var userCard = parseHTML('<div style="background-color: #BDD4F2 ;"><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; padding-top: 0.5em;"><img class="img-fluid;border-style: outset;" height="75" width="75" src="' + us.profilePictureUrl + '"></div><div class=" col-7 "><div style="padding-top: 1em; font-size: 150%;"><b>' + us.userName + '</b></div></div><div style="text-align: center; padding-top: 1em;width: 100%;">' + boton + '</div></div></div><div style="padding-top: 0.5em;" class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Name:</div><div class=" col-7" style="padding-left: 0em; color: #969FAA"><div>' + us.NAME + '</div></div></div></div><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Surname:</div><div class=" col-7" style="padding-left: 0em; color: #969FAA"><div>' + us.surname + '</div></div></div></div><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Email:</div><div class=" col-7" style="padding-left: 0em; padding-bottom: 1em; color: #969FAA"><div>' + us.email + '</div></div></div></div></div>');
                        cont.appendChild(userCard);
                    }
                    let deleteBtn = document.getElementById("follow-button");
                    
                     
                        deleteBtn.onclick = handlefollow;
                    
                })
                .catch(error => {
                    console.log(error);
                    messageRenderer.showErrorAsAlert(error)
                });

            });
    } else {
        userProfile.getProfile(idUser)
            .then(user => {
                cont.removeChild(spiner);
                console.log(user);
                for (let us of user) {
                    var userCard = parseHTML('<div style="background-color: #BDD4F2 ;"><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; padding-top: 0.5em;"><img class="img-fluid;border-style: outset;" height="75" width="75" src="' + us.profilePictureUrl + '"></div><div class=" col-7 "><div style="padding-top: 1em; font-size: 150%;"><b>' + us.userName + '</b></div></div><div style="text-align: center; padding-top: 1em;width: 100%;">' + boton + '</div></div></div><div style="padding-top: 0.5em;" class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Name:</div><div class=" col-7" style="padding-left: 0em; color: #969FAA"><div>' + us.NAME + '</div></div></div></div><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Surname:</div><div class=" col-7" style="padding-left: 0em; color: #969FAA"><div>' + us.surname + '</div></div></div></div><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Email:</div><div class=" col-7" style="padding-left: 0em; padding-bottom: 1em; color: #969FAA"><div>' + us.email + '</div></div></div></div></div>');
                    cont.appendChild(userCard);
                }

            })
            .catch(error => {
                console.log(error);
                messageRenderer.showErrorAsAlert(error)
            });
    }


    console.log(cont2);
    userPictures.getPicturesApi(idUser)
        .then(picture => {
            console.log(picture);
            var pictureCard = '';
            pictureCard = pictureCard + '<div class="row">';
            for (let photo of picture) {

                pictureCard = pictureCard + '<div class=" col-4"><img onclick="irFoto(' + photo.pictureId + ')"; class="img-fluid;border-style: outset;" style="width: 100%;height: auto;margin-bottom:1em" src="' + photo.url + '"></div>';

            }
            pictureCard = pictureCard + '</div>';

            pictureCard = parseHTML(pictureCard);
            console.log(pictureCard);

            cont2.appendChild(pictureCard);



        })
        .catch(error => {
            console.log(error);
            messageRenderer.showErrorAsAlert(error)
        });

}
document.addEventListener("DOMContentLoaded", main);


function handleDelete() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let loggedUser = sessionManager.getLoggedUser();
    let followerId = loggedUser.userId;
    console.log(followerId);
    let accountOwnerId = urlParams.get('id');
    let answer = confirm("Do you really want unfollow this account ?");
    if (answer) {
        userProfile.deleteFollow(followerId, accountOwnerId)
            .then(data => console.log(data) /*location.reload()*/)
            .catch(error => messageRenderer.showErrorAsAlert(error));
    }
}

function handlefollow(event) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let formData = new FormData();
    let accountOwnerId = urlParams.get('id');

    let loggedUser = sessionManager.getLoggedUser();
    let followerId = loggedUser.userId;
    formData.append('followerId', followerId);
    formData.append('accountOwnerId', accountOwnerId);

    console.log(followerId);
    let answer = confirm("Do you really want follow this account ?");
    if (answer) {
        userProfile.follow(formData)
            .then(data => console.log(data) /*location.reload()*/)
            .catch(error => messageRenderer.showErrorAsAlert(error));
    }
}


