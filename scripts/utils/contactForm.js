//import { modal } from "../factories/modal.js"

function displayModal(){
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')

    const modal = document.getElementById('modal')

    headerPage.classList.add('hidden')
    mainPage.classList.add('hidden')

    modal.classList.add('show')

}

function closeModal(){
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main-photographer')

    const modal = document.getElementById('modal')

    headerPage.classList.remove('hidden')
    mainPage.classList.remove('hidden')

    modal.classList.remove('show')
}
