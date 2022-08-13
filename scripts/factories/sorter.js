
import { displaySelectedItem } from '../utils/sorterSelect.js'; 

export function sorter(media, photographer){
    const sorterWrapper = document.querySelector('.sorter')
    
    function sorterOnClick (){
        const sorterItems = document.querySelector('.sorter__items');
        const sorterSelected = document.querySelector('.sorter__selected');
        const btnSelected = document.querySelector('.fa-angle-down'); 
        const sorterItem = sorterItems.querySelectorAll('.sorter__item');
       

        // chaque fois qu on clicke sur sorter selected, on ferme ou on ouvre sorter__item
        sorterSelected.addEventListener('click', () => {
            
            sorterItems.classList.toggle('active'); 
            btnSelected.classList.toggle('active')
            // si btnSelected active ==> sorter item active 
            if(btnSelected.classList.contains('active')){
                document.addEventListener(
                    'click', 
                    (e) => {
                        // si le clic se produit hors de sorter__container
                        if(!e.target.closest(".sorter__container")){
                            sorterItems.classList.remove('active')
                            btnSelected.classList.remove('active')
                        }
                    }
                )
            }
        })

        // le item selecté s'affiche dans sorter__sort ET on affiche les selected item
        sorterItem.forEach(item => {
            item.addEventListener('click', () => {
                let x;
                let selectedItem = item.querySelector('.sorter__sort').innerHTML;
                x=sorterSelected.querySelector('.sorter__selectedText').innerHTML;
                sorterSelected.querySelector('.sorter__selectedText').innerHTML = selectedItem;
                item.querySelector('.sorter__sort').innerHTML = x;

                displaySelectedItem(selectedItem, media, photographer);
                
            })
        })
    }


    const sorter = /*html*/`
    <div class="sorter">
    <h2 class="sorter__title">Trier par</h2>
    <div class="sorter__container">
        <div class="sorter__selected btn">
            <p class="sorter__selectedText">date</p>
            <i class="fas fa-angle-down"></i>
        </div>
        <ul class="sorter__items">
            <li class="sorter__item btn" tabindex="3">
                <p class="sorter__sort">likes</p>
            </li>
            <li class="sorter__item btn" tabindex="3">
                <p class="sorter__sort">titre</p>
            </li>
        </ul>
    </div>
</div> 
    `;
    // <i class="fas fa-angle-down"></i>
    sorterWrapper.innerHTML = sorter

    sorterOnClick()
    return sorterWrapper
}


    // // fonction pour afficher le selts séléctés
    // function displaySelectedItem(sorted){
    //     const mediaWrapper = document.querySelector('.photographerMedia')
    //     // selected(elements media, sorted: selectedItem)
    //     const sortedData = select(media, sorted)
    //     sortedData.forEach(sorted =>{
    //         const template = getPhotographerMedia(sorted, photographer);
    //         mediaWrapper.removeChild(mediaWrapper.firstElementChild)
    //         mediaWrapper.appendChild(template);
    //     })
        
    // }

    // function select(data, orderBy){
    //     if(orderBy === "likes"){
           
    //         data.sort((a, b) => {
    //             console.log("likes")
    //             return b.likes - a.likes
    //         })
    
    //         return data
    //     }else if(orderBy === "date"){
    //         console.log("date data: ", data)
    //         data.sort((a, b) => {
    //             return new Date(b.date) - new Date(a.date)
    //         })
    //         console.log("date")
    //         return data
    //     }else if(orderBy === "titre"){
    //         console.log("titre data: ", data)
    //         data.sort((a, b) => {
    //             return (a.title || a.video).localeCompare(b.title || a.video)
    //         }) 
            
    //         return data
    //     }else{
    //         throw 'unknow orderBy type'
    //     }
    // }