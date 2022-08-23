import { closeModal } from "./modal.js";

export function submitForm(){
    const lastName = document.getElementById('lastName');
    const firstName = document.getElementById('firstName');
    const email = document.getElementById('email');
    console.log('lastname: ', lastName.value);
    console.log('firstName: ', firstName.value);
    console.log('emali: ', email.value);

    closeModal();
}