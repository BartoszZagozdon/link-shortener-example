let menuFlag = false;

let mobileMenu = document.querySelector('.mobile-menu-displayed');
let input = document.querySelector('input');

const regExp = /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

document.querySelector('.mobile-menu-container').addEventListener('click', () => {
    if(menuFlag){
        mobileMenu.style.display = 'none';
        menuFlag = false;
    }
    else {
        mobileMenu.style.display = 'flex';
        menuFlag = true;
    }
})

const shortenLink = () => { //funkcja symulująca skracanie linków
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return `https://rel.ink/${result}`;
}

const copyLink = (event) => {
    let shortenLink = event.currentTarget.previousElementSibling.innerHTML;

    navigator.clipboard.writeText(shortenLink);

    event.currentTarget.style.backgroundColor = 'hsl(257, 27%, 26%)';
    event.currentTarget.innerHTML = 'Copied!';

}

document.querySelector('.short-btn').addEventListener('click', () => {

    let original = input.value;

    if(original.match(regExp)) {
        let element = `<div class="shorten-link-container">
                    <a href="${original}" class="original-link">${original}</a><hr class="link-line">
                    <a href="${shortenLink()}" class="shorten-link">${shortenLink()}</a>
                    <button class="btn copy-btn">Copy</button>
                    </div>`;

    document.querySelector('.shorten-links-list').insertAdjacentHTML('beforeend', element);

    let copyBtn = document.querySelectorAll('.copy-btn');

    for(let btn of copyBtn)
    {
        btn.addEventListener('click', copyLink);
    }

    
    
    }
    else {
        document.querySelector('.error').style.display = 'block';

        input.classList.add('input-bad');
    }

})

input.addEventListener('focus', () => {
    document.querySelector('.error').style.display = 'none';
    input.classList.remove('input-bad');
})

