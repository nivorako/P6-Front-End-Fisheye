    function displayModal() {
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main')
    const modal = document.getElementById("modal")

	modal.classList.add('show')
    mainPage.classList.remove('show')
    headerPage.classList.remove('show')
    mainPage.classList.add('opacity')
    headerPage.classList.add('opacity')
}

    function closeModal() {
    const headerPage = document.getElementById('header')
    const mainPage = document.getElementById('main')
    const modal = document.getElementById("modal")

    modal.classList.remove('show')
    modal.classList.add('hidden')
    mainPage.classList.replace('opacity', 'show')
    headerPage.classList.replace('opacity', 'show')
}

