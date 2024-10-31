import axios from "axios";

const REACT_APP_COUNTRY_API = process.env.REACT_APP_COUNTRY_API;

export const getCountry = async () => {
  const response = await axios.get(`${REACT_APP_COUNTRY_API}/country`);

  return response.data.data;
};
export const getCountryById = async (id) => {
  const response = await axios.get(
    `${REACT_APP_COUNTRY_API}/country/getCountryByID?country_id=${id}`
  );

  return response.data.data;
};
export const postCountry = async ( argument ) => {
  
  const country_name = argument.country;
  const currency_code = argument.currency_code;
  const currency_name = argument.currency_name;
  const response = await axios.post(`${REACT_APP_COUNTRY_API}/country`, {
    country_name,currency_code,
    currency_name 
  });

  return response.data;
};
export const deleteCountry = async (id) => {
  const response = await axios.delete(`${REACT_APP_COUNTRY_API}/country/${id}`);

  return response.data;
};
export const updateCountry = async ({ argument }) => {
  const country_name = argument.country;
  const currency_code = argument.currency_code;
  const currency_name = argument.currency_name;
  const response = await axios.put(
    `${REACT_APP_COUNTRY_API}/country/${argument.id}`,
    { country_name,currency_code,
      currency_name }
  );
  return response.data;
};

export const getState = async () => {
  const response = await axios.get(`${REACT_APP_COUNTRY_API}/state`);

  return response.data.data;
};
export const getStateById = async (id) => {
  const response = await axios.get(
    `${REACT_APP_COUNTRY_API}/state/getStateByID?state_id=${id}`
  );

  return response.data.data;
};

export const deleteState = async (id) => {
  const response = await axios.delete(`${REACT_APP_COUNTRY_API}/state/${id}`);
  return response.data;
};
export const postState = async (argument) => {
  const country_id = argument.country;
  const state_name = argument.state;
  const response = await axios.post(`${REACT_APP_COUNTRY_API}/state`, {
    country_id,
    state_name,
  });

  return response.data;
};
export const putState = async (argument) => {
  const country_id = argument.country;
  const state_name = argument.state;
  const response = await axios.put(
    `${REACT_APP_COUNTRY_API}/state/${argument.params}`,
    { state_name, country_id }
  );
  return response.data;
};

export const getCity = async () => {
  const response = await axios.get(`${REACT_APP_COUNTRY_API}/city`);
  return response.data.data;
};

export const postCity = async (argument) => {
  const city_name = argument.city;
  const state_id = argument.state;
  const country_id = argument.country;

  const response = await axios.post(`${REACT_APP_COUNTRY_API}/city`, {
    state_id,
    city_name,
  });
  return response.data;
};

export const deleteCity = async (id) => {
  const response = await axios.delete(`${REACT_APP_COUNTRY_API}/city/${id}`);
  return response.data;
};
export const getCityById = async (id) => {
  const response = await axios.get(
    `${REACT_APP_COUNTRY_API}/city/CityByCityId?city_id=${id}`
  );
  return response.data.data;
};
export const putCity = async (argument) => {
  const city_name = argument.city;
  const state_id = argument.state;
  const response = await axios.put(
    `${REACT_APP_COUNTRY_API}/city/${argument.params}`,
    {
      city_name,
      state_id,
    }
  );
  return response.data;
};
export const getStateByCountryId = async (id) => {
  const response = await axios.get(
    `${REACT_APP_COUNTRY_API}/state?country_id=${id}`
  );
  return response.data.data;
};
