export function photographerFactory(data) {
    const { name, portrait, city, country, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const link = document.createElement('a');
        link.setAttribute("href", "photographer.html");

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute('alt', `photographie de ${name}`)

        const cityElt = document.createElement('p');
        cityElt.textContent = `${city}, ${country}`;

        const tag = document.createElement('p');
        tag.innerHTML = tagline;
        
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const article = document.createElement( 'article' );

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(cityElt);
        article.appendChild(tag)
        link.appendChild(article);
        return (link);
    }
    return { name, picture,city ,country ,tagline, getUserCardDOM }
}