import { useEffect, useState } from "react";
import axios from "axios";
import SingleNation from "./components/SingleNation";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const handleChange = (e) => {
    setSearchText(e.target.value);
    setSelectedCountry(null);
  };

  const handleBack = () => {
    setSelectedCountry(null);
  };

  // console.log(result);

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setCountries(res.data);
    });

    if (searchText) {
      const temp = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCountries(temp);
    }
  }, [searchText, countries]);

  // const filteredCountries = searchText
  //   ? countries.filter((country) =>
  //       country.name.common.toLowerCase().includes(searchText.toLowerCase())
  //     )
  //   : [];

  if (!countries) {
    return;
  }

  return (
    <div>
      <div>
        Find Countries{" "}
        <input onChange={handleChange} type="text" value={searchText} />
        <div>
          {selectedCountry ? (
            <SingleNation
              country={selectedCountry}
              onBack={handleBack}
              isSelected={true}
            />
          ) : filteredCountries.length > 10 ? (
            "Too many matches, specify another filter"
          ) : filteredCountries.length === 1 ? (
            <SingleNation country={filteredCountries[0]} isSelected={false} />
          ) : (
            filteredCountries.map((country) => (
              <p key={country.name.common}>
                {country.name.common}{" "}
                <button onClick={() => setSelectedCountry(country)}>
                  Show Details
                </button>
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
