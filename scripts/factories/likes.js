export function likes(){
    const wrapper = document.querySelector('.likes')

    const likes = `
        <div> Hello likes </div<
    `;

    wrapper.innerHTML = likes

    return wrapper
}