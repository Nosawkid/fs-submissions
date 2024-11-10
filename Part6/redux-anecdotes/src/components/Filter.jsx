import { useDispatch } from "react-redux";
import { filterReducer } from "../reducers/filterReducer";
const Filter = () => {
  const dispatch = useDispatch();
  const style = {
    marginBottom: 10,
  };

  const handleChange = (e) => {
    dispatch(filterReducer(e.target.value));
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;
