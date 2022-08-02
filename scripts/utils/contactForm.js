


export function displayModal(){
   
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')
    headerPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('aria-hidden', 'true')
    
    headerPage.classList.add('hidden')
    mainPage.classList.add('hidden')

    const modal = document.getElementById('modal')
    modal.setAttribute('aria-hidden', 'false')
    
    modal.style.display = "block"
    const firstInput = modal.querySelector('input')
    firstInput.focus();
}

export function closeModal(){
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')
    headerPage.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'false')

    headerPage.classList.remove('hidden')
    mainPage.classList.remove('hidden')

    const modal = document.getElementById('modal')
    modal.setAttribute('aria-hidden', 'true')
    
    modal.style.display = "none"
}
