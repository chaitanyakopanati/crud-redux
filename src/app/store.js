import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../features/country/countrySlice";
import stateReducer from "../features/country/stateSlice";
import cityReducer from "../features/country/citySlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    state: stateReducer,
    city: cityReducer,
  },
});
