
"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { pictureApi } from "/js/api/picture.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from './utils/session.js';

function main() {
   
    let cont = document.getElementById("cont");
    console.log(cont);
    let loggedUser = sessionManager.getLoggedUser();
    let userId=null;
    if(loggedUser){
        userId=loggedUser.userId;
    }
    
    var spiner=parseHTML('<div  style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);
    pictureApi.getAll()
        .then(picture => {
            cont.removeChild(spiner);
            console.log(picture);
            for(let photo of picture){
                var pictureCard=parseHTML('<div class="card" style="margin:auto;margin-top:2em;width:300px">'+
                '<img onclick="irFoto('+photo.pictureId+","+userId+","+photo.userId+
                ')";"class="card-img-top" style="width: auto;height: auto;padding:1em" height="500" width="305" src="'+photo.url+
                '">'+
                '<div style="text-align:center;padding: 1em">'+
                '<img  height="75" width="75" src="'+photo.profilePictureUrl+'" onclick="irPerfil('+photo.userId+')">'+
                photo.userName+'</div><div class="card" style="text-align:center;"></div></div>');
                cont.appendChild(pictureCard);
            }
           
        })
        .catch(error => {console.log(error);
            messageRenderer.showErrorAsAlert(error)});

    
    let cont2 = document.getElementById("cont2");
    var buttons="";
            if(loggedUser==null){
                buttons=parseHTML('<nav class=" navbar navbar-expand-lg navbar-light bg-light "><a class= " navbar-brand " href= "#"> Navigation index </a >'+
                '<button class= " navbar-toggler " type= " button " data-toggle= " collapse "  data-target= "# navbarNav "  aria-controls= " navbarNav " aria-expanded= " false " aria-label= " Toggle navigation ">'+
                '<span class= " navbar-toggler-icon "></span >'+
                '</button >'+
                '<div class= " collapse navbar-collapse " id= " navbarNav ">'+
                '<ul class= " navbar-nav ">'+
                '<li class= " nav-item dropdown ">'+
                    '<a class= "nav-link dropdown-toggle " href= "#" id= "navbarDesplegableId" data-toggle= "dropdown" aria-haspopup= "true" aria-expanded= "false"> Trending </a >'+
                    '<div class= "dropdown-menu" aria-labelledby= "navbarDropdownMenuLink">'+
                        '<a class= "dropdown-item" href= "highestRatedPhotos.html"> Highest Rated Photos </a >'+
                        '<a class= "dropdown-item" href= "photosMoreComments.html"> Photos With More Comments </a >'+
                        '<a class= "dropdown-item" href= "categoriesMorePhotos.html"> Categories Whith More Photos </a >'+
                        '<a class= "dropdown-item" href= "usersMoreFollowers.html"> Users With More Followers </a >'+
                        '<a class= "dropdown-item" href= "topRatedUsers.html"> Top Rated Users </a >'+
                    '</div >'+
                '</li >'+
                '</ul >'+
                '</div >'+
                '</nav >');
            } else {
                buttons=parseHTML('<nav class= " navbar navbar-expand-lg navbar-light bg-light ">'+
                '<a class= " navbar-brand " href= "#"> Navigation index </a >'+
                '<button class= " navbar-toggler " type= " button " data-toggle= " collapse "  data-target= "# navbarNav "  aria-controls= " navbarNav " aria-expanded= " false " aria-label= " Toggle navigation ">'+
                '<span class= " navbar-toggler-icon "></span >'+
                '</button >'+
                '<div class= " collapse navbar-collapse " id= " navbarNav ">'+
                '<ul class= " navbar-nav ">'+
                '<li class= " nav-item ">'+
                    '<a onclick="goToCategories()" class= " nav-link " > Categories </a >'+
                '</li >'+
                '<li class= " nav-item dropdown ">'+
                    '<a class= "nav-link dropdown-toggle " href= "#" id= "navbarDesplegableId" data-toggle= "dropdown" aria-haspopup= "true" aria-expanded= "false"> Trending </a >'+
                    '<div class= "dropdown-menu" aria-labelledby= "navbarDropdownMenuLink">'+
                        '<a class= "dropdown-item" href= "highestRatedPhotos.html"> Highest Rated Photos </a >'+
                        '<a class= "dropdown-item" href= "photosMoreComments.html"> Photos With More Comments </a >'+
                        '<a class= "dropdown-item" href= "categoriesMorePhotos.html"> Categories Whith More Photos </a >'+
                        '<a class= "dropdown-item" href= "usersMoreFollowers.html"> Users With More Followers </a >'+
                        '<a class= "dropdown-item" href= "topRatedUsers.html"> Top Rated Users </a >'+
                    '</div >'+
                '</li >'+
                '<li class= " nav-item ">'+
                    '<a onclick="goToFollowing('+loggedUser.userId+')" class= " nav-link "> Following Users </a >'+
                '</li >'+
                '<li class= " nav-item ">'+
                    '<a onclick="goToMyProfile('+loggedUser.userId+')" class= " nav-link " > My Profile </a >'+
                '</li >'+
                '<li class= " nav-item dropdown ">'+
                    '<a class= "nav-link dropdown-toggle " href= "#" id= "navbarDesplegableId" data-toggle= "dropdown" aria-haspopup= "true" aria-expanded= "false"> Artists </a >'+
                    '<div class= "dropdown-menu" aria-labelledby= "navbarDropdownMenuLink">'+
                        '<a class= "dropdown-item" href= "artists.html"> Artists </a >'+
                        '<a class= "dropdown-item" href= "register_artists.html"> Register New Artists </a >'+
                    '</div >'+
                '</li >'+
                '</ul >'+
                '</div >'+
                '</nav >')
            }
            cont2.appendChild(buttons);
            
}
document.addEventListener("DOMContentLoaded", main);
