export function sorter(){
    const sorterWrapper = document.querySelector('.sorter')
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

    return sorterWrapper
}