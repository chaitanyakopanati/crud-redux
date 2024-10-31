import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteCity,
  getCity,
  getCityById,
  getStateByCountryId,
  postCity,
  putCity,
} from "../../component/Apis";

const initialState = {
  value: [],
  state: [],
  isLoading: false,
};

export const fetchCityData = createAsyncThunk(
  "city/fetchCityData",
  async (argument, thunkAPI) => {
    try {
      const response = await getCity();
      return response;
    } catch (error) {}
  }
);
export const fetchCityById = createAsyncThunk(
  "city/fetchCityData",
  async (argument, thunkAPI) => {
    try {
      const response = await getCityById(argument);
      return response;
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }
);
export const fetchStateByCountryIdData = createAsyncThunk(
  "city/fetchStateByCountryId",
  async (argument, thunkAPI) => {
    try {
      const response = await getStateByCountryId(argument);
      return response;
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }
);
export const addCityData = createAsyncThunk(
  "city/addCityData",
  async (argument, thunkAPI) => {
    try {
      const response = await postCity(argument);
      toast(response.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });

      return response;
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

export const deleteCityData = createAsyncThunk(
  "city/deleteCityData",
  async (argument, thunkAPI) => {
    try {
      const response = await deleteCity(argument);
      toast(response.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });
      return response;
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }
);
export const updateCityData = createAsyncThunk(
  "city/updateCityData",
  async (argument, thunkAPI) => {
    try {
      const response = await putCity(argument);
      toast(response.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });
      return response;
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
  addCityData,
  fetchCityData,
  updateCityData,
  deleteCityData,
];
export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.value = action.payload;
    },
    setStateFromCity: (state, action) => {
      state.state = action.payload;
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
          state.value = action.payload;
        });
    }
  },
});

export const { setCity, setStateFromCity } = citySlice.actions;
export default citySlice.reducer;
