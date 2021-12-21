
async function getPhotographers() {
    // récupère le data des photographers avec les deux clés: photographers / media
    const data = await fetch("./../../data/photographers.json");
    const photographers = await data.json();
    return photographers;
}

/**
 * 
 * @param {object} photographers 
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};


/**
 * affiche les photographes (photographers)
 * 
 * @async
 * @param {object} data -récupere les infos des photographers
 */

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

test()