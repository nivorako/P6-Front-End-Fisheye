export function modal(){
    const wrapper = document.querySelector('.modal');
    const modal = `

    <header class="modal-header">
        <div class="modal-function" >
            <p>Contactez-moi</p>
            <p class="name">name</p>
        </div>
        <img src="assets/icons/close.svg" onclick="closeModal()" aria-label="Fermer"  tabindex=""/>
        
    </header>
    <form class="modal-form">
            <label for="lastName">Prénom</label>
            <input  type="text" name="lastname" id="lastName"/ tabindex="">
            <label for="firstName">Nom</label>
            <input  type="text" name="firstName" id="firstName"/ tabindex="">
            <label for="email">email</label>
            <input  type="email" name="email" id="email"/ tabindex="">
            <div class="comment">
                <label for="message">Votre message</label>
                <textarea  type="text" name="message" id="message" class="comment-message" tabindex=""></textarea>
            </div>
        
        <button class="contact_button" tabindex="7">Envoyer</button>
    </form>
 
    ` 
    wrapper.innerHTML = modal

    return wrapper
}