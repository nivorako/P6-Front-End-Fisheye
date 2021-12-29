import {getPhotographers} from "./index.js"

/**
 * 
 * return photographer with corresponding id
 * @returns {object} 
 */
async function getPhotographer() {
    // on recupere id de la page courante
    let queryString_url_id = window.location.search
    let photographerId = queryString_url_id.slice(1)
    let photographers = await getPhotographers()
    // photographers.photographers: récupère le data des photographers avec la clé: photographers
    // récupère objet photographer qui correspond à photographers.id
    
    let photographer =   photographers.photographers.find(x => x.id === parseInt(photographerId, 10))
    
    return photographer
}

/**
 * this function allows us to display photographer's id and image in header
 * 
 * return object with two keys : photographerIdSection, photographerImgSection
 * @returns {object} 
 */

async function photographerIdFactory(){
    let photographer  = await getPhotographer()
    let photographerIdSection = document.querySelector('.photographer-id')
    let photographerImgSection = document.querySelector('.photographer-img')
    const picturePhotograph = `./assets/photographers/${photographer.portrait}`;

    let title = document.createElement('h2')
    title.textContent = photographer.name

    // create 'homeland' element
    let home = document.createElement('p')
    home.textContent = photographer.country + ", " + photographer.city

    // create 'tag line text' element
    let tagText = document.createElement('span')
    tagText.textContent = photographer.tagline

    // create 'img' element
    let imgPhotograph = document.createElement( 'img' )
    imgPhotograph.setAttribute("src", picturePhotograph)
    imgPhotograph.setAttribute("alt", photographer.name)

    photographerIdSection.appendChild(title)
    photographerIdSection.appendChild(home)
    photographerIdSection.appendChild(tagText)
    photographerImgSection .appendChild(imgPhotograph)

    return {photographerIdSection, photographerImgSection}
}


/**
 * return the photogarph which id matches with photographerId
 * @returns {object}
 */
async function getPhotographerMedia(){
    // collect current id  ?359
    let queryString_url_id = window.location.search
    //  slice the ? and collect the id
    let photographerId = queryString_url_id.slice(1)

    let photographers = await getPhotographers()
    let photographerMedia = photographers.media.filter(x => x.photographerId === parseInt(photographerId, 10))

    return photographerMedia
}

/**
 * 
 * @param {object} photographer 
 * @returns {string} photographer's first name
 */
function photographerName(photographer){
    let name = ""
    let avatar = photographer.name.split(" ")[0]
    if(avatar.split("-").length === 1) name = avatar
    else name = avatar.split("-")[0] + " " + avatar.split("-")[1]
    return name
}

/**
 * 
 * @returns {object}
 */

async function photographerMediaFactory(){
    let photographerMediaSection = document.querySelector('.photographer-media')

    
    let photographer = await getPhotographer()
    let photographerMedia = await getPhotographerMedia()

    photographerMedia.map((photographe) =>{
        // create div for each photographer
        let photographerSection = document.createElement('div')
        photographerSection.classList.add('photographer-section')

        // create div for photographer's details
        let photographerDetails = document.createElement('div')
        photographerDetails.classList.add('photographer-details')

        // create div for likes
        let photographerLikes = document.createElement('div')
        photographerLikes.classList.add('photographer-likes')


        // create paragraphe for title
        let photographerTitle = document.createElement('p')
        photographerTitle.textContent = photographe.title

        // create span for number of likes
        let photographerNumberOfLikes = document.createElement('span')
        photographerNumberOfLikes.textContent = photographe.likes

        // create i for icon font awesome
        let photographerIcon = document.createElement('i')
        photographerIcon.textContent =""
        photographerIcon.classList.add('fa-heart')
        photographerIcon.classList.add('fa')

        // create img for image / video
        let photographerVideo = document.createElement('video')
        let photographerImg = document.createElement('img')

        if(photographe.hasOwnProperty('video')){
            
            photographerVideo.setAttribute('type', "video/mp4")
            photographerVideo.setAttribute("controls", "controls")
            photographerVideo.setAttribute("src", `./assets/Sample Photos/${photographerName(photographer)}/${photographe.video}`)
            photographerVideo.setAttribute("title", "")

            photographerSection.appendChild(photographerVideo)
            
            // integration title in Details
            photographerDetails.appendChild(photographerTitle)

            // integration nber of like in likes elt
            photographerLikes.appendChild(photographerNumberOfLikes)

            // integration icon in like
            photographerLikes.appendChild(photographerIcon)

            // integration of like in Details
            photographerDetails.appendChild(photographerLikes)

            // integration of Details in photographerSection
            photographerSection.appendChild(photographerDetails)

            // integration of photographerSection in .photographer-media
            photographerMediaSection.appendChild(photographerSection)
        }else{
            photographerImg.setAttribute("src", `./assets/Sample Photos/${photographerName(photographer)}/${photographe.image}`)
            photographerImg.setAttribute("alt", photographe.title)
            // integration of image in photographerSection
            photographerSection.appendChild(photographerImg)
            // integration title in Details
            photographerDetails.appendChild(photographerTitle)

            // integration nber of like in likes elt
            photographerLikes.appendChild(photographerNumberOfLikes)

            // integration icon in like
            photographerLikes.appendChild(photographerIcon)

            // integration of like in Details
            photographerDetails.appendChild(photographerLikes)

            // integration of Details in photographerSection
            photographerSection.appendChild(photographerDetails)

            // integration of photographerSection in .photographer-media
            photographerMediaSection.appendChild(photographerSection)
        }
    })

    return { photographerMediaSection }
}

async function displayPhotographName(){
    let name = document.querySelector(".name")
    let photographer  = await getPhotographer()
    name.textContent = photographer.name
}

displayPhotographName()
photographerIdFactory()
photographerMediaFactory()
// getPhotographerMedia()

