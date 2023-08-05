const title = document.querySelector('#title');
const image = document.querySelector('#image');
const state = document.querySelector('#state');
const city = document.querySelector('#city');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isEveryThingAlright = true;



    //checking if there's a image
    if (image.value.length < 2) {
        image.style.borderColor = 'red';
        isEveryThingAlright = false;
    }

    //checking if there's a title
    if (title.value.length < 4) {
        title.style.borderColor = 'red';
        isEveryThingAlright = false;
    }

    //checking if there's a state
    if (state.value === 'false') {
        state.style.borderColor = 'red';
        isEveryThingAlright = false;
    }

    //checking if there's a city
    if (city.value === 'false') {
        city.style.borderColor = 'red';
        isEveryThingAlright = false;
    }

    if (isEveryThingAlright) {
        form.submit();
    }

})



// adding back the pattern border on click of every input
inputs.forEach((i) => {
    i.addEventListener('click', () => {
        i.style.borderColor = '#61677A';
        i.focus()
    })
})