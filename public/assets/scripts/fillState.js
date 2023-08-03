

const stateImput = document.querySelector('#state');
const cityImput = document.querySelector('#city');


const loadStates = () => {
    stateImput.innerHTML = '<option disabled selected value="false">Estado</option>';

    states.forEach(state => {
        let stateElem = document.createElement('option');
        stateElem.innerHTML = state.nome;
        stateElem.value = state.nome;
        stateImput.append(stateElem)
    })
}

loadStates();

const loadCities = () => {
    const estado = states.find((state) => state.nome.toLowerCase() == stateImput.value.toLowerCase());

    cityImput.innerHTML = '<option disabled selected value="false">Cidade</option>';

    estado.cidades.forEach(c => {
        let city = document.createElement('option');
        city.innerHTML = c;
        city.value = c;
        cityImput.append(city);
    })
}

stateImput.addEventListener('change', loadCities);
