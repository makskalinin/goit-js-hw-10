import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {fetchCountries} from "./js/fetchCountries";

const DEBOUNCE_DELAY = 300;

const refs = {
    countryInput: document.querySelector("#search-box"),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

fetchCountries();
refs.countryInput.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry() {
  const inputText = refs.countryInput.value.trim();

  clear()

  if (!inputText) {
    return;
    }
    
  fetchCountries(inputText)
    .then(countries => {
      if (countries.status === 404) {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        return;
      }
      if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        return;
      }
      if (countries.length > 1) {
        markupCountries(countries);
        return;
      }
      markupOneCountry(countries);
    })
    .catch(error => console.log(error));
};

function markupCountries(countries) {
  refs.countryInfo.innerHTML = '';
  const markup = countries
    .map(country => {
      return `<li class="country-list--item">
                <img src='${country.flag}' alt='${country.name} flag' width='40' />
                <p>${country.name}</p>
              </li>`;
    })
    .join('');
      refs.countryInfo.innerHTML = markup;
};

function markupOneCountry(country) {
  refs.countryList.innerHTML = '';
  const markup = country
    .map(country => {
      return `<div class="country">
                <img src='${country.flag}' alt='${country.name} flag' width='70' />
                <h2 class="country_name">${country.name}</h2>
              </div>
            <ul>
                <li>Capital: ${country.capital}</span></li>
                <li>Population: ${country.population}</span></li>
                <li>Languages: ${country.languages.map(item => ` ${item.name}`)}</span></li>
            </ul>`
    })
    refs.countryInfo.innerHTML = markup;
};

function clear() {
  refs.countryInput.innerHTML = '';
  refs.countryList.innerHTML = '';
}