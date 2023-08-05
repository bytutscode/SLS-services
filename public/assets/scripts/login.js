const inputs = document.querySelectorAll('input');
const errorField = document.querySelector('#error');



inputs.forEach((input) => {
    input.addEventListener('click', () => {

        errorField.style.opacity = 0;
    })

});