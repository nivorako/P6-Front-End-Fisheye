import { closeModal } from "./modal.js";

export function submitForm(){
            
    // const lastName = document.getElementById('lastName');
    // const firstName = document.getElementById('firstName');
    // const email = document.getElementById('email');

    console.log('lastname: ', lastName.value);
    console.log('firstName: ', firstName.value);
    console.log('email: ', email.value);

    if(validateFirstName() && validateLastName() && validateEmail()){
        closeModal();
    }else{
        
    }
}

function validateFirstName(){
    //const REGEX pour nom prenom
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ \-]+$/
    
    const firstNameError = document.querySelector('.firstNameError')
    const firstName = document.getElementById('firstName');
    if (firstName.value.trim().length >= 2 && firstName.value.trim().match(regex)){
        if(!firstNameError.classList.contains('hidden')){
            firstNameError.classList.add('hidden')
        }
        return true
    }else{
        console.log("firstName not ok!!")
        firstNameError.classList.remove('hidden')
        return false
    }
}

function validateLastName(){
    //const REGEX pour nom prenom
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ \-]+$/

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
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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