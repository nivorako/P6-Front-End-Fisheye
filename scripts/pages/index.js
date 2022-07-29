import { photographersFactory } from "../factories/photographers.js";
import { getPhotographer, getPhotographerMedia } from "../factories/photographer.js";
import { modal } from '../factories/modal.js';
import { displayModal, closeModal } from "../utils/contactForm.js";
import { submitForm } from '../utils/submit.js';

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

    if(photographerId){
        const mediaWrapper = document.querySelector('.photographerMedia');

        const foundPhotographers =photographers.filter(x => x.id=== parseInt(photographerId, 10));
        const foundPhotographer = foundPhotographers[0]
        getPhotographer(foundPhotographer);
        //modal();
        const btnPlay = document.querySelector('.photographerHeader__btn');
    
        btnPlay.addEventListener('click', () => {
            modal();
            displayModal();

            const btnClose = document.querySelector('.modal__close')
            btnClose.addEventListener('click', () => {
                closeModal();
            })

            const btnSubmit = document.querySelector('.modal__form')
            btnSubmit.addEventListener('submit', (e) => {
                e.preventDefault();
                submitForm();
            })
        })

        const foundPhotographerMedia = media.filter(x => x.photographerId=== parseInt(photographerId, 10));
        console.log('foundPhotographerMedia: ', foundPhotographerMedia)
        
        foundPhotographerMedia.forEach(media =>{
            const template = getPhotographerMedia(media, foundPhotographer);
            mediaWrapper.appendChild(template);
        })
        
    }else{
        displayPhotographerData(photographers);
    }

    
   
};

init();