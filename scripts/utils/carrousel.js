import { photographerName } from "../factories/photographer.js";

function displayCarrousel(media, photographer){
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
    closeBtn.classList.add('fa-window-close')
    closeBtn.classList.add('fas')
    closeBtn.classList.add('tab')
    closeBtn.setAttribute('tabindex', "1")
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
    leftArrow.classList.add('tab')
    leftArrow.classList.add('arrow')

    const rightArrow = document.createElement('i')
    rightArrow.setAttribute('tabindex', "1")
    rightArrow.classList.add('fa-chevron-circle-right')
    rightArrow.classList.add('fas')
    rightArrow.classList.add('tab')
    rightArrow.classList.add('arrow')

    carrouselLeftArrow.appendChild(leftArrow)
    carrouselRightArrow.appendChild(rightArrow)

    // chargement des images carrouselItem dans carrouselItems
    // gérer le cas ou si img ou video
    const l = media.length;
    for(let i=0; i<l; i++){

        //carrousel__item
        const carrouselItem = document.createElement('div')
        carrouselItem.classList.add('carrousel__item')
        // carrousel__img
        const carrouselImg= document.createElement('img')
        carrouselImg.classList.add('carrousel__img')
        // carrousel__video
        const carrouselVideo= document.createElement('video')
        carrouselVideo.classList.add('carrousel__video')
        
        if(media[i].hasOwnProperty('video')){
            carrouselVideo.setAttribute("src", `./assets/Sample Photos/${name}/${media[i].video}`)
            carrouselItem.appendChild(carrouselVideo) 
            carrouselItems.appendChild(carrouselItem) 
        }else{
            carrouselImg.setAttribute("src", `./assets/Sample Photos/${name}/${media[i].image}`)
            carrouselItem.appendChild(carrouselImg) 
            carrouselItems.appendChild(carrouselItem) 
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

function closeCarrousel(){
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')

    headerPage.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'false')
    headerPage.classList.remove('hidden')
    mainPage.classList.remove('hidden')

    const carrousel = document.querySelector('.carrousel')
    carrousel.setAttribute('aria-hidden', 'true')

    const carrouselContainer = document.querySelector('.carrousel__container')
    
    //carrousel.removeChild(carrouselContainer)
    carrousel.style.display = "none"
}

// ouvre carrousel avec enter + gestion bouton clic et keydown
export function carrouselKeydownEnter(photos, media, photographer){
    photos.forEach(photo => photo.addEventListener('keydown', (e) => {
        if(e.key === "Enter" || e.keyCode === 13){
            // afficher carrousel(foundPhotographerMedia, foundPhotographer);
            displayCarrousel(media, photographer);  

            carrouselClickFunction(); 
             // mettre focus sur 
            const arrows = document.querySelectorAll('.arrow');
            arrows[0].focus();
           
            carrouselKeydownFunction();
        }
    }))
}

// ouvre carrousel avec  clic
export function carrouselClickEvent(photos, media, photographer){
    photos.forEach(photo => photo.addEventListener('click', () => {
        //carrousel(foundPhotographerMedia, foundPhotographer);
        displayCarrousel(media, photographer);  
        // gestion des bouttons gauche droite et close
        carrouselClickFunction();
        // mettre focus sur 
        const arrows = document.querySelectorAll('.arrow');
        arrows[0].focus();  

        carrouselKeydownFunction();

    }))
}

// gestion des bouttons gauche droite et close au clic
function carrouselClickFunction(){
    const leftArrow = document.querySelector('.fa-chevron-circle-left');
    const rightArrow = document.querySelector('.fa-chevron-circle-right');
    const closeBtn = document.querySelector('.carrousel__close');
    const images = document.querySelectorAll('.carrousel__item');

    const nbrImg = images.length;
   
    let step = 0;
    images[0].classList.add("active");

    function removeActiveImage(){
        for(let i=0; i<nbrImg; i++){
            images[i].classList.remove("active");
        }
    }        

    leftArrow.addEventListener('click', () => {
        console.log('avant clic, step = ', step)
        step++;
        if(step >= nbrImg ){
            step = 0;
        }
        console.log('après clic, step = ', step)
        removeActiveImage()
        images[step].classList.add('active')
    })

    rightArrow.addEventListener('click', () => {
        console.log('avant clic, step = ', step)
        if(step == 0){
            step = nbrImg;
        }
        step--;
        console.log('après clic, step = ', step)
        removeActiveImage();
        images[step].classList.add('active');
    })
    closeBtn.addEventListener('click', () => {
        closeCarrousel();
    })
}

function carrouselKeydownFunction(){
    // evenements keydown sur carrousel
    const arrows = document.querySelectorAll('.arrow');
    const carrosselElts = document.querySelectorAll('.tab');
    const carroselBtnClose = document.querySelector('.fa-window-close');
    let step = 0;

    document.addEventListener('keydown', (e) => {
         // piéger focus dans carrousel
         console.log('carrosselElts: ', carrosselElts)
        if(e.key === "Tab" || e.keyCode === 9){
           console.log('ici tab')
            if(e.shiftKey){
                if(document.activeElement === carrosselElts[0]){
                    e.preventDefault();
                    carrosselElts[carrosselElts.length -1].focus();
                    
                }
            }else if(document.activeElement === carrosselElts[carrosselElts.length -1]){
                    e.preventDefault();
                    carrosselElts[0].focus();
            }
            
        }

        // fermer carrousel avec touche echap
        if(e.key === "Escape" || e.keyCode === 27){
            closeCarrousel();
        }  
        //fermer carrousel avec enter sur icone
        carroselBtnClose.addEventListener('keydown', (e) => {
            if(e.key === "Enter" || e.keyCode === 13){
                e.preventDefault()
                closeCarrousel();
            }
        })
        
    })

    arrows[0].addEventListener('keydown', (e) => {
        if(e.key === "ArrowLeft" || e.keyCode === 37){
            e.preventDefault();
            const images = document.querySelectorAll('.carrousel__item');
            const arrayImages = Array.from(images);
            const length = arrayImages.length;
            console.log(' avant keydownon left, step: ', step)
            console.log('at left, length: ', length)
            for(let i=0; i<length; i++){       
                arrayImages[i].classList.remove("active");
            }
            step++; 
            if(step === length){
                step = 0;
            }
            console.log(' après keydownon left, step: ', step)
            arrayImages[step].classList.add('active');  
            //arrows[0].focus();
        }
            
    })

    arrows[1].addEventListener('keydown', (e) => {
        if(e.key === "ArrowRight" || e.keyCode === 39){
            e.preventDefault();
            const images = document.querySelectorAll('.carrousel__item');
            // ???? arrayImages != images ????
            const arrayImages = Array.from(images);
            const length = arrayImages.length;
            console.log('avant keydown on right, step; ', step    )
            console.log('images: ', images)
            console.log('at right, array images length: ', length)
            console.log("images.length: ", images.length)
            for(let i=0; i<length; i++){  
                arrayImages[i].classList.remove("active");
            }
            if(step === 0){
                step = length-1;
            }
            step--;
            console.log('apres keydown on right, step; ', step    )
            arrayImages[step].classList.add('active')
            //arrows[1].focus()
        }
           
    })
}