
"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { categorieApi } from "/js/api/categories.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from './utils/session.js';

function main() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let categorieName = urlParams.get('categorieName');
    console.log(categorieName);
    let loggedUser = sessionManager.getLoggedUser();
    let userId=null;
    if(loggedUser){
        userId=loggedUser.userId;
    }

    if(categorieName==undefined || categorieName.length==0){
        return false;
    }
    console.log(categorieName);
    let cont = document.getElementById("cont");
    console.log(cont);
    var spiner=parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);
    categorieApi.getByCat(categorieName)
        .then(picture => {
            cont.removeChild(spiner);
            console.log(picture);
            var pictureCard='';
            pictureCard=pictureCard+'<div class="row">';
            for(let photo of picture){
             
                pictureCard=pictureCard+'<div class=" col-4"><img onclick="irFoto('+photo.pictureId+","+userId+","+photo.userId+')";class="img-fluid;border-style: outset;" style="width: 100%;height: auto;margin-bottom:1em" src="'+photo.url+'"></div>';
                
            }
            pictureCard=pictureCard+'</div>';

            pictureCard=parseHTML(pictureCard);
            console.log(pictureCard);

            cont.appendChild(pictureCard);

        })
        .catch(error => {console.log(error);
            messageRenderer.showErrorAsAlert(error)});
  
}
document.addEventListener("DOMContentLoaded", main);


