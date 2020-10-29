import React, { useState, useEffect } from 'react'
import { getCountries } from '../../apis/countries'

import './CountrySearch.css'

const CountryFlag = ({ flag }) => (
  <div>
    <img src={flag} />
  </div>
)

const CountryDetails = ({ name, alpha3Code, ...rest }) => (
  <div>
    <h3>
      {name}
    </h3>
    {
        Object.keys(rest).map(key => {

          return (
            <div className="details">
              <span className="detail-title"><b>{key}:</b></span>
              <span className="detail-text">{rest[key]}</span>
            </div>
          )
        })
    }
  </div>
)

const CountryTile = ({ flag, ...rest }) => {

  return (
    <div className="country-tile">
      <CountryFlag flag={flag} />
      <CountryDetails {...rest} />
    </div>
  )
}

const RegionFilter = ({ onChange, options, value }) => (
  <select value={value} onChange={onChange}>
    <option>Filter by region</option>
    {
      options.map(option => (
        <option>
          {option}
        </option>
      ))
    }
  </select>
)

const Search = ({ onChange, value }) => {
  return (
    <input 
      value={value} 
      onChange={onChange} 
      type="text" placeholder="Search for a country..." />
  )
}

const CountrySearchContainer = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("")

  const handleChangeSearch = (e) => {
    e.preventDefault()
    const { target: { value } } = e;

    setSearchTerm(value)
  }

  const handleFilterChange = (e) => {
    e.preventDefault()
    const { target: { value } } = e;
    setFilter(value)
  }

  useEffect(async () => {
    const data = await getCountries()

    setCountries(data)
  }, [])

  const filterCountries = () => {
    return countries.filter(({ region }) =>  {
      if (!filter) {
        return true
      }

      return region.toLowerCase() === filter.toLowerCase()
    })
    .filter(({ name }) => {
      if (!searchTerm) {
        return true
      }

      return name.toLowerCase().startsWith(searchTerm.toLowerCase())
    })
  }

  const filteredCountries = filterCountries()

  const uniqueRegions = [
    ...new Set(countries
      .map(({ region }) => region)
      .filter(Boolean))
  ]


  return (
    <>  
      <div className="filter-container">
        <RegionFilter
          value={filter}
          options={uniqueRegions}onChange={handleFilterChange} 
        />
      </div>
      <div className="search-container">
        <Search
          value={searchTerm} 
          onChange={handleChangeSearch} />
      </div>
      <div className="country-search-container">
        {
          filteredCountries.map((props) => <CountryTile key={props.alpha3Code} {...props} />)
        }
      </div>
    </>
    
  )

}

export default CountrySearchContainer