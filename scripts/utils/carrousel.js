import { photographerName } from "../factories/photographer.js";

export function displayCarrousel(media, photographer){
    // récuperer header et main header
    const headerPage = document.getElementById('header');
    const mainPage = document.getElementById('main-photographer');
    // les cacher
    headerPage.setAttribute('aria-hidden', 'true');
    mainPage.setAttribute('aria-hidden', 'true');
    headerPage.classList.add('hidden');
    mainPage.classList.add('hidden');

    const name = photographerName(photographer)
    // carrousel
    const carrousel = document.querySelector('.carrousel');
    carrousel.setAttribute('aria-hidden', 'false');
    carrousel.style.display = "block";
    // carrousel__container
    const carrouselContainer = document.createElement('div')
    carrouselContainer.classList.add("carrousel__container")
    // carrousel__close
    const carrouselClose = document.createElement('div')
    carrouselClose.classList.add('carrousel__close')
    // carrousel__closeBtn
    const closeBtn = document.createElement('i')
    closeBtn.setAttribute('tabindex', "1")
    closeBtn.classList.add('fa-window-close')
    closeBtn.classList.add('fas')
    // carrousel__items
    const carrouselItems = document.createElement('div')
    carrouselItems.classList.add('carrousel__items')
    // les arrows
    const carrouselLeftArrow = document.createElement('div')
    carrouselLeftArrow.classList.add('carrousel__arrow')

    const carrouselRightArrow = document.createElement('div')
    carrouselRightArrow.classList.add('carrousel__arrow')

    const leftArrow = document.createElement('i')
    leftArrow.setAttribute('tabindex', "1")
    leftArrow.classList.add('fa-chevron-circle-left')
    leftArrow.classList.add('fas')
    leftArrow.classList.add('arrow')

    const rightArrow = document.createElement('i')
    rightArrow.setAttribute('tabindex', "1")
    rightArrow.classList.add('fa-chevron-circle-right')
    rightArrow.classList.add('fas')
    rightArrow.classList.add('arrow')

    carrouselLeftArrow.appendChild(leftArrow)
    carrouselRightArrow.appendChild(rightArrow)

    // chargement des images carrouselItem dans carrouselItems
    // gérer le cas ou si img ou video
    const l = media.length;
    for(let i=0; i<l; i++){
        // carrousel__item--img
        const carrouselItemImg= document.createElement('img')
        carrouselItemImg.classList.add('carrousel__item')
        // carrousel__item--video
        const carrouselItemVideo= document.createElement('video')
        carrouselItemVideo.classList.add('carrousel__item')
        
        if(media[i].hasOwnProperty('video')){
            carrouselItemVideo.setAttribute("src", `./assets/Sample Photos/${name}/${media[i].video}`)
            carrouselItems.appendChild(carrouselItemVideo)  
        }else{
            carrouselItemImg.setAttribute("src", `./assets/Sample Photos/${name}/${media[i].image}`)
            carrouselItems.appendChild(carrouselItemImg)  
        } 
    }

    // appendChild nodes
    carrouselClose.appendChild(closeBtn)
    
    carrouselContainer.appendChild(carrouselItems)
    carrouselContainer.appendChild(carrouselClose)
   
    carrouselContainer.appendChild(leftArrow)
    carrouselContainer.appendChild(rightArrow)


    carrousel.appendChild(carrouselContainer);
}

export function closeCarrousel(){
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')

    headerPage.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'false')
    headerPage.classList.remove('hidden')
    mainPage.classList.remove('hidden')

    const carrousel = document.querySelector('.carrousel')
    carrousel.setAttribute('aria-hidden', 'true')

    const carrouselContainer = document.querySelector('.carrousel__container')
    
    carrousel.removeChild(carrouselContainer)
    carrousel.style.display = "none"
}