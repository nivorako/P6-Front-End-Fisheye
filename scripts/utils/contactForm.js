function displayModal() {
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main')
    const modal = document.getElementById("modal")

	modal.classList.add('show')
    mainPage.classList.add('opacity')
    headerPage.classList.add('opacity')
}

function closeModal() {
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main')
    const modal = document.getElementById("modal")

    modal.classList.remove('show')
    modal.classList.add('hidden')
    mainPage.classList.remove('opacity')
    headerPage.classList.remove('opacity')
    mainPage.classList.add('show')
    headerPage.classList.add('show')
}

