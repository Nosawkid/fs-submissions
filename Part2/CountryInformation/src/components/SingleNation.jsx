const SingleNation = ({ country, onBack, isSelected = false }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>{country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      {Object.keys(country.languages).map((key) => (
        <p key={key}>{country.languages[key]}</p>
      ))}
      <img src={country.flags.png} alt="" />
      {isSelected && <button onClick={onBack}>Back</button>}
    </div>
  );
};

export default SingleNation;
