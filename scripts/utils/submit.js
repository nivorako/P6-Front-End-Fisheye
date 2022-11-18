import { closeModal } from "./modal.js";

export function submitForm(){
            
    if(validateFirstName() && validateLastName() && validateEmail()){
        closeModal();
    }
}

function validateFirstName(){
    //const REGEX pour nom prenom
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ -]+$/
    
    const firstNameError = document.querySelector('.firstNameError')
    const firstName = document.getElementById('firstName');
    if (firstName.value.trim().length >= 2 && firstName.value.trim().match(regex)){
        if(!firstNameError.classList.contains('hidden')){
            firstNameError.classList.add('hidden')
            firstNameError.setAttribute('aria-invalid', 'false')
        }
        return true
    }else{
        console.log("firstName not ok!!")
        firstNameError.classList.remove('hidden')
        firstNameError.setAttribute('aria-invalid', 'true')
        return false
    }
}

function validateLastName(){
    //const REGEX pour nom prenom
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ -]+$/

    const lastNameError = document.querySelector('.lastNameError')
    const lastName = document.getElementById('lastName')
    if (lastName.value.trim().length >= 2 && lastName.value.trim().match(regex)){
        if(!lastNameError.classList.contains('hidden')){
            lastNameError.classList.add('hidden')
        }
        return true
    }else{
        console.log("lastName not ok!!")
        lastNameError.classList.remove('hidden')
        return false
    }
}

function validateEmail() {
    const email = document.getElementById('email');
    const emailError = document.querySelector('.emailError')
   
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValue = email.value;
    if(emailValue.trim().match(re)){
        if(!emailError.classList.contains('hidden')){
            emailError.classList.add('hidden')
        }
        return true
    }else{
        emailError.classList.remove('hidden')
        console.log('email non valide')
        return false
    }    
}