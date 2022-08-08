import { getPhotographerMedia } from "./photographer.js";

export function sorter(media, photographer){

    function select(data, orderBy){
        if(orderBy === "likes"){
           
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
                return (a.title).localeCompare(b.title)
            }) 
            
            return data
        }else{
            throw 'unknow orderBy type'
        }
    }
    
    function onChangeSorter(){
        sorterWrapper
            .querySelector('form')
            .addEventListener('change', (e) => {
                const sorted = e.target.value
                sorterPhotographerMediaBy(sorted)
            })
    }

    function sorterPhotographerMediaBy(sorted){
        const mediaWrapper = document.querySelector('.photographerMedia');
        
        if(sorted){
            const sortedData = select(media, sorted)
            sortedData.forEach(media =>{
                const template = getPhotographerMedia(media, photographer);
                mediaWrapper.removeChild(mediaWrapper.firstElementChild)
                mediaWrapper.appendChild(template);
            })
            
        }
    }

    const sorterWrapper = document.querySelector('.sorter')
    const sorter = /*html*/`
        <form class="sorter__container">
            <h2 class="sorter__title">Trier par</h2>
            <select class="sorter__items">
                <option class="sorter__item" tabindex="3" value="date">
                    date
                </option>
                <option class="sorter__item" tabindex="3" value="likes">
                    popularité
                </option>
                <option class="sorter__item" tabindex="3" value="titre">
                    titre
                </option>
            </select>
        </form>
    `;

    sorterWrapper.innerHTML = sorter

    onChangeSorter();
}