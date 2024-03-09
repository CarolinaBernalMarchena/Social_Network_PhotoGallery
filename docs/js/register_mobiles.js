"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { mobilesApi } from "/js/api/mobiles.js";
import { messageRenderer } from "/js/renderers/messages.js";

const errorsDiv = document.getElementById("errors");
const mobileForm = document.getElementById("uploadMobileform");

function main() {
    mobileForm.addEventListener("submit", function (event) {
        sendMobile(event);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

   ///////////////////////////////////////////////////////////////////////////////

function sendMobile(event) {
    // Prevent the browser from sending the form on its own,
    // because we'll do it using AJAX
    event.preventDefault();
    errorsDiv.innerHTML = "";

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let formData = new FormData(mobileForm);

    let system = formData.get("system");
    if (system == "iPhone OS" || system == "Android") {
        send(formData);
    }else{
        messageRenderer.showErrorAsAlert('Mobile system must be Android or iPhone OS')
        return false;
    }
}


function send(formData) {
    let system = formData.get("system");
    mobilesApi.postMobile(formData)
        .then(mobileData => {
            // Successful post

            window.location.href = "mobiles.html";
            console.log(mobileData);
        })
        .catch(error => messageRenderer.showErrorAsAlert(error));
}
