
"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { trendingApi4 } from "/js/api/trending.js";
import { messageRenderer } from "/js/renderers/messages.js";
function main() {
    let container3 = document.getElementById("container3");
    console.log(container3);
    var spiner=parseHTML('<div  style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    container3.appendChild(spiner);
    trendingApi4.getAll()
        .then(user => {
            container3.removeChild(spiner);
            console.log(user);
            for(let follower of user){
                var followerCard=parseHTML('<div><div style="text-align:center;padding-top: 5em; font-size: x-large;"><img onclick="irPerfil('+follower.userId+')"; class="img-fluid;border-style: outset;" height="75" width="75" src="'+follower.profilePictureUrl+'">'+follower.userName+':'+follower.followers+'</div></div>');
                container3.appendChild(followerCard);
            }
           
        })
        .catch(error => {console.log(error);
            messageRenderer.showErrorAsAlert(error)});
}
document.addEventListener("DOMContentLoaded", main);