"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { userProfile } from "/js/api/users.js";
import { pictureIdApi } from "/js/api/picture.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from './utils/session.js';

const errorsDiv = document.getElementById("errors");
const pictureForm = document.getElementById("uploadPhotoform");

function main() {

    
    
    let loggedUser = sessionManager.getLoggedUser();
    if(loggedUser==null){
        messageRenderer.showErrorAsAlert("You do not have permission to enter this page");
        return false;
    }

    pictureForm.addEventListener("submit", function (event) {
        sendPhoto(event);
    });
    let cont = document.getElementById("cont");
    console.log(cont);
    console.log(loggedUser);

    var spiner = parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);
    userProfile.getProfile(loggedUser.userId)
        .then(user => {
            cont.removeChild(spiner);
            console.log(user);
            for (let us of user) {
                var userCard = parseHTML('<div><div class="row"><div class=" col-3 offset-2 " style="text-align: right; padding-top: 0.5em;"><img class="img-fluid;border-style: outset;" height="60" width="60" src="' + us.profilePictureUrl + '"></div><div class=" col-7 "><div style="padding-top: 1em; font-size: 150%;">' + us.userName + '</div></div></div><div style="margin-top: 1em; text-align: center;"><input type="url" name="url" style="display:initial; width: 50%" type="text" class=" form-control " size="40"placeholder="Photo URL..."></div><div style="margin-top: 1em; text-align: center;"><input type="text" name="title" style="display:initial; width: 50%" type="text"class=" form-control " size="40"  placeholder="Title..."></div><div style="margin-top: 1em; text-align: center;"><textarea type="text" style="display:initial; width: 50%"type="text" class=" form-control " name="description" size="40"placeholder="Description..."></textarea></div><div class=" container "><div class="row"><div class=" col-6 col-md-4 offset-md-2 "style="text-align: right; color: #969FAA; padding-top: 0.5em; ">Chose visibility:</div><div class=" col-6" style="padding-left: 0em;"><div style="padding-top: 0.5em;"><label class="switch"><input name ="visibility" id="visibility" type="checkbox"><span class="slider round"></span></label></div></div></div></div></div></div>');
                cont.appendChild(userCard);
            }

        })
        .catch(error => {
            console.log(error);
            messageRenderer.showErrorAsAlert(error)
        });

    let selector = document.getElementById("selector");

}
document.addEventListener("DOMContentLoaded", main);

///////////////////////////////////////////////////////////////////////////////

function sendPhoto(event) {
    event.preventDefault();
    errorsDiv.innerHTML = "";
    console.log(pictureForm);
    
    let formData = new FormData(pictureForm);
    console.log(formData.values());

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let loggedUser = sessionManager.getLoggedUser();
    console.log(loggedUser);
    formData.append('userId', loggedUser.userId);

    const yourDate = new Date()
    formData.append('uploadDate', yourDate.toISOString().split('T')[0]);
    console.log(formData.get('visibility'));
    if (formData.get('visibility') == 'on') {
        formData.set('visibility', 'PUBLIC');
    } else {
        formData.set('visibility', 'PRIVATE');
    }

    let url = formData.get("url");
    if (url == null || url.trim().length<4) {
        messageRenderer.showErrorAsAlert('invalid photo url')
        return false;
    }

    let title = formData.get("title");
    if (title == null || title.trim().length<4) {
        messageRenderer.showErrorAsAlert('a photo must have a title')
        return false;
    }

    let description = formData.get("description");
    if (description == null || title.trim().length<4) {
        messageRenderer.showErrorAsAlert('a photo must have a description')
        return false;
    }

    sendPhotoPost(formData);
}



function sendPhotoPost(formData) {

    console.log(formData);
    let title = formData.get("title");

   
    pictureIdApi.postPhoto(formData)
        .then(res => {
            location.href = "/myProfile.html";

            console.log(res);
        })
        .catch(error => messageRenderer.showErrorAsAlert(error));
}