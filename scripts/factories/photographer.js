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
                <button class="contact_button" >Contactez-moi</button>
            </div>
            <div>
                <img src="assets/photographers/${portrait}" class="photographer-img"/>
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
    const { title, likes , image} = media
    const photographerMedia = `
        <img src="/assets/Sample Photos/${name}/${image}" class="photographerImg"/>
        <div class="comment" > 
            <p>${title}</p>
            <p>${likes}</p>
            <i class="fa fa-heart"></i>
        </div>
    `
    wrapper.classList.add('photographer-work')
    wrapper.innerHTML = photographerMedia;

    return wrapper
}