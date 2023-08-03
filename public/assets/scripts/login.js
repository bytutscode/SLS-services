const inputs = document.querySelectorAll('input');
const errorField = document.querySelector('#error');



inputs.forEach((input) => {
    console.log(input.value)
    input.addEventListener('click', () => {

        errorField.style.opacity = 0;
    })

});