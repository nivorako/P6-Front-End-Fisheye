

export function getPhotographer(photographer){

    const { name, portrait, city, country, tagline } = photographer
        const header = document.querySelector('.photographer-header');
        const photograph = `
            <div class="photographer-id"> 
                <h1>${name}</h1>
                <p> ${city}: ${country} </p>
                <span> ${tagline} </span>
            </div>
            <div class="photographer-btn">
                <button class="contact_button" onclick="displayModal()" tabindex="2">Contactez-moi</button>
            </div>
            <div>
                <img src="assets/photographers/${portrait}" class="photographer-img" alt="photographie de ${name}"/>
            </div>
        `
    
        header.innerHTML = photograph
    
        return header
    }

function photographerName(photographer){
    let name = ""
    let avatar = photographer.name.split(" ")[0]
    if(avatar.split("-").length === 1) name = avatar
    else name = avatar.split("-")[0] + " " + avatar.split("-")[1]
    return name
}
    
export function getPhotographerMedia( media, photographer){
    const wrapper = document.createElement('div');
    const name = photographerName(photographer);
    const { title, likes , image, video } = media
    const videoTitle = () => {
        const title = String(video).split('.')[0].split("_").join(' ')
        return title
    }

    const photographerPhoto = `
        <img src="./assets/Sample Photos/${name}/${image}" class="photographerImg" alt="une image qui représente le ${title}" tabindex=""   />
        <div class="photographer-comment" > 
            <p>${title}</p>
            <div class="photographer-details">
                <span>${likes}</span>
                <i class="fa fa-heart"></i>
            </div>
        </div> 
    `
   
    const photographerVideo = `
        <video 
            type="video/mp4"
            controls="controls"
            title=""
            alt=" ${videoTitle()}"
            class="photographer-video"
        >
            <source src="./assets/Sample Photos/${name}/${video}">  
        </video>
        <div class="photographer-comment" > 
            <p>${videoTitle()}</p>
            <div class="photographer-details">
                <span>${likes}</span>
                <i class="fa fa-heart"></i>
            </div>
        </div>
    `
    if(media.hasOwnProperty('video')){
        wrapper.classList.add('photographer-work')
        wrapper.innerHTML = photographerVideo;
    }else{
        wrapper.classList.add('photographer-work')
        wrapper.innerHTML = photographerPhoto;
    }

    return wrapper
}