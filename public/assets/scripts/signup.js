const name = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');


//adding a mask to phone number
phone.addEventListener('input', (e) => {

    // verifying is is a number
    if (isNaN(e.data) || phone.value.length > 15) {
        phone.value = phone.value.slice(0, -1);
    }

    //getting only the numbers
    let phoneNumber = '';
    let allowed = ['1', ' 2', '3', '4', '5', '6', '7', '8', '9', '0'];
    for (let n of phone.value) {

        if (allowed.includes(n)) {
            phoneNumber += n
        }
    }

    if (!(e.inputType === "deleteContentBackward")) {

        //adding a mask like (xx) x xxxx-xxxx

        switch (phone.value.length) {
            case 1: phone.value = `(${phoneNumber.slice(0, 1)}`;
                break;
            case 3: phone.value = `(${phoneNumber.slice(0, 2)}) `;
                break;
            case 5: phone.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} `;
                break;
            case 6: phone.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3)}`;
                break;
            case 7: phone.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3)}`;
                break;
            case 8: phone.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3)}`;
                break;
            case 9: phone.value = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3)}`;
                break;
        }


    }

})





form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isEveryThingAlright = true;



    //checking if there's a valid name
    if (name.value.length < 2 || !isNaN(name.value)) {
        name.style.borderColor = 'red';
        isEveryThingAlright = false;
    }

    //checking if there's an email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.value)) {
        isEveryThingAlright = false;
        email.style.borderColor = 'red';
    }

    //checking if the password is valid 

    if (password.value == '' || password.value.length < 8) {
        isEveryThingAlright = false;
        password.style.borderColor = 'red';

    }

    //checking if the password and password confirm matches
    if (password.value !== confirmPassword.value || confirmPassword.value.length < 8) {
        isEveryThingAlright = false;
        confirmPassword.style.borderColor = 'red';
    }

    //checking if there's a valid phone

    if (phone.value.length !== 15) {
        isEveryThingAlright = false;
        phone.style.borderColor = 'red';
    }

    if (isEveryThingAlright) {
        form.submit();
    }

})



// adding back the pattern border on click of every input
inputs.forEach((i) => {
    i.addEventListener('click', () => {
        i.style.borderColor = '#1A5D1A';
        i.focus()
    })
})