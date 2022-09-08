export class NewCountry {
  filter = '?fields=name,capital,population,flags,languages';
  baseUrl = 'https://restcountries.com/v3.1/name/';

  fetchCountries(name = '') {
    return fetch(`${this.baseUrl}${name}${this.filter}`)
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));
  }
}
