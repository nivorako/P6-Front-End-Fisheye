
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
    const { title, likes , image, video } = media;
    
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
        </div>
        <div class="photographerMedia__comment" aria-labelledby=${title}>
            <h3 tabindex="4" id=${title} >${title}</h3>
            <div class="photographerMedia__details" role="button" aria-labelledby="bouton-PhotoLikes">
                <span class="photographerLikes" tabindex="4" aria-label="le nombre de likes est ${likes}">${likes}</span>
                <span role="button" aria-label="bouton likes incrémente ou décrémente les likes"> 
                    <i 
                        id="bouton-PhotoLikes" 
                        role="button"
                        aria-pressed="false"
                       
                        class="fa fa-heart faLikeIncrement" 
                        data-increment="false" 
                        tabindex="4" 
                        aria*-hidden="false"    
                    >
                    </i>
                </span>  
                  
            </div>
        
       </div>
    `;
   
    const photographerVideo = /*html*/`
        
        <video 
            role="button"
            aria-label="acceder au carrossel de ${name}"
            type="video/mp4"
            title=""
            alt=" ${videoTitle()}"
            class="photographerMedia__video"
            tabindex="4"
        >
            <source src="./assets/Sample Photos/${name}/${video}"  > 
        </video>
        
        <div class="photographerMedia__comment" aria-labelledby=${videoTitle()}> 
            <h3 tabindex="4" id=${videoTitle()}>${videoTitle()}</h3>
            <div class="photographerMedia__details" role="button" aria-labelledby="bouton-videoLikes">
                <span class="photographerLikes" tabindex="4"  aria-label="le nombre de likes est ${likes}">${likes}</span>
                <i 
                    id="bouton-videoLikes" 
                    role="button"
                    aria-pressed="false"
                    class="fa fa-heart faLikeIncrement" 
                    data-increment="false" 
                    tabindex="4" 
                    aria-hidden='false'
                >
                </i>
            </div>
        </div>
       
    `
    
    // eslint-disable-next-line no-prototype-builtins
    if(media.hasOwnProperty('video')){
        wrapper.classList.add('photographerMedia__work')
        wrapper.classList.add('photographerMedia__work--video')
        wrapper.innerHTML = photographerVideo;
    }else{
        wrapper.classList.add('photographerMedia__work')
        wrapper.innerHTML = photographerPhoto;
    }

    
    return wrapper
}