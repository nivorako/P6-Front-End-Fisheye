async function getPhotographers(){
    // récupère le data des photographers avec les deux clés: photographers / media
    const data = await fetch("./../../data/photographers.json")
    const photographers = await data.json()
    return photographers
}

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


    photographerIdSection.appendChild(title)
    photographerIdSection.appendChild(home)
    photographerIdSection.appendChild(tagText)
    photographerImgSection .appendChild(imgPhotograph)

    return {photographerIdSection, photographerImgSection}
}

async function getPhotographerMedia(){
    // on recupere id de la page courante
    let queryString_url_id = window.location.search
    let photographerId = queryString_url_id.slice(1)

    let photographers = await getPhotographers()
    let photographerMedia = photographers.media.filter(x => x.photographerId === parseInt(photographerId, 10))

    return photographerMedia
}

async function photographerMediaFactory(){
    let photographerMediaSection = document.querySelector('.photographer-media')

    let photographer = await getPhotographer()
    let photographerMedia = await getPhotographerMedia()

    let photographerName = function(photographer){
        let name = ""
        let avatar = photographer.name.split(" ")[0]
        if(avatar.split("-").length === 1) name = avatar
        else name = avatar.split("-")[0] + " " + avatar.split("-")[1]
        return name
    }

    console.log(photographerName(photographer))
    console.log(photographerMedia)

    photographerMedia.map((photographe) =>{
        // creation div pour chaque photographer
        let photographerSection = document.createElement('div')
        photographerSection.classList.add('photographer-section')

        // creation div pour les détails photographer
        let photographerDetails = document.createElement('div')
        photographerDetails.classList.add('photographer-details')

        // creation div pour likes
        let photographerLikes = document.createElement('div')
        photographerLikes.classList.add('photographer-likes')

        // creation paragraphe pour title
        let photographerTitle = document.createElement('p')
        photographerTitle.textContent = photographe.title

        // creation span pour likes
        let photographerNumberOfLikes = document.createElement('span')
        photographerNumberOfLikes.textContent = photographe.likes

        // creation i pour icone font awesome
        let photographerIcon = document.createElement('i')
        photographerIcon.textContent =""
        photographerIcon.classList.add('fa-heart')
        photographerIcon.classList.add('fa')

        // creation img pour image
        let photographerImg = document.createElement('img')
        photographerImg.setAttribute("src", `./assets/Sample Photos/${photographerName(photographer)}/${photographe.image}`)

        // integration title dans Details
        photographerDetails.appendChild(photographerTitle)

        // integration de nbre de like dans like
        photographerLikes.appendChild(photographerNumberOfLikes)

        // integration icon dans like
        photographerLikes.appendChild(photographerIcon)

        // integration de like dans Details
        photographerDetails.appendChild(photographerLikes)

        // integration de image dans photographerSection
        photographerSection.appendChild(photographerImg)

        // integration de Details dans photographerSection
        photographerSection.appendChild(photographerDetails)

        // integration de photographerSection dans .photographer-media
        photographerMediaSection.appendChild(photographerSection)
    })

}

photographerIdFactory()
photographerMediaFactory()
// getPhotographerMedia()