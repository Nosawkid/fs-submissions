import axios from "axios";
const baseUrl = "/api/persons";

const getAllPeople = () => {
  const result = axios.get(baseUrl);
  return result.then((res) => res.data);
};

const addPerson = (personObj) => {
  const req = axios.post(baseUrl, personObj);
  return req.then((res) => res.data);
};

const updatePerson = (id, personObj) => {
  const req = axios.put(`${baseUrl}/${id}`, personObj);
  return req.then((res) => res.data);
};

const deletePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

export default {
  getAllPeople,
  addPerson,
  updatePerson,
  deletePerson,
};
