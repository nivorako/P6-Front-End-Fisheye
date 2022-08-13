import { getPhotographerMedia } from "../factories/photographer.js";

    // fonction pour afficher le selts séléctés
export function displaySelectedItem(sorted, media, photographer){
    const mediaWrapper = document.querySelector('.photographerMedia')
    
    //mediaWrapper.removeChild(mediaWrapper.firstElementChild)
    // selected(elements media, sorted: selectedItem)
    const sortedData = select(media, sorted)
    if(mediaWrapper.firstElementChild){
        
        sortedData.forEach(sorted =>{
            const template = getPhotographerMedia(sorted, photographer);
            mediaWrapper.removeChild(mediaWrapper.firstElementChild)
            mediaWrapper.appendChild(template);
        })
    }else{
        console.log('mediaWrapper pas child')
        sortedData.forEach(sorted =>{
            const template = getPhotographerMedia(sorted, photographer);
            mediaWrapper.appendChild(template);
        })
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
