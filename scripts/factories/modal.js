

export function modal(){
    const wrapper = document.querySelector('.modal');

    const modal = /*html*/`
        <header class="modal__header">
            <div class="modal__function" >
                <h2 id="modalTitle">Contactez-moi</h2>
                <p class="modal__name">name</p>
            </div>
            <img src="assets/icons/close.svg" role="button" aria-label="Fermer" class="modal__close" tabindex="0"/>
            
        </header>
        <form class="modal__form">
                <label for="lastName">Prénom</label>
                <input  type="text" name="lastname" id="lastName" tabindex="0"/>
                <label for="firstName">Nom</label>
                <input  type="text" name="firstName" id="firstName" tabindex="0">
                <label for="email">email</label>
                <input  type="email" name="email" id="email" tabindex="0">
                <div class="modal__comment">
                    <label for="message">Votre message</label>
                <textarea  type="text" name="message" id="message" class="modal__message" tabindex="0"></textarea>
                </div>
            
            <button class="btn" tabindex="0" type="submit">Envoyer</button>
        </form>
    ` ;
    wrapper.innerHTML = modal;

    return wrapper;
}