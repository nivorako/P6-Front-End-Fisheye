import { photographerName } from "./photographer.js"

export function carrousel( media, photographer){
    console.log('media: ', media)
    const name = photographerName(photographer)
    
    const wrapper = document.querySelector('.carrousel');

    const carrouselContainer = document.createElement('div')
    carrouselContainer.classList.add("carrousel__container")

    const carrouselClose = document.createElement('div')
    carrouselClose.classList.add('carrousel__close')

    const closeBtn = document.createElement('i')
    closeBtn.classList.add('fa-window-close')
    closeBtn.classList.add('fas')

    const carrouselItems = document.createElement('div')
    carrouselItems.classList.add('carrousel__items')
   
    const carrouselLeftArrow = document.createElement('div')
    carrouselLeftArrow.classList.add('carrousel__arrow')

    const carrouselRightArrow = document.createElement('div')
    carrouselRightArrow.classList.add('carrousel__arrow')

    const leftArrow = document.createElement('i')
    leftArrow.classList.add('fa-chevron-circle-left')
    leftArrow.classList.add('fas')

    const rightArrow = document.createElement('i')
    rightArrow.classList.add('fa-chevron-circle-right')
    rightArrow.classList.add('fas')

    carrouselLeftArrow.appendChild(leftArrow)
    carrouselRightArrow.appendChild(rightArrow)

    // chargement des images carrouselItem dans carrouselItems
    // gérer le cas ou si img ou video
    const l = media.length;
    for(let i=0; i<l; i++){
        
        const carrouselItemImg= document.createElement('img')
        carrouselItemImg.classList.add('carrousel__item')

        const carrouselItemVideo= document.createElement('video')
        carrouselItemVideo.classList.add('carrousel__item')
        
        if(media[i].hasOwnProperty('video')){
            carrouselItemVideo.setAttribute("src", `./assets/Sample Photos/${name}/${media[i].video}`)
            carrouselItems.appendChild(carrouselItemVideo)  
            console.log('media[i].video: ', media[i].video)
        }else{
            carrouselItemImg.setAttribute("src", `./assets/Sample Photos/${name}/${media[i].image}`)
            carrouselItems.appendChild(carrouselItemImg)  
            console.log('media[i].image: ', media[i].image)
        } 
    }

    carrouselClose.appendChild(closeBtn)
    
    carrouselContainer.appendChild(carrouselItems)
    carrouselContainer.appendChild(carrouselClose)
   
    carrouselContainer.appendChild(leftArrow)
    carrouselContainer.appendChild(rightArrow)


    wrapper.appendChild(carrouselContainer);
    console.log('wrapper: ', wrapper)
    return wrapper
}
