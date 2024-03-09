"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { userProfile } from "/js/api/users.js";
import { userPictures } from "/js/api/users.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from './utils/session.js';

function main() {
    let loggedUser = sessionManager.getLoggedUser();
    let cont = document.getElementById("cont");
    let cont2 = document.getElementById("cont2");
    console.log(cont);
    console.log(loggedUser);

    var spiner = parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);
    userProfile.getProfile(loggedUser.userId)
    .then(user => {
        cont.removeChild(spiner);
        console.log(user);
        for (let us of user) {
            var userCard = parseHTML('<div style="background-color: #BDD4F2 ;"><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; padding-top: 0.5em;"><img class="img-fluid;border-style: outset;" height="75" width="75" src="'+us.profilePictureUrl+'"></div><div class=" col-7 "><div style="padding-top: 1em; font-size: 150%;"><b>'+us.userName+'</b></div></div></div></div><div style="padding-top: 0.5em;" class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Name:</div><div class=" col-7" style="padding-left: 0em; color: #969FAA"><div>'+us.NAME+'</div></div></div></div><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Surname:</div><div class=" col-7" style="padding-left: 0em; color: #969FAA"><div>'+us.surname+'</div></div></div></div><div class=" container "><div class="row"><div class=" col-3 offset-2 " style="text-align: right; color: #969FAA">Email:</div><div class=" col-7" style="padding-left: 0em; padding-bottom: 1em; color: #969FAA"><div>'+us.email+'</div></div></div></div></div>');
            cont.appendChild(userCard);
        }

    })
    .catch(error => {
        console.log(error);
        messageRenderer.showErrorAsAlert(error)
    });


    console.log(cont2);
    var pictureCard='';

    userPictures.myPicturesApi(loggedUser.userId)
    .then(picture => {
        console.log(picture);
        pictureCard=pictureCard+'<div class="row"><div class=" col-4"><button onclick="UpNewPhoto()";"type= "button" style="width:100%;height:100%"class="btn btn-light"> ➕ Add a photo </button ></div>';
        for (let photo of picture) {

            pictureCard=pictureCard+'<div class=" col-4"><img onclick="irFoto('+photo.pictureId+')"; onclick="irFoto('+photo.pictureId+')"; class="img-fluid;border-style: outset;" style="width: 100%;height: auto;margin-bottom:1em" src="'+photo.url+'"></div>';

        }
        pictureCard=pictureCard+'</div>';

        pictureCard=parseHTML(pictureCard);
            console.log(pictureCard);

            cont2.appendChild(pictureCard);



    })
    .catch(error => {
        console.log(error);
        //no photos case
        if(error=='Not found'){
            pictureCard='<div class="row"><div class=" col-4"><button onclick="UpNewPhoto()";"type= "button" style="width:100%;height:100%;min-height:20em" class="btn btn-light"> ➕ Add a photo </button ></div></div>';
            pictureCard=parseHTML(pictureCard);
            console.log(pictureCard);

            cont2.appendChild(pictureCard);

        }else{
            messageRenderer.showErrorAsAlert(error)
        }
        
    });


}
document.addEventListener("DOMContentLoaded", main);