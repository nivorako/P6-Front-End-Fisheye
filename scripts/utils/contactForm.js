


export function displayModal(photographer){
    const { name } = photographer
    // récupérer la partie header et main de la page photographe
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')

    // hidden!: aria et class
    headerPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('aria-hidden', 'true') 
    // headerPage.classList.add('hidden')
    // mainPage.classList.add('hidden')
    headerPage.style.display = "none"
    mainPage.style.display = 'none'

    // fabirquer et charger modalElement dans class="modal"
    const modal= document.getElementById('modal')
    modal.setAttribute('aria-hidden', 'false')
    const modalElement = /*html*/`
        <header class="modal__header">
            <div class="modal__function" >
                <h2 id="modalTitle">Contactez-moi</h2>
                <p class="modal__name">${name}</p>
            </div>
            <img src="assets/icons/close.svg" role="button" aria-label="Fermer" class="modal__close" tabindex="0"/>
            
        </header>
        <form class="modal__form">
                <label for="lastName">Prénom</label>
                <input  class="input" type="text" name="lastname" id="lastName" tabindex="0"/>
                <label for="firstName">Nom</label>
                <input  class="input" type="text" name="firstName" id="firstName" tabindex="0">
                <label for="email">email</label>
                <input  class="input" type="email" name="email" id="email" tabindex="0">
                <div class="modal__comment">
                    <label for="message">Votre message</label>
                    <textarea  type="text" name="message" id="message" class="modal__message input" tabindex="0"></textarea>
                </div>
            
            <button class="btn input" tabindex="0" type="submit">Envoyer</button>
        </form>
    ` ;

    modal.innerHTML = modalElement;
    
    //afficher modal et lui mettre focus (dans le 1er input)
    modal.style.display = "block"
    const firstInput = modal.querySelector('input')
    firstInput.focus();
}

export function closeModal(){
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')
    headerPage.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'false')

    headerPage.style.display = "block"
    mainPage.style.display = 'block'

    const modal = document.getElementById('modal')
    modal.setAttribute('aria-hidden', 'true')
    
    modal.innerHTML = ""
    modal.style.display = "none"
}
