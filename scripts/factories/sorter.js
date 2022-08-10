export function sorter(){
    const sorterWrapper = document.querySelector('.sorter')

    function sorterOnClick (){
        const sorterItems = document.querySelectorAll('.sorter__item');
        const sorterItemsLength = sorterItems.length;
        const sorterSelected = document.querySelector('.sorter__selected');
        const btnSelected = document.querySelector('.fa-angle-down');
       

        // chaque fois qu on clicke sur sorter selected
        sorterItems[0].addEventListener('click', () => {
            
            for( let i=0; i<sorterItemsLength; i++){
                sorterItems[i].classList.toggle('active')
            }
            btnSelected.classList.toggle('active'); 
        })

        // le item selecté s'affiche dans sorter__sort
        sorterItems.forEach(item => {
            item.addEventListener('click', () => {
                let x;
                let selectedItem = item.querySelector('.sorter__sort').innerHTML;
                x=sorterSelected.innerHTML;
                sorterSelected.innerHTML = selectedItem;
                item.querySelector('.sorter__sort').innerHTML = x;
                console.log('selectedItem: ', selectedItem)
            })
    
        })
        
    }

    
    const sorter = /*html*/`
        <div class="sorter__container">
            <h2 class="sorter__title">Trier par</h2>
            <ul class="sorter__items">
                <li class="sorter__item" tabindex="3">
                    <p class="sorter__sort sorter__selected">date</p>
                    <i class="fas fa-angle-down"></i>
                </li>
                <li class="sorter__item" tabindex="3">
                    <p class="sorter__sort">popularité</p>
                </li>
                <li class="sorter__item" tabindex="3">
                    <p class="sorter__sort">titre</p>
                </li>
            </ul>
        </div>
    `;

    sorterWrapper.innerHTML = sorter

    sorterOnClick()
    return sorterWrapper
}