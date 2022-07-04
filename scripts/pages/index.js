
import { photographerFactory } from "../factories/photographer.js"

export async function getPhotographers() {
    // récupère le data des photographers avec les deux clés: photographers / media
    const data = await fetch("./../../data/photographers.json");
    const photo = await data.json();
    return photo;
}

/**
 * 
 * @param {object} photographers 
 */

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section")
    console.log("photographersSection :" + photographersSection)
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};


/**
 * affiches les photographe (photographers)
 * 
 * @async
 * @param {object} data -récupère les infos des photographer
 */

async function init() {
    const {photographers} = await getPhotographers();
    displayData(photographers);
};

init()
