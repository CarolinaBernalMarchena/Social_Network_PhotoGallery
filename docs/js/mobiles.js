"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { mobilesApi } from "/js/api/mobiles.js";
import { messageRenderer } from "/js/renderers/messages.js";


function main() {
    let cont = document.getElementById("cont");
    console.log(cont);

    mobilesApi.getAll()
    .then(mobil => {
        for (let ml of mobil) {
            var mobilCard = parseHTML('<div class=" container "><div class="row"><img class="img-fluid; border-style: outset;" div style="padding-top: 5em; padding-right: 10em; padding-bottom: 3em; text-align:center" height="375" width="375" src="'+ml.photoURL+'">'+ml.model+'' + new Date(ml.releaseDate).toDateString() + ', '+ml.system+'</div>');
            cont.appendChild(mobilCard);
        }

    })
    .catch(error => {
        console.log(error);
        messageRenderer.showErrorAsAlert(error)
    });

}
document.addEventListener("DOMContentLoaded", main);

