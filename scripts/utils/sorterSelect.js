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
            mediaWrapper.removeChild(mediaWrapper.firstElementChild)
            mediaWrapper.appendChild(template);
        })

        // on installe evt clic et event dans chaque nouvel elt
        const photos = document.querySelectorAll('.photographerMedia__img' )
        carrouselClickEvent(photos, media, photographer);
        carrouselKeydownEnter(photos, media, photographer);
        const likesLikes = document.querySelector('.likes__likes');
        likesLikes.textContent = "";
        likes(media, photographer)
    }else{
        sortedData.forEach(sorted =>{
            const template = getPhotographerMedia(sorted, photographer);
            mediaWrapper.appendChild(template);
        })

        // on installe evt clic et event dans chaque nouvel elt
        const photos = document.querySelectorAll('.photographerMedia__img' )
        carrouselClickEvent(photos, media, photographer);
        carrouselKeydownEnter(photos, media, photographer);
    }
}

function select(data, orderBy){
    if(orderBy === "likes"){
        console.log('likes data: ', data)
        data.sort((a, b) => {
            console.log("likes")
            return b.likes - a.likes
        })

        return data
    }else if(orderBy === "date"){
        console.log("date data: ", data)
        data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        console.log("date")
        return data
    }else if(orderBy === "titre"){
        console.log("titre data: ", data)
        data.sort((a, b) => {
            return (a.title || a.video).localeCompare(b.title || a.video)
        }) 
        
        return data
    }else{
        throw 'unknow orderBy type'
    }
}
