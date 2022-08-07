
export function getPhotographer(photographer){

    const { name, portrait, city, country, tagline } = photographer;
    const header = document.querySelector('.photographerHeader');
 
    const photograph = /*html*/`
        <div class="photographerHeader__id"> 
            <h1>${name}</h1>
            <p> ${city}: ${country} </p>
            <span> ${tagline} </span>
        </div>
        <div class="photographerHeader__btn">
            <button class=" btn" tabindex="2">Contactez-moi</button>
        </div>
        <div class="photographerHeader__img" >
            <img src="assets/photographers/${portrait}" alt="photographie de ${name}"/>
        </div>
    `;

    header.innerHTML = photograph;

    return header;
    }

export function photographerName(photographer){
    let name = ""
    let avatar = photographer.name.split(" ")[0]
    if(avatar.split("-").length === 1) name = avatar
    else name = avatar.split("-")[0] + " " + avatar.split("-")[1]
    return name
}
    
export function getPhotographerMedia( media, photographer){
    const wrapper = document.createElement('div');
    const name = photographerName(photographer);
    const { title, likes , image, video } = media;
    
    const videoTitle = () => {
        const title = String(video).split('.')[0].split("_").join(' ');
        return title;
    }

    const photographerPhoto = /*html*/`
        <a href="#">
            <img src="./assets/Sample Photos/${name}/${image}" class="photographerMedia__img" alt="une image qui représente le ${title}" tabindex="4"   />
            <div class="photographerMedia__comment" > 
                <p>${title}</p>
                <div class="photographerMedia__details">
                    <span class="photographerLikes">${likes}</span>
                    <i class="fa fa-heart faLikeIncrement" data-increment="false" tabindex="4"></i>
                </div>
            </div> 
        </a>
    `;
   
    const photographerVideo = /*html*/`
        <a href="#">
            <video 
                type="video/mp4"
                title=""
                alt=" ${videoTitle()}"
                class="photographerMedia__video"
            >
                <source src="./assets/Sample Photos/${name}/${video}" tabindex="5">  
            </video>
            <div class="photographerMedia__comment" > 
                <p>${videoTitle()}</p>
                <div class="photographerMedia__details">
                    <span class="photographerLikes">${likes}</span>
                    <i class="fa fa-heart faLikeIncrement" data-increment="false" tabindex="5"></i>
                </div>
            </div>
        </a>
    `
    if(media.hasOwnProperty('video')){
        wrapper.classList.add('photographerMedia__work')
        wrapper.innerHTML = photographerVideo;
    }else{
        wrapper.classList.add('photographerMedia__work')
        wrapper.innerHTML = photographerPhoto;
    }

    
    return wrapper
}