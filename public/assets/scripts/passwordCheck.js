const password = document.querySelector('form input[name=password]');
const passwordCheck = document.querySelector('form input[name=passwordCheck]');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
console.log(password, passwordCheck)

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (password.value !== passwordCheck.value || password.value.length < 8) {
        password.style.borderColor = 'red';
        passwordCheck.style.borderColor = 'red';
    } else {
        form.submit();
    }
});

inputs.forEach(input => {
    input.addEventListener('click', () => {
        input.style.borderColor = '#1A5D1A'
    })
})
