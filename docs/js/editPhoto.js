"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { userProfile } from "/js/api/users.js";
import { categorieApi2 } from "/js/api/categories.js";
import { pictureIdApi } from "/js/api/picture.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from './utils/session.js';

const errorsDiv = document.getElementById("errors");
const pictureForm = document.getElementById("editPhotoform");
const categoryForm = document.getElementById("categoryForm");

async function main() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idPhoto = urlParams.get('id');
    pictureForm.addEventListener("submit", function (event) {
        sendPhoto(event);
    });

    categoryForm.addEventListener("submit", function (event) {
        sendCategory(event);
    });
    let categoriasActuales=null;
    await categorieApi2.getPhotoCategories(idPhoto)
        .then(res => {
            console.log(res);
            categoriasActuales=res;
        }).catch(error => console.log('sin cate'));

    
    
    let cont = document.getElementById("cont");
    let loggedUser = sessionManager.getLoggedUser();
    if(loggedUser==null){
        messageRenderer.showErrorAsAlert("You do not have permission to enter this page");
        return false;
    }
    console.log(cont);

    var spiner = parseHTML('<div style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    cont.appendChild(spiner);
    userProfile.getProfile(loggedUser.userId)
    pictureIdApi.getById(idPhoto)
        .then(user => {
            cont.removeChild(spiner);
            console.log(user);
            for (let us of user) {
                var userCard = parseHTML('<div><div class="row"><div class=" col-3 offset-2 " style="text-align: right; padding-top: 0.5em;"><img class="img-fluid;border-style: outset;" height="60" width="60" src="' + us.profilePictureUrl + '"></div><div class=" col-7 "><div style="padding-top: 1em; font-size: 150%;">' + us.userName + '</div></div></div><div style="margin-top: 1em; text-align: center;"><input type="url" name="url" value="' + us.url + '"style="display:initial; width: 50%" type="text" class=" form-control " size="40"placeholder="Photo URL..."></div><div style="margin-top: 1em; text-align: center;"><input value="' + us.title + '" style="display:initial; width: 50%" type="text"class=" form-control " name="title" size="40"  placeholder="Title..."></div><div style="margin-top: 1em; text-align: center;"><textarea style="display:initial; width: 50%"type="text" class=" form-control " name="description" size="40"placeholder="Description...">' + us.description + '</textarea></div><div class=" container "><div class="row"><div class=" col-6 col-md-4 offset-md-2 "style="text-align: right; color: #969FAA; padding-top: 0.5em; ">Chose visibility:</div><div class=" col-6" style="padding-left: 0em;"><div style="padding-top: 0.5em;"><label class="switch"><input name ="visibility" id="visibility" type="checkbox"><span class="slider round"></span></label></div></div></div></div></div>');
                cont.appendChild(userCard);
            }

        })
        .catch(error => {
            console.log(error);
            messageRenderer.showErrorAsAlert(error)
        });

    let selector = document.getElementById("selector");

    categorieApi2.getById()
        .then(categories => {
            console.log(categories);
            for (let categorie of categories) {
                var userCard = parseHTML('<option value="' + categorie.categoryId + '">' + categorie.categoryName + '</option>');
                selector.appendChild(userCard);
            }
            if(categoriasActuales!=null){
                const categories2 = document.getElementById("selector");
                for (let selected of categories2.options) {
                    for(let cat of categoriasActuales){
                        if(selected.value == cat.categoryId){
                            selected.selected=true;
                            break;
                        }
                    }
                   
                }
            }
           
        })
        .catch(error => {
            console.log(error);
            messageRenderer.showErrorAsAlert(error)
        });

}
document.addEventListener("DOMContentLoaded", main);

/*##########################################################################################*/

function sendPhoto(event) {
    event.preventDefault();
    errorsDiv.innerHTML = "";
    console.log(pictureForm);
    let formData = new FormData(pictureForm);
    console.log(formData.values());

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idPhoto = urlParams.get('id');

    let loggedUser = sessionManager.getLoggedUser();
    console.log(loggedUser);
    formData.append('userId', loggedUser.userId);

    const yourDate = new Date()
    formData.append('uploadDate', yourDate.toISOString().split('T')[0]);
    console.log(formData.get('visibility'));
    if (formData.get('visibility') == 'on') {
        formData.set('visibility', 'PUBLIC');
    } else {
        formData.set('visibility', 'PRIVATE');
    }
    const categories = document.getElementById("selector");
    let catSelected = [];
    for (let selected of categories.selectedOptions) {
        catSelected.push(selected.value)
    }
    console.log(catSelected);

    let url = formData.get("url");
    if (url == null || url.trim().length < 4) {
        messageRenderer.showErrorAsAlert('invalid photo url')
        return false;
    }

    let title = formData.get("title");
    if (title == null || title.trim().length < 4) {
        messageRenderer.showErrorAsAlert('a photo must have a title')
        return false;
    }

    let description = formData.get("description");
    if (description == null || title.trim().length < 4) {
        messageRenderer.showErrorAsAlert('a photo must have a description')
        return false;
    }

    sendPhotoPut(formData, idPhoto, catSelected);
}

async function sendPhotoPut(formData, idPhoto, catSelected) {

    //borro las categorias
    await categorieApi2.deleteCategories(idPhoto)
        .then(res => {
            console.log(res);
        }).catch(error => messageRenderer.showErrorAsAlert(error));

    //anado las catetogiras
    for (let selected of catSelected) {
        let formdata2=new FormData();
        formdata2.append('pictureId', idPhoto);
        formdata2.append('categoryId', selected);
       
        categorieApi2.postPictureCategory(formdata2)
            .then(res => {
                console.log(res);
            }).catch(error => messageRenderer.showErrorAsAlert(error));
    }
    let description = formData.get("description");

  

    await pictureIdApi.putPhoto(formData, idPhoto)
        .then(res => {
            window.location.href = "myProfile.html";
            console.log(res);
        }).catch(error => messageRenderer.showErrorAsAlert(error));
}
/*###########################################################################################*/

function sendCategory(event) {
    event.preventDefault();
    errorsDiv.innerHTML = "";
    console.log(categoryForm);
    let formData = new FormData(categoryForm);
    console.log(formData.values());

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    categoryPost(formData);
}

//creo nueva categoria
function categoryPost(formData) {
    console.log(formData);
    categorieApi2.postCategory(formData)
        .then(res => {
            console.log(res);
            location.reload();

        })
        .catch(error => {
            console.log(error);
            //caso categoria repetida
            if(error.startsWith('Duplicate ')){
                messageRenderer.showErrorAsAlert('This category already exist')
            }else{
                messageRenderer.showErrorAsAlert(error)

            }
        } 
        );
        
}