
"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { pictureApi2 } from "/js/api/picture.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from './utils/session.js';

function main() {

    let loggedUser = sessionManager.getLoggedUser();
    let cont = document.getElementById("container1");
    console.log(cont);
    var spiner = parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);
    pictureApi2.getAll(loggedUser.userId)
        .then(picture => {
            cont.removeChild(spiner);
            console.log(picture);
            for (let photo of picture) {
                var pictureCard = parseHTML('<div><div style="text-align:center;padding-top: 5em;padding-right: 150px;"><img class="img-fluid;border-style: outset;" height="75" width="75" src="' + photo.profilePictureUrl + '" onclick="irPerfil('+photo.userId+')">' + photo.userName + '</div><div style="text-align:center;"><img onclick="irFoto('+photo.pictureId+')";class="img-fluid" style="padding: 1em; padding-bottom: 8em;border: solid;border-style: outset;" height="500" width="305" src="' + photo.url + '"></div></div>');
                cont.appendChild(pictureCard);
            }
            console.log(cont);

        })
        .catch(error => {
            console.log(error);
            messageRenderer.showErrorAsAlert(error)
        });
}
document.addEventListener("DOMContentLoaded", main);
