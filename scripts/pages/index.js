import { photographersFactory } from "../factories/photographers.js";
import { getPhotographer } from "../factories/photographer.js";
import { displayModal, closeModal } from "../utils/modal.js";
import { submitForm } from '../utils/submit.js';
import { sorter } from '../factories/sorter.js';
import { displaySelectedItem} from "../utils/sorterSelect.js";

// extraire data de ./data/photographers.json
async function getPhotographers() {
   const photographersApi = await fetch("./data/photographers.json")
                                .then(res => res.json())
                                .then(function(res) {
                                    let photographers = res.photographers;
                                    let media = res.media;
                                    return {
                                        photographers,
                                        media
                                    }
                                })
                                .catch(err => console.log("Error to occur: ", err));                         
    return photographersApi;
}

// afficher page acceuil
function displayPhotographerData(photographers) {
    const photographersSection = document.querySelector(".photographersSection");
    photographers.forEach((photographer) => {
        const photographerModel = photographersFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {

    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    // récupérer id courrant de photographer
    const current_url_query = window.location.search;
    const photographerId = current_url_query.slice(1);



    // page photographer
    if(photographerId){
        const mediaWrapper = document.querySelector('.photographerMedia');

        const foundPhotographers =photographers.filter(x => x.id=== parseInt(photographerId, 10));
        const foundPhotographer = foundPhotographers[0]

        // partie photograher header
        getPhotographer(foundPhotographer);

       
        // MODAL

        // modal element
        const btnPlay = document.querySelector('.photographerHeader__btn');   
        btnPlay.addEventListener('click', () => {

            // display & create modal
            displayModal(foundPhotographer); 
            
            // fermer modal si on click en dehors
            const modal = document.querySelector('.modal')
            if(modal.style.display === "block"){
                document.addEventListener('click', (e) => {
                    if(!e.target.closest ('.modal')){   
                        closeModal()
                    }
                
                }, true)
            }
           
            // submit modal
            const formSubmit = document.querySelector('.modal__form')
            formSubmit.addEventListener('submit', (e) => {
                e.preventDefault();
                submitForm();
            })

            // fermer modal avec clic btnclose et keydown enter
            const btnClose = document.querySelector('.modal__close')
            btnClose.addEventListener('click', () => {   
                closeModal();
            })
            btnClose.addEventListener('keydown', (e) => {
                if(e.key === "Enter" || e.keyCode === 13){
                    closeModal()
                }
            })

            // fermer modal avec echap
            const modalElt = document.querySelector('.modal');
            window.addEventListener("keydown", (event) => {
            
                if(modalElt.getAttribute("aria-hidden") !== "false") return;
                if(event.keyCode !== 27 && event.code !== "Escape") return;
                closeModal();
            })

            // piege le focus dans modal 
            const modalForm = document.querySelector('.modal__form');           
            modalForm.addEventListener('keydown', (e) => {

                const modal = document.querySelector('.modal');
                const focusElets = '[tabindex]:not([tabindex="-1"]';
                const modalFocusElts = modal.querySelectorAll(focusElets);
                
                console.log("modal focus elt: ", modalFocusElts)
                const modalFocusEltsLength = modalFocusElts.length;
                const firstmodalFocusElt = modalFocusElts[0];
                const lastmodalFocusElt = modalFocusElts[modalFocusEltsLength - 1];
                console.log('first: ', firstmodalFocusElt)
                console.log('last: ', lastmodalFocusElt)

                if(e.key === "Tab" || e.keyCode === 9){ 
                    if(e.shiftKey){
                        if(document.activeElement === firstmodalFocusElt){
                            e.preventDefault();
                            lastmodalFocusElt.focus();
                        }
                    }else{
                         if(document.activeElement === lastmodalFocusElt){
                             e.preventDefault();
                             firstmodalFocusElt.focus();
                         }  
                    }   
                }


                // si document.activeElement === (submit) et e.key === enter alors submit
                if((document.activeElement === lastInputElt) && (e.key === "Enter" || e.keyCode === 13)){
                    e.preventDefault();
                    submitForm();
                }

            })    
        })


        // SORTER
        const foundPhotographerMedia = media.filter(x => x.photographerId=== parseInt(photographerId, 10));
        sorter(foundPhotographerMedia, foundPhotographer);


        // PHOTOGRAPHER__MEDIA

        // display sorter selected, install clic and keydown event in each elt
        // set likes elt 
        const sorterSelected = document.querySelector('.sorter__selectedText').innerHTML;
        displaySelectedItem(sorterSelected, foundPhotographerMedia, foundPhotographer);

        
    }else{
        // sinon page principale
        displayPhotographerData(photographers);

        // mettre le focus sur logo (1er element)
        const logo = document.querySelector('.header__link');
        logo.focus();
        // si displayPhotographers alors piéger focus dans la page : Le focus reste bloqué dans video,
        // entre <img/> et <div class="photographerMedia__comment" > 
        const photographersBody = document.getElementById('body');
    
        const focusablePhotographerEltsString = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
        const focusablePhotographerElts = photographersBody.querySelectorAll(focusablePhotographerEltsString);
        const focusablePhotographerEltsLength = focusablePhotographerElts.length
        
        const firstFocusable = focusablePhotographerElts[0]
        const lastFocusable = focusablePhotographerElts[focusablePhotographerEltsLength - 1]

        photographersBody.addEventListener('keydown', (e) => {
            if(e.key === "Tab" || e.keyCode === 9){
                if(e.shiftKey){
                    if(document.activeElement === firstFocusable){
                        e.preventDefault()
                        lastFocusable.focus()
                    }
                }else{
                    if(document.activeElement === lastFocusable){
                        e.preventDefault()
                        firstFocusable.focus()
                    }
                }
            }
        })
    }
};
init();