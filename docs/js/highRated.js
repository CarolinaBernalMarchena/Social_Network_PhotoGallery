"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { trendingApi } from "/js/api/trending.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from './utils/session.js';

function main() {
    let container = document.getElementById("container");
    console.log(container);
    let loggedUser = sessionManager.getLoggedUser();
    let userId=null;
    if(loggedUser){
        userId=loggedUser.userId;
    }
    
    var spiner=parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    container.appendChild(spiner);
    trendingApi.getAll()
        .then(photos => {
            container.removeChild(spiner);
            console.log(photos);
            for(let photo of photos){
                if(photo.pictureId!=null){
                    var pictureCard=parseHTML('<div><div style="text-align:center;padding-top: 5em;padding-right: 200px; font-size: x-large;"><img class="img-fluid;border-style: outset;" height="75" width="75" src="images/cupicon.png">'+photo.newValue+'✰</div><div style="text-align:center;"><img onclick="irFoto('+photo.pictureId+","+userId+","+photo.userId+')"; class="img-fluid" style="padding: 1em; padding-bottom: 8em;border: solid;border-style: outset;" height="305" width="305" src="'+photo.url+'"></div></div>');
                    container.appendChild(pictureCard);
                }

            }
           
        })
        .catch(error => {console.log('Error');
            messageRenderer.showErrorAsAlert(error)});
}
document.addEventListener("DOMContentLoaded", main);
