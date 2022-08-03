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
                                    let photographers = res.photographers
                                    let media = res.media
                                    return {
                                        photographers,
                                        media
                                    }
                                })
                                .catch(err => console.log("Error to occur: ", err))
    console.log("photographersApi: ", photographersApi)                          
    return photographersApi
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

        // photograher header
        getPhotographer(foundPhotographer);
        const btnPlay = document.querySelector('.photographerHeader__btn');
        
        // modal element
        btnPlay.addEventListener('click', () => {
           
            displayModal();

            const formSubmit = document.querySelector('.modal__form')
            formSubmit.addEventListener('submit', (e) => {
                e.preventDefault();
                submitForm();
            })

            const btnClose = document.querySelector('.modal__close')
            btnClose.addEventListener('click', () => {
                closeModal();
            })

            const modalElt = document.querySelector('.modal')
            window.addEventListener("keydown", (event) => {
            
                if(modalElt.getAttribute("aria-hidden") !== "false") return;
                if(event.keyCode !== 27 && event.code !== "Escape") return;
                closeModal();
            })


            // $(document).on('keydown', e => {
            //     const keyCode = e.keyCode ? e.keyCode : e.which
            //     const modal = document.getElementById('modal')
            //     if(modal.attributes("aria-hidden") === "false" && keyCode === 27){
            //         closeModal();
            //     }
            // })
        })

        const foundPhotographerMedia = media.filter(x => x.photographerId=== parseInt(photographerId, 10));
        
        foundPhotographerMedia.forEach(media =>{
            const template = getPhotographerMedia(media, foundPhotographer);

            mediaWrapper.appendChild(template);
        })

        const likeIncrements = document.querySelectorAll('.faLikeIncrement')
        const photographerLikes = document.querySelectorAll('.photographerLikes')
        const photographerLikesLength = photographerLikes.length

        for(let i = 0; i < photographerLikesLength; i++){
            likeIncrements[i].addEventListener("click", () => {
                photographerLikes[i].textContent++
            })
        }
        
        // likes element
        likes(foundPhotographerMedia, foundPhotographer);

        // carrousel element
        const photos = document.querySelectorAll('.photographerMedia__img');
        photos.forEach(photo => photo.addEventListener('click', () => {
            
            carrousel(foundPhotographerMedia, foundPhotographer);
            displayCarrousel();   
            
            const leftArrow = document.querySelector('.fa-chevron-circle-left')
            const rightArrow = document.querySelector('.fa-chevron-circle-right')
            const closeBtn = document.querySelector('.carrousel__close')

            let images = document.querySelectorAll('.carrousel__item')
            let nbrImg = images.length
            let step = 0

            images[0].classList.add("active")

            function removeActiveImage(){
                for(let i=0; i<nbrImg; i++){
                    images[i].classList.remove("active")
                  }
            }        

            leftArrow.addEventListener('click', () => {
                step++
                if(step >= nbrImg){
                    step = 0
                }
                
                removeActiveImage()
                images[step].classList.add('active')
            })
        
            rightArrow.addEventListener('click', () => {
                if(step == 0){
                    step = nbrImg
                }
                step--
                removeActiveImage()
                images[step].classList.add('active')
            })
            console.log('closeBtn: ', closeBtn)
            closeBtn.addEventListener('click', () => {
                alert('hello')
            })
        }))
        
    }else{
        displayPhotographerData(photographers);
    }

    
   
};

init();