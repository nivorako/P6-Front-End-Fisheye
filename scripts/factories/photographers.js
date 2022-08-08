// 

export function photographersFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const link = document.createElement('a');
        link.setAttribute("href", `photographer.html?${id}`);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute('alt', `photographie de ${name}`)

        const cityElt = document.createElement('p');
        cityElt.innerHTML = `${country}: ${city}`;

        const tag = document.createElement('p');
        tag.innerHTML = tagline;
        tag.classList.add('photographers_section-tag');

        const priceElt = document.createElement('span');
        priceElt.innerHTML = `${price}€/jour`
        
        const h2 = document.createElement( 'h2' );
        h2.innerHTML = name;

        const label = document.createElement('div');
        label.classList.add('photographers_section-label');

        const article = document.createElement( 'article' );

        link.appendChild(img);
        link.appendChild(h2);

        label.appendChild(cityElt);
        label.appendChild(tag);
        label.appendChild(priceElt);
        
        
        article.appendChild(link);
        article.appendChild(label)
        return (article);
    }
    return {  getUserCardDOM }
}


