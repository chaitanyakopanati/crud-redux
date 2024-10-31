import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  deleteCountry,
  getCountry,
  postCountry,
  updateCountry,
} from "../../component/Apis";
// import { fetchCount } from "./counterAPI";

const initialState = {
  value: [],
  isLoading: false,
  error: "",
};

export const fetchCountryData = createAsyncThunk(
  "fetchCountry/fetchCountryData",
  async (argument, thunkAPI) => {
    try {
      const res = await getCountry();
      return res;
    } catch (error) {}
  }
);

export const deleteCountryData = createAsyncThunk(
  "country/deleteCountryData",
  async (argument, thunkAPI) => {
    try {
      const res = await deleteCountry(argument);
      toast(res.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });

      return res;
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }
);

export const postCountryData = createAsyncThunk(
  "addCountry/postCountryData",
  async (argument, thunkAPI) => {
    try {
      const res = await postCountry(argument);
      toast(res.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });

      return res;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "dark",
          })
        : toast.error(error.message, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "dark",
          });
    }
  }
);
export const updateCountryData = createAsyncThunk(
  "updateCountry/updateCountryData",
  async (argument, thunkAPI) => {
    try {
      const res = await updateCountry({
        argument,
      });
      toast(res.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });

      return res;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "dark",
          })
        : toast.error(error.message, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "dark",
          });
    }
  }
);
const allFunctions = [
  fetchCountryData,
  postCountryData,
  updateCountryData,
  deleteCountryData,
];

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    for (const thunk of allFunctions) {
      builder
        .addCase(thunk.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.isLoading = false;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.isLoading = false;
        });
    }
  },
});

export const { setCountry } = countrySlice.actions;

export default countrySlice.reducer;
