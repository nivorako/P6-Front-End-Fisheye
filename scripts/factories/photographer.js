/**
 * 
 * @param {object} data -les infos pour chaque photographe
 * @returns 
 */

function photographerFactory(data) {
    const { name, portrait, country, city, tagline, price, id } = data;


    const picture = `./assets/photographers/${portrait}`;
    //
    const url = `photographer.html?${id}`

    function getUserCardDOM() {

        // create 'a' element as link
        const link = document.createElement('a')
        link.setAttribute("href", url)
        link.classList.add('link')

        // create 'article' element
        const article = document.createElement( 'article' )
        
        // create 'h2' element
        const h2 = document.createElement( 'h2' )
        h2.textContent = name

        // create 'img' element
        const img = document.createElement( 'img' )
        img.setAttribute("src", picture)

        // create 'homeland' element
        const homeland = document.createElement('p')
        homeland.textContent = country + ", " + city

        // create 'tag line text' element
        const taglineText = document.createElement('span')
        taglineText.textContent = tagline

        // create 'price' element
        const priceElement = document.createElement("p")
        priceElement.textContent = price + "€/jour"
        

        article.appendChild(img)
        article.appendChild(h2)
        article.appendChild(homeland)
        article.appendChild(taglineText)
        article.appendChild(priceElement)
        link.appendChild(article)

        return (link)
    }


    return { name, picture, tagline, country, city, price, getUserCardDOM}
}


function test(){
    console.log("allo")
}