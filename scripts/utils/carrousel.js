export function displayCarrousel(){
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')
    headerPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('aria-hidden', 'true')

    headerPage.classList.add('hidden')
    mainPage.classList.add('hidden')

    const carrousel = document.querySelector('.carrousel')
    carrousel.setAttribute('aria-hidden', 'false')
    
    carrousel.style.display = "block"
    // const btnClose = document.querySelector('.modal__close')
    // btnClose.focus();
}