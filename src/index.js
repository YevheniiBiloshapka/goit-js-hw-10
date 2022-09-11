import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NewCountry } from './js/fetchCountries';
const counrty = new NewCountry();

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const inputValue = document.querySelector('#search-box');
inputValue.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

function onInputText() {
  const value = inputValue.value.trim();
  if (value === '') {
    return (countryInfo.innerHTML = ''), (countryList.innerHTML = '');
  }

  counrty
    .fetchCountries(`${value}`)
    .then(data => {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';

      if (data.length === 1) {
        countryInfo.insertAdjacentHTML('beforeend', createItemInfo(data));
        countryList.insertAdjacentHTML('beforeend', createItemName(data));
      } else if (data.length >= 10) {
        alertTooManyMatches();
      } else {
        countryList.insertAdjacentHTML('beforeend', createItemName(data));
      }
    })
    .catch(alertWrongName);
}

function createItemName(arr) {
  return arr
    .map(
      ({ name, flags }) => `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>`
    )
    .join('');
}

function createItemInfo(arr) {
  // 			` <li class="country-info__item"><p><b>${}: </b>${}</p></li>`;
  return arr
    .map(
      ({ capital, population, languages }) => `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(
              languages
            ).join(', ')}</p></li>
        </ul>`
    )
    .join('');
}

function alertWrongName() {
  Notify.failure('Oops, there is no country with that name');
}

function alertTooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}
