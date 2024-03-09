"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { trendingApi3 } from "/js/api/trending.js";
import { messageRenderer } from "/js/renderers/messages.js";
function main() {
    let container2 = document.getElementById("container2");
    console.log(container2);
    var spiner=parseHTML('<div  style="text-align:center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>');
    container2.appendChild(spiner);
    trendingApi3.getAll()
        .then(categorie => {
            container2.removeChild(spiner);
            console.log(categorie);
            for(let category of categorie){
                if(category.categoryId!=null){
                    var categorieCard=parseHTML(`<div><div onclick="goToCategory('`+category.categoryName+`')"; `+'style="text-align:center;padding-top: 5em; font-size: x-large;"><img class="img-fluid;border-style: outset;" height="75" width="75" src="images/cupicon.png">'+category.categoryName+':'+category.categorieCount+'</div></div>');
                    container2.appendChild(categorieCard);
                }
               
            }
           
        })
        .catch(error => {console.log(error);
            messageRenderer.showErrorAsAlert(error)});
}
document.addEventListener("DOMContentLoaded", main);