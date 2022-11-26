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
    carrouselClose.setAttribute('role', "button")
    carrouselClose.setAttribute("aria-label", "fermeture carrousel")
    
    // carrousel__closeBtn
    const closeBtn = document.createElement('i')
    closeBtn.classList.add('fa-window-close')
    closeBtn.classList.add('fas')
    closeBtn.classList.add('tab')
    closeBtn.setAttribute('tabindex', "1")
   
    // carrousel__items
    const carrouselItems = document.createElement('ul')
    carrouselItems.classList.add('carrousel__items') 
    carrouselItems.setAttribute('role', 'tablist')
   
    // les arrows
    const carrouselLeftArrow = document.createElement('div')
    carrouselLeftArrow.classList.add('carrousel__arrow')
    carrouselLeftArrow.setAttribute('aria-label', "défilement à gauche")
    carrouselLeftArrow.setAttribute('role', "button")

    const carrouselRightArrow = document.createElement('div')
    carrouselRightArrow.classList.add('carrousel__arrow')
    carrouselRightArrow.setAttribute('aria-label', "défilement à droite")
    carrouselRightArrow.setAttribute('role', "button")
    
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
        const carrouselItem = document.createElement('li')
        carrouselItem.classList.add('carrousel__item')
        carrouselItem.setAttribute('role', "tab")
        carrouselItem.setAttribute('tabindex', '-1')
        carrouselItem.setAttribute('aria-selected', 'false')
    
        //carrousel__title
        const carrouselTitle = document.createElement('h1')
        carrouselTitle.classList.add('carrousel__title')
        carrouselTitle.innerHTML = `${media[i].title}`

        // carrousel__img
        const carrouselImg= document.createElement('img')
        carrouselImg.classList.add('carrousel__img')
        // carrousel__video
        const carrouselVideo= document.createElement('video')
        carrouselVideo.classList.add('carrousel__video')
        
        // eslint-disable-next-line no-prototype-builtins
        if(media[i].hasOwnProperty('video')){
            carrouselVideo.setAttribute("src", `./assets/Sample Photos/${name}/${media[i].video}`)
            carrouselVideo.setAttribute('alt', `${media[i].video}`)
            carrouselItem.appendChild(carrouselVideo) 
            carrouselItem.appendChild(carrouselTitle)
            carrouselItems.appendChild(carrouselItem) 
        }else{
            carrouselImg.setAttribute("src", `./assets/Sample Photos/${name}/${media[i].image}`)
            carrouselVideo.setAttribute('alt', `${media[i].image}`)
            carrouselItem.appendChild(carrouselImg) 
            carrouselItem.appendChild(carrouselTitle)
            carrouselItems.appendChild(carrouselItem) 
        } 
    }

    // appendChild nodes
    carrouselClose.appendChild(closeBtn)
    
    carrouselContainer.appendChild(carrouselItems)
    carrouselContainer.appendChild(carrouselClose)
   
    carrouselContainer.appendChild(carrouselLeftArrow)
    carrouselContainer.appendChild(carrouselRightArrow)


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

    // const carrouselContainer = document.querySelector('.carrousel__container')
    
    //carrousel.removeChild(carrouselContainer)
    carrousel.style.display = "none"
    carrousel.innerHTML = ""
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
     const images =  document.querySelectorAll('.carrousel__item');
    // const nbrImg = images.length;
    const leftArrow = document.querySelector('.fa-chevron-circle-left');
    const rightArrow = document.querySelector('.fa-chevron-circle-right');
    const closeBtn = document.querySelector('.carrousel__close');
    
    //console.log("nbrImg: ", nbrImg)
    let step = 0;
    images[0].classList.add("active");

    function removeActiveImage(){
        const images = document.querySelectorAll('.carrousel__item');
        const nbrImg = images.length;
        for(let i=0; i<nbrImg; i++){
            images[i].classList.remove("active");
        }
    }        

    leftArrow.addEventListener('click', () => {
        const images =  document.querySelectorAll('.carrousel__item');
        const nbrImg = images.length;
        console.log('avant clic, step = ', step)
        console.log("nbrImg: ", nbrImg)
        step++;
        if(step >= nbrImg ){
            step = 0;
        }
        console.log('après clic, step = ', step)
        removeActiveImage()
        images[step].classList.add('active')
        images[step].setAttribute('tabindex', '0')
        images[step].setAttribute('aria-selected', 'true')
    })

    rightArrow.addEventListener('click', () => {
        const images =  document.querySelectorAll('.carrousel__item')
        const nbrImg = images.length;
        console.log('avant clic, step = ', step)
        console.log("nbrImg: ", nbrImg)
        if(step == 0){
            step = nbrImg;
        }
        step--;
        console.log('après clic, step = ', step)
        removeActiveImage();
        images[step].classList.add('active')
        images[step].setAttribute('tabindex', '0')
        images[step].setAttribute('aria-selected', 'true')
    })
    closeBtn.addEventListener('click', () => {
        closeCarrousel();
    })
}

function carrouselKeydownFunction(){
    // evenements keydown sur carrousel
    const images = document.querySelectorAll('.carrousel__item');
    const length = images.length;
    const arrows = document.querySelectorAll('.arrow');
    const carrosselElts = document.querySelectorAll('.tab');
    const carroselBtnClose = document.querySelector('.fa-window-close');
    let step = 0;
    console.log("length: ", length)
    // piéger focus dans carrousel
    document.addEventListener('keydown', (e) => {
         
        if(e.key === "Tab" || e.keyCode === 9){
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

        arrows[1].addEventListener('keydown', (e) => {
            const images = document.querySelectorAll('.carrousel__item');
            const length = images.length;
            console.log('coucouc')
            //if(e.key === "ArrowRight" || e.keyCode === 39){
            if (e.keyCode === 39 || (e.ctrlKey && e.keyCode === 39)) {		
                e.preventDefault();
                console.log("step in arrowRight before: ", step)
                for(let i=0; i<length; i++){       
                    images[i].classList.remove("active");
                }
                step++; 
                if(step === length){
                    step = 0;
                }
                console.log("step in arrowRight after: ", step)
             
                images[step].classList.add('active')
                images[step].setAttribute('tabindex', '0')
                images[step].setAttribute('aria-selected', 'true')  
                //arrows[0].focus();
            }
                
        })

        arrows[0].addEventListener('keydown', (e) => {
            const images = document.querySelectorAll('.carrousel__item');
            const length = images.length;
            //if(e.key === "ArrowLeft" || e.keyCode === 37){
            if (e.keyCode === 37 || (e.ctrlKey && e.keyCode === 37)) {		
                e.preventDefault();
                console.log("step in arrowLeft before: ", step)
                for(let i=0; i<length; i++){  
                   images[i].classList.remove("active");
                }
                if(step === 0){
                    step = length-1;
                }
                step--;
                console.log("step in arrowLeft before: ", step)
                images[step].classList.add('active')
                images[step].setAttribute('tabindex', '0')
                images[step].setAttribute('aria-selected', 'true')
                //arrows[1].focus()
            }
               
        })
        
    })

    
}