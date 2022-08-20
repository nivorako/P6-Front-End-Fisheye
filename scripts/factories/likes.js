export function likes(media, photographer){

    //definir total nbre likes pour photographer
    const wrapper = document.querySelector('.likes')
    let photographerLength = media.length 
    let nbrLikes = 0

    for(let i=0; i<photographerLength; i++){
        nbrLikes += media[i].likes
    }

    // 
    function incrementLikes(){
        const likeIncrements = document.querySelectorAll('.faLikeIncrement');
        const photographerLikes = document.querySelectorAll('.photographerLikes');
        const photographerLikesLength = photographerLikes.length;
        const likesElt = document.querySelector('.likes__likes');

        for(let i = 0; i < photographerLikesLength; i++){
            // on ne peut cliquer qu une seule fois : data-increment="true"
            likeIncrements[i].addEventListener("click", () => {
                if(likeIncrements[i].getAttribute("data-increment") === 'false'){
                    photographerLikes[i].textContent++;
                    likesElt.textContent++;
                    likeIncrements[i].setAttribute('data-increment', 'true');
                }
            })
            // accessibilité: incrémenter une seule fois likes si enter sur icone
            likeIncrements[i].addEventListener('keydown', (e) => {
                if(e.key === "Enter" || e.keyCode === 13){
                    if(likeIncrements[i].getAttribute("data-increment") === 'false'){
                        photographerLikes[i].textContent++;
                        likesElt.textContent++;
                        likeIncrements[i].setAttribute('data-increment', 'true');
                    }
                }
            })
        }
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
    incrementLikes();
    return wrapper
}