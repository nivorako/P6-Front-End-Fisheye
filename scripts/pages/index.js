import { photographersFactory } from "../factories/photographers.js";
import { getPhotographer, getPhotographerMedia } from "../factories/photographer.js";
//import { modal } from '../factories/modal.js';
import { displayModal, closeModal } from "../utils/contactForm.js";
import { submitForm } from '../utils/submit.js';
import { carrousel } from '../factories/carrousel.js';
import { displayCarrousel } from "../utils/carrousel.js";
import { likes } from '../factories/likes.js';

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

function displayPhotographerData(photographers) {
    const photographersSection = document.querySelector(".photographers_section");
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

    const current_url_query = window.location.search;
    const photographerId = current_url_query.slice(1);

    // page photographer
    if(photographerId){
        const mediaWrapper = document.querySelector('.photographerMedia');

        const foundPhotographers =photographers.filter(x => x.id=== parseInt(photographerId, 10));
        const foundPhotographer = foundPhotographers[0]

        // partie photograher header
        getPhotographer(foundPhotographer);
        const btnPlay = document.querySelector('.photographerHeader__btn');
        
        // modal element
        btnPlay.addEventListener('click', () => {
            // display & create modal
            displayModal();

            // sbmit modal
            const formSubmit = document.querySelector('.modal__form')
            formSubmit.addEventListener('submit', (e) => {
                e.preventDefault();
                submitForm();
            })

            const btnClose = document.querySelector('.modal__close')
            btnClose.addEventListener('click', () => {
                closeModal();
            })

            // fermer modal avec echap
            const modalElt = document.querySelector('.modal');
            window.addEventListener("keydown", (event) => {
            
                if(modalElt.getAttribute("aria-hidden") !== "false") return;
                if(event.keyCode !== 27 && event.code !== "Escape") return;
                closeModal();
            })

            // si modal ouvert, tab reste dans modal

            // récup modalForm
            const modalForm = document.querySelector('.modal__form');
            
            const inputElt = document.querySelectorAll('.input');

            const inputEltLength = inputElt.length;
            // récup firstElt
            const firstInputElt = inputElt[0];
            // récup lastElt
            const lastInputElt = inputElt[inputEltLength - 1];
            
            // modalElt.addEventListener('keydown', )
            modalForm.addEventListener('keydown', (e) => {
                 // si key === tab
                 if(e.key === "Tab" || e.keyCode === 9){
                    // si key === shift ( shift )
                    if(e.shiftKey){
                        //si firstElt === document.activeElement
                        if(document.activeElement === firstInputElt){
                            // mettre focus sur lastElt
                            e.preventDefault();
                            lastInputElt.focus();
                        }
                        // sinon ( tab )
                    }else{
                         // si lastElt === document.activeElement
                         if(document.activeElement === lastInputElt){
                             // mettre focus sur firstElt
                             e.preventDefault();
                             firstInputElt.focus();
                         }  
                    }   
                 }
            })
        })

        // partie photographer main
        const foundPhotographerMedia = media.filter(x => x.photographerId=== parseInt(photographerId, 10));
        
        foundPhotographerMedia.forEach(media =>{
            const template = getPhotographerMedia(media, foundPhotographer);

            mediaWrapper.appendChild(template);
        })

         // likes element
         likes(foundPhotographerMedia, foundPhotographer);

        // incrémenter likes à chaque click sur icone
        const likeIncrements = document.querySelectorAll('.faLikeIncrement');
        const photographerLikes = document.querySelectorAll('.photographerLikes');
        const photographerLikesLength = photographerLikes.length;


        for(let i = 0; i < photographerLikesLength; i++){
            // on ne peut cliquer qu une seule fois : data-increment="true"
            likeIncrements[i].addEventListener("click", () => {
                if(likeIncrements[i].getAttribute("data-increment") === 'false')
                photographerLikes[i].textContent++;
                likeIncrements[i].setAttribute('data-increment', 'true')
            })
            // accessibilité: incrémenter une seule fois likes si enter sur icone
            likeIncrements[i].addEventListener('keydown', (e) => {
                if(e.key === "Enter" || e.keyCode === 13){
                    if(likeIncrements[i].getAttribute("data-increment") === 'false')
                    photographerLikes[i].textContent++;
                    likeIncrements[i].setAttribute('data-increment', 'true')
                }
            })
        }

        // carrousel element
        const photos = document.querySelectorAll('.photographerMedia__img');
        photos.forEach(photo => photo.addEventListener('click', () => {
            
            carrousel(foundPhotographerMedia, foundPhotographer);
            displayCarrousel();   
            
            const leftArrow = document.querySelector('.fa-chevron-circle-left');
            const rightArrow = document.querySelector('.fa-chevron-circle-right');
            const closeBtn = document.querySelector('.carrousel__close');

            let images = document.querySelectorAll('.carrousel__item');
            let nbrImg = images.length;
            let step = 0;

            images[0].classList.add("active");

            function removeActiveImage(){
                for(let i=0; i<nbrImg; i++){
                    images[i].classList.remove("active");
                  }
            }        

            leftArrow.addEventListener('click', () => {
                step++;
                if(step >= nbrImg){
                    step = 0;
                }
                
                removeActiveImage()
                images[step].classList.add('active')
            })
        
            rightArrow.addEventListener('click', () => {
                if(step == 0){
                    step = nbrImg;
                }
                step--;
                removeActiveImage();
                images[step].classList.add('active');
            })
            closeBtn.addEventListener('click', () => {
                alert('hello')
            })
        }))
        
    }else{
        // page principale
        displayPhotographerData(photographers);
        // si displayPhotographerData alors piéger focus dans la page
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