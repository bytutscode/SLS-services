const menuBTN = document.querySelector('#menuMobile');
const menu = document.querySelector('header #navmobile');
const menuBars = document.querySelectorAll('#menuMobile .bar');


menuBTN.addEventListener('click', () => {
    menuBTN.classList.toggle('active');
    menu.classList.toggle('active');
    menu.style.transition = 'all ease-in-out .5s';
})