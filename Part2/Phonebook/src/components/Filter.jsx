const Filter = ({ nameTobeSearched, onChange }) => {
  return (
    <>
      <div>
        Filter shown with:
        <input onChange={onChange} type="text" value={nameTobeSearched} />
      </div>
    </>
  );
};

export default Filter;
