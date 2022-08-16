import { getPhotographerMedia } from "../factories/photographer.js";
import { carrouselClickEvent, carrouselKeydownEnter } from "./carrousel.js";
import { likes } from "../factories/likes.js";

    // fonction pour afficher les elts séléctés
export function displaySelectedItem(sorted, media, photographer){
    const mediaWrapper = document.querySelector('.photographerMedia')
    // on charge les elts selectionnés dans mediaWrapper
    const sortedData = select(media, sorted)
    if(mediaWrapper.firstElementChild){
        sortedData.forEach(sorted =>{
            const template = getPhotographerMedia(sorted, photographer);
            // enleve ancien mediaWrapper
            mediaWrapper.removeChild(mediaWrapper.firstElementChild)
            mediaWrapper.appendChild(template);
        })

        // on installe evt clic et event dans chaque nouvel elt
        const photos = document.querySelectorAll('.photographerMedia__img' );
        const video = document.querySelectorAll('.photographerMedia__video' )
        carrouselClickEvent(video, media, photographer);
        carrouselKeydownEnter(video, media, photographer);
        carrouselClickEvent(photos, media, photographer);
        carrouselKeydownEnter(photos, media, photographer);
        const likesLikes = document.querySelector('.likes__likes');
        likesLikes.textContent = "";
        // on affiche dans likeslikes le total nbre likes
        likes(media, photographer);
    
        // TRAPP FOCUS PHOTOGRAPHER PAGE

         // si displayPhotographer alors piéger focus dans la page
    }else{
        sortedData.forEach(sorted =>{
            const template = getPhotographerMedia(sorted, photographer);
            mediaWrapper.appendChild(template);
        })

        // on installe evt clic et event dans chaque nouvel elt
        const photos = document.querySelectorAll('.photographerMedia__img' )
        const video = document.querySelectorAll('.photographerMedia__video' )
        carrouselClickEvent(video, media, photographer);
        carrouselKeydownEnter(video, media, photographer);
        carrouselClickEvent(photos, media, photographer);
        carrouselKeydownEnter(photos, media, photographer);

        likes(media, photographer);

        // TRAPP FOCUS PHOTOGRAPHER PAGE

         // si displayPhotographer alors piéger focus dans la page
        const photographerBody = document.getElementById('photographerBody');
    
        const focusablePhotographerEltsString = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
        const focusablePhotographerElts = photographerBody.querySelectorAll(focusablePhotographerEltsString);
        const focusablePhotographerEltsLength = focusablePhotographerElts.length
        const firstFocusable = focusablePhotographerElts[0]
        const lastFocusable = focusablePhotographerElts[focusablePhotographerEltsLength - 1]
        
        console.log('focusablePhotographerElts:', focusablePhotographerElts)
        console.log('lastFocusable: ', lastFocusable)
        photographerBody.addEventListener('keydown', (e) => {
            if(e.key === "Tab" || e.keyCode === 9){
                
                if(e.shiftKey){
                    console.log('c est shift')
                    if(document.activeElement === firstFocusable){
                        e.preventDefault()
                        lastFocusable.focus()
                    }
                }else{
                    console.log('c est tab')
                    if(document.activeElement === lastFocusable){
                        e.preventDefault()
                        firstFocusable.focus()
                    }
                }
            }
        })
    }
}

function select(data, orderBy){
    if(orderBy === "likes"){
        data.sort((a, b) => {
            return b.likes - a.likes
        })

        return data
    }else if(orderBy === "date"){
        data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        return data
    }else if(orderBy === "titre"){
        data.sort((a, b) => {
            return (a.title || a.video).localeCompare(b.title || a.video)
        }) 
        
        return data
    }else{
        throw 'unknow orderBy type'
    }
}
