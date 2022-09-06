
export function getPhotographer(photographer){

    const { name, portrait, city, country, tagline } = photographer;
    const header = document.querySelector('.photographerHeader');
 
    const photograph = /*html*/`
        <div class="photographerHeader__id"> 
            <h1 tabindex="2">${name}</h1>
            <p tabindex="2"> ${city}: ${country} </p>
            <span> ${tagline} </span>
        </div>
        <div class="photographerHeader__btn">
            <button 
                class=" btn" 
                type="button" 
                aria-label="ouvre le formulaire pour contacter ${name}" 
                tabindex="2"
            >
            Contactez-moi
            </button>
        </div>
        <div class="photographerHeader__img" >
            <img src="assets/photographers/${portrait}" alt="photographie de ${name}" tabindex="2"/>
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
    const { title, likes , image, video, date } = media;
    
    const videoTitle = () => {
        const title = String(video).split('.')[0].split("_").join(' ');
        return title;
    }

    const photographerPhoto = /*html*/`
       
        <img 
            role="bouton"
            aria-label="acceder au carrossel de ${name}"
            src="./assets/Sample Photos/${name}/${image}" 
            class="photographerMedia__img" 
            alt="une image qui représente le ${title}" 
            tabindex="4" 
        />
        <div class="photographerMedia__comment" >
            <h3 tabindex="4">${title}</h3>
            <div class="photographerMedia__details" role="button" aria-labelledby="bouton-likes">
                <span class="photographerLikes">${likes}</span>
                <i 
                    
                    class="fa fa-heart faLikeIncrement" 
                    data-increment="false" 
                    tabindex="4" 
                >
                </i>
            </div>
        
       </div>
    `;
   
    const photographerVideo = /*html*/`
        
        <video 
            role="button"
            aria-label="acceder au carrossel"
            type="video/mp4"
            title=""
            alt=" ${videoTitle()}"
            class="photographerMedia__video"
            tabindex="4"
        >
            <source src="./assets/Sample Photos/${name}/${video}"  >  
        </video>
        
        <div class="photographerMedia__comment" > 
            <h3 tabindex="4">${videoTitle()}</h3>
            <div class="photographerMedia__details">
                <span class="photographerLikes">${likes}</span>
                <i 
                    role="button"
                    aria-pressed="false"
                    aria-label="le nombre de likes est ${likes}, clickez pour en rajouter"
                    class="fa fa-heart faLikeIncrement" 
                    data-increment="false" 
                    tabindex="4" 
                    aria-hidden='false'
                >
                </i>
            </div>
        </div>
       
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