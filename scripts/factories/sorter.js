
import { displaySelectedItem } from '../utils/sorterSelect.js';

export function sorter(media, photographer) {
    const sorterWrapper = document.querySelector('.sorter')

    function sorterOnKeydown() {
        const sorterItems = document.querySelector('.sorter__items');
        const sorterSelected = document.querySelector('.sorter__selected');
        const btnSelected = document.querySelector('.fa-angle-down');

        sorterSelected.addEventListener('keydown', (e) => {
            if (e.key === "Enter" || e.keyCode === 13) {
                sorterItems.classList.toggle('active');
                btnSelected.classList.toggle('active')
                // si btnSelected active ==> sorter item active (ouvert)
                if (btnSelected.classList.contains('active') || sorterItems.classList.contains('active')) {
                    document.addEventListener(
                        'click',
                        (e) => {
                            // si le clic se produit hors de sorter__container
                            if (!e.target.closest(".sorter__container")) {
                                console.log('alert je ferme')
                                sorterItems.classList.remove('active')
                                btnSelected.classList.remove('active')
                            }
                        }
                    )   
                     // piege le focus dans sorter__container
                    const container = document.querySelector('.sorter__container');
                    const focusablePhotographerEltsString = 'div, li ';
                    const focusablePhotographerElts = container.querySelectorAll(focusablePhotographerEltsString);
                    const focusableLength = focusablePhotographerElts.length;
                    const firstFocusable = focusablePhotographerElts[0];
                    const lastFocusable = focusablePhotographerElts[focusableLength - 1];
                    container.addEventListener('keydown', (e) => {
                        if (e.key === "Tab" || e.keyCode === 9) {
                            if (e.shiftKey) {
                               
                                if (document.activeElement === firstFocusable) {                
                                    e.preventDefault()
                                    lastFocusable.focus()
                                }
                            } else {
                                if (document.activeElement === lastFocusable) {
                                    e.preventDefault()
                                    firstFocusable.focus()
                                }
                            }
                        }
                    })
                   
                }      
            }
        })

        //faire fonctionner le enter dans chaque item
        const sorterItem = sorterItems.querySelectorAll('.sorter__item');
        sorterItem.forEach(item => item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.keyCode === 13){
                    e.preventDefault();
            
                    let x;
                    let selectedItem = item.querySelector('.sorter__sort').innerHTML;
                    x = sorterSelected.querySelector('.sorter__selectedText').innerHTML;
                    sorterSelected.querySelector('.sorter__selectedText').innerHTML = selectedItem;
                    item.querySelector('.sorter__sort').innerHTML = x;

                    displaySelectedItem(selectedItem, media, photographer);
            }
        }))

    }

    function sorterOnClick() {
        const sorterItems = document.querySelector('.sorter__items');
        const sorterSelected = document.querySelector('.sorter__selected');
        const btnSelected = document.querySelector('.fa-angle-down');
        const sorterItem = sorterItems.querySelectorAll('.sorter__item');

        // chaque fois qu on clicke sur sorter selected, on ferme ou on ouvre sorter__item
        sorterSelected.addEventListener('click', () => {

            sorterItems.classList.toggle('active');
            btnSelected.classList.toggle('active');
            
            const sorterSelectedAfter = window.getComputedStyle(sorterSelected, "::after");
            sorterSelectedAfter
            sorterSelected.style.setProperty("transrorm", "rotate(180deg)")
            if(sorterItems.classList.contains('active')){
                sorterItems.setAttribute('aria-hidden', 'false');
            }else{
                sorterItems.setAttribute('aria-hidden', 'true');
            }

            // si btnSelected active ==> sorter item active 
            if (sorterItems.classList.contains('active')) {
                document.addEventListener(
                    'click',
                    (e) => {
                        // si le clic se produit hors de sorter__container
                        if (!e.target.closest(".sorter__container")) {
                            sorterItems.classList.remove('active');
                            btnSelected.classList.remove('active');
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
                x = sorterSelected.querySelector('.sorter__selectedText').innerHTML;
                sorterSelected.querySelector('.sorter__selectedText').innerHTML = selectedItem;
                item.querySelector('.sorter__sort').innerHTML = x;

                displaySelectedItem(selectedItem, media, photographer);

            })
        })

        // Ici:    DO {piéger le focus dans sorter}  TANT QUE {}
    }

    function nom(){
        
        const sort = document.querySelector('.sorter__selectedText');
        sort.setAttribute("aria-label", sort.innerHTML)
        
    }

    const sorter = /*html*/`
        
        <h2 class="sorter__title" id="titre">Trier par</h2>
        <div class="sorter__container" id="sorterContainer" >
            <div class="sorter__selected btn" tabindex="3" role="button">
                <p class="sorter__selectedText" id="affiche-choix-tri">date</p>
                <i class="fas fa-angle-down"></i>
            </div>
            <ul class="sorter__items" aria-hidden="true" >
                <li class="sorter__item  btn" tabindex="3" role="button" aria-label="trier par  ">
                    <p class="sorter__sort" id="choix-tri">likes</p>
                </li>
                <li class="sorter__item  btn" tabindex="3" role="button" aria-label="trier par">
                    <p class="sorter__sort" id="choix-tri">titre</p>
                </li>
            </ul>
        </div>
        
    `;
   
    sorterWrapper.innerHTML = sorter
    nom()
    sorterOnKeydown()
    sorterOnClick()
    return sorterWrapper
}



