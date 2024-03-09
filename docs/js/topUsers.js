
"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { trendingApi5 } from "/js/api/trending.js";
import { messageRenderer } from "/js/renderers/messages.js";
function main() {
    let container4 = document.getElementById("container4");
    console.log(container4);
    var spiner=parseHTML('<div  style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    container4.appendChild(spiner);
    trendingApi5.getAll()
        .then(user => {
            container4.removeChild(spiner);
            console.log(user);
            for(let users of user){
                var userCard=parseHTML('<div><div style="text-align:center;padding-top: 5em; font-size: x-large;"><img onclick="irPerfil('+users.userId+')"; class="img-fluid;border-style: outset;" height="75" width="75" src="'+users.profilePictureUrl+'">'+users.userName+':'+users.newRating+'</div></div>');
                container4.appendChild(userCard);
            }
           
        })
        .catch(error => {console.log(error);
            messageRenderer.showErrorAsAlert(error)});
}
document.addEventListener("DOMContentLoaded", main);