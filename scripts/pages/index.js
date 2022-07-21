import { photographerFactory } from "../factories/photographer.js"

async function getPhotographers() {
   const photographersApi = fetch("/data/photographers.json")
                                .then(res => res.json())
                                .then(function(res) {
                                    let photographers = res.photographers
                                    let media = res.media
                                    return {
                                        photographers,
                                        media
                                    }
                                })
                                .catch(err => console.log("Error to occur: ", err))
    console.log("photographersApi: ", photographersApi)                          
    return photographersApi
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    
    const { photographers } = await getPhotographers();
    
    displayData(photographers);
};

init();