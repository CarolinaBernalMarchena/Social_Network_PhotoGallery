'use strict';

import { authAPI } from './api/auth.js';
import { sessionManager } from './utils/session.js';
import { messageRenderer } from './renderers/messages.js';

// DOM elements that we will use
const loginForm = document.getElementById("form");
const errorsDiv = document.getElementById("errors");

// Main function that will run when the page is ready
function main() {
    // Handle the form's submit event
    loginForm.addEventListener("submit", function (event) {
        handleSubmitLogin(event);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    main();
});

///////////////////////////////////////////////////////////////////////////////

function handleSubmitLogin(event) {
    // Prevent the browser from sending the form on its own,
    // because we'll do it using AJAX
    event.preventDefault();
    errorsDiv.innerHTML = "";

    let formData = new FormData(loginForm);
    
    let firstName = formData.get ("name") ;
    if(firstName==null || firstName.trim().length<2){
        messageRenderer.showErrorAsAlert('invalid name')
        return false;
    }

    let surname = formData.get ("surname") ;
    if(surname==null || surname.trim().length<2){
        messageRenderer.showErrorAsAlert('invalid surname')
        return false;
    }

    let phoneNumber = formData.get ("phoneNumber") ;
    if(phoneNumber==null || phoneNumber.trim().length<8){
        console.log(phoneNumber);
        messageRenderer.showErrorAsAlert('invalid phone number')
        return false;
    }
    
    let email = formData.get ("email") ;
    if(email==null || email.trim().length<4){
        messageRenderer.showErrorAsAlert('invalid email')
        return false;
    }

    let username = formData.get ("username") ;
    if(username==null || username.trim().length<3){
        messageRenderer.showErrorAsAlert('invalid username')
        return false;
    }

    let password = formData.get ("PASSWORD") ;
    if(password==null || password.trim().length<8){
        messageRenderer.showErrorAsAlert('invalid password')
        return false;
    }

    let profilePictureUrl = formData.get ("profilePictureUrl") ;
    if(profilePictureUrl==null || profilePictureUrl.trim().length<4){
        messageRenderer.showErrorAsAlert('invalid profile picture')
        return false;
    }

    

    sendLogin(formData);
}

function sendLogin(formData) {
    authAPI.register(formData)
        .then(loginData => {
            //Successful login
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "recentPhotos.html";
        })
        .catch(error => {
            console.log(error);
            //caso usuario repetido
            if(error.startsWith('Duplicate ')){
                messageRenderer.showErrorAsAlert('This usurname is already taken, please choose a new one')
            }else{
                messageRenderer.showErrorAsAlert(error)

            }
        } 
        );
           
}