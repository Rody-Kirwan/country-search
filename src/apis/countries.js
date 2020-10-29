export const getCountries = () => fetch('https://restcountries.eu/rest/v2/all').then(res => res.json())
.then(json => {

  return json.map(item => {
    const {
      population,
      flag,
      region,
      capital,
      name,
      alpha3Code
    } = item

    return {
      population,
      flag,
      region,
      capital,
      name,
      alpha3Code
    }
  })
})