import { validateFirstName, validateLastName, validateEmail, fieldsValidation } from "./submit.js"


export function displayModal(photographer){
    const { name } = photographer
    // récupérer la partie header et main de la page photographe
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')

    // hidden!: aria et class
    headerPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('aria-hidden', 'true') 

    headerPage.style.display = "none"
    mainPage.style.display = 'none'

    // fabirquer et charger modalElement dans class="modal"
    const modal= document.getElementById('modal')
    modal.setAttribute('aria-hidden', 'false')
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-describedby',"modalTitle")
    const modalElement = /*html*/`
        <header class="modal__header">
            <div class="modal__function">
                <h1 id="modalTitle ">Contactez-moi</h1>
                <p class="modal__name">${name}</p>
            </div>
            <img src="assets/icons/close.svg" class="modal__close" tabindex="0" role="button" aria-label="fermer le modal" alt="icone fermer modal"/>
            
        </header>
        <form class="modal__form">
                <label for="firstName" id="nom">Nom</label>
                <input  class="input" id="firstName" type="text" name="firstname" tabindex="0" aria-errormessage="firstNameError" aria-invalid="false" placeholder="Votre nom ici" required/>
                <span id="firstNameError" class="firstNameError hidden" aria-live="polite" role="alert">mettez un nom valide et deux caractères minimum</span>
                <label for="lastName" >Prénom</label>
                <input  class="input" type="text" name="lastName" id="lastName" tabindex="0" aria-errormessage="lastNameError" aria-invalid="false" placeholder="Votre prénom ici" required>
                <span  class="lastNameError hidden" id="lastNameError" aria-live="polite" role="alert">mettez un prénom valide et deux caractères minimum</span>
                <label for="email">email</label>
                <input  class="input" type="email" name="email" id="email" tabindex="0" aria-errormessage="emailError" aria-invalid="false" placeholder="Votre e-mail ici" required>
                <span class="emailError hidden" id="emailError" aria-live="polite" role="alert">mettez un email valide</span>
                <div class="modal__comment">
                    <label for="message">Votre message</label>
                    <textarea  type="text" name="message" id="message" class="modal__message input" tabindex="0"></textarea>
                </div>
            
            <button class="btn modal__submit" tabindex="0" type="submit">Envoyer</button>
        </form>
    ` ;

    modal.innerHTML = modalElement;
    
    //afficher modal et lui mettre focus (dans le 1er input)
    modal.style.display = "block"
    const firstInput = modal.querySelector('.modal__function')
    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const email = document.getElementById('email')
    firstInput.focus(); 
    fieldsValidation(firstName,validateFirstName, 'focusout' )
    fieldsValidation(lastName, validateLastName, 'focusout')
    fieldsValidation(email, validateEmail, 'focusout')
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

