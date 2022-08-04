export function likes(media, photographer){

    const wrapper = document.querySelector('.likes')

    let photographerLength = media.length 
    let nbrLikes = 0

    for(let i=0; i<photographerLength; i++){
        nbrLikes += media[i].likes
    }

    const likes = /*html */`
        <div class="likes__container"> 
            <p class="likes__likes">
                ${nbrLikes} 
                <i class="fa fa-heart"></i>
            </p>  
            <p class="likes__price">${photographer.price} / jour</p>
           
        </div>
    `;

    wrapper.innerHTML = likes

    return wrapper
}