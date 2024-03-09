"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { artistsApi } from "/js/api/artists.js";
import { messageRenderer } from "/js/renderers/messages.js";

const errorsDiv = document.getElementById("errors");
const ArtistsForm = document.getElementById("uploadArtistform");

function main() {
    ArtistsForm.addEventListener("submit", function (event) {
        sendArtists(event);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

   ///////////////////////////////////////////////////////////////////////////////

function sendArtists(event) {
    // Prevent the browser from sending the form on its own,
    // because we'll do it using AJAX
    event.preventDefault();
    errorsDiv.innerHTML = "";

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let formData = new FormData(ArtistsForm);

    let genre = formData.get("genre");
    if (genre == "Pop" || genre == "Rock" || genre == "Electro" || genre == "Rap" || genre == "Drum & Bass" || genre == "Power Metal") {
        send(formData);
    }else{
        messageRenderer.showErrorAsAlert('The genre must be Pop, Rock, Electro, Rap, Drum & Bass or Power Metal')
        return false;
    }
}


function send(formData) {
    let genre = formData.get("genre");
    artistsApi.postArtists(formData)
        .then(artistData => {
            // Successful post

            window.location.href = "artists.html";
            console.log(artistData);
        })
        .catch(error => messageRenderer.showErrorAsAlert(error));
}