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

        // on installe evt clic et event dans chaque nouvel elt (img et video)
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
    
        const focusablePhotographerEltsString = ' a[href]:not([disabled]), article, button:not([disabled]), i:not([disabled])';
        
        const focusablePhotographerElts = photographerBody.querySelectorAll(focusablePhotographerEltsString);
        const focusablePhotographerEltsLength = focusablePhotographerElts.length
        const firstFocusable = focusablePhotographerElts[0]
        const lastFocusable = focusablePhotographerElts[focusablePhotographerEltsLength - 1]
        
        console.log('focusablePhotographerElts:', focusablePhotographerElts)
        photographerBody.addEventListener('keydown', (e) => {
            if(e.key === "Tab" || e.keyCode === 9){
                console.log('keydown: tab / shift')
                if(e.shiftKey){
                    console.log('keydown:  shift')
                    if(document.activeElement === firstFocusable){
                        console.log('firstfocusable: ', firstFocusable)
                        console.log('lastfocusable: ', lastFocusable)
                        e.preventDefault()
                        lastFocusable.focus()
                    }
                }else{
                    console.log('keydown: tab ')
                    if(document.activeElement === lastFocusable){
                        console.log("last focusable: ", lastFocusable)
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
        console.log('order by likes')
        data.sort((a, b) => {
            return b.likes - a.likes
        })

        return data
    }else if(orderBy === "date"){
        console.log("order by : date")
        data.sort((a, b) => {
            const dateA = a.date.split('-')
            const dateB = b.date.split('-')
            //console.log('a.date: ', a.date + "  " + b.date)
            return new Date(dateB[0], dateB[1], dateB[2]).getTime() - new Date(dateA[0], dateA[1], dateA[2]).getTime()
           
        })
        return data
    }else if(orderBy === "titre"){
        console.log('order by titre')
        data.sort((a, b) => {
            return (a.title || a.video).localeCompare(b.title || a.video)
        }) 
        
        return data
    }else{
        throw 'unknow orderBy type'
    }
}
