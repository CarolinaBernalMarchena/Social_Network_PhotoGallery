"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { artistsApi } from "/js/api/artists.js";
import { messageRenderer } from "/js/renderers/messages.js";

function main() {
   
    let cont = document.getElementById("cont");
    console.log(cont);
    
    var spiner=parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);

    artistsApi.getAll()
    .then(artists => {
        cont.removeChild(spiner);
        console.log(artists);
        for(let art of artists){
            var artistsCard=parseHTML('<div class="card" style="margin:auto;margin-top:2em;width:300px">'+
            '<img "class="card-img-top" style="width: auto;height: auto;padding:1em" height="500" width="305" src="'+art.photoURL+'">'+
            '<div style="text-align:center;padding: 1em">'+
            art.name+', '+art.genre +'<div>' + new Date(art.debutDate).toDateString() + '<div>'+art.shortBio+'</div></div><div><div class="card" style="text-align:center;"></div></div>');
            cont.appendChild(artistsCard);
        }
       
    })
    .catch(error => {console.log(error);
        messageRenderer.showErrorAsAlert(error)});
}
document.addEventListener("DOMContentLoaded", main);

