import { closeModal } from "./modal.js";

export function submitForm(){
            
    const lastName = document.getElementById('lastName');
    const firstName = document.getElementById('firstName');
    const email = document.getElementById('email');

    //const REGEX pour nom prenom
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ \-]+$/


    console.log('lastname: ', lastName.value);
    console.log('firstName: ', firstName.value);
    console.log('email: ', email.value);

     if (firstName.value.trim().length >= 2 && firstName.value.trim().match(regex)){
        console.log("firstName ok!!")
       
        return true
    }else{
        console.log("firstName not ok!!")
        return false
    }


    closeModal();
    
}