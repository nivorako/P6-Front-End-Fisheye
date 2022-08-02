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

    carrouselContainer.appendChild(carrouselClose)
    carrouselContainer.appendChild(carrouselItems)
    carrouselContainer.appendChild(leftArrow)
    carrouselContainer.appendChild(rightArrow)


    wrapper.appendChild(carrouselContainer);
    console.log('wrapper: ', wrapper)
    return wrapper
}


 // function createEltWithClass(classe, elt){
    //     const container = document.createElement(elt)
    //     container.classList.add(classe)
    //     return container
    // }

    // const carousel = /*html*/`
    //     <div class="carrousel__container">
    //         <div class="carrousel__close"><i class="fas fa-window-close"></i></div>
    //         <div class="carrousel__items">
    //             <div class="carrousel__item">ici et la</div>
    //         </div>
    //         <div class="carrousel__arrow"><i class='fas fa-chevron-circle-left'></i></div>
    //         <div class="carrousel__arrow"><i class='fas fa-chevron-circle-right'></i></div>
    //     </div>
    // `;

 // const carrouselItem1 = document.createElement('img')
    // carrouselItem1.classList.add('carrousel__item')
    // carrouselItem1.setAttribute("src", `./assets/Sample Photos/${name}/${media[1].image}`)

    // const carrouselItem2 = document.createElement('img')
    // carrouselItem2.classList.add('carrousel__item')
    // carrouselItem2.setAttribute("src", `./assets/Sample Photos/${name}/${media[2].image}`)

    // carrouselItems.appendChild(carrouselItem1)
    // carrouselItems.appendChild(carrouselItem2)
   
