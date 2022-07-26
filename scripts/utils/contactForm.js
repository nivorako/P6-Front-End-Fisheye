//import { modal } from "../factories/modal.js"

function displayModal(){
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')
    headerPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('aria-hidden', 'true')

    const modal = document.getElementById('modal')
    modal.setAttribute('aria-hidden', 'false')

    headerPage.classList.add('hidden')
    mainPage.classList.add('hidden')

    modal.classList.add('show')
    modal.focus();
}

function closeModal(){
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')
    headerPage.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'false')

    const modal = document.getElementById('modal')
    modal.setAttribute('aria-hidden', 'true')

    headerPage.classList.remove('hidden')
    mainPage.classList.remove('hidden')

    modal.classList.remove('show')
}
