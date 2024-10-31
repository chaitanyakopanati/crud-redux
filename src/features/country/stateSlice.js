import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Await } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteState,
  getState,
  getStateById,
  postState,
  putState,
} from "../../component/Apis";
import { counterSlice } from "./countrySlice";

const initialState = {
  value: [],
  isLoading: false,
};

export const fetchStateData = createAsyncThunk(
  "state/fetchState",
  async (argument, thunkAPI) => {
    try {
      const response = await getState();
      return response;
    } catch (error) {}
  }
);
export const fetchStateDataById = createAsyncThunk(
  "state/fetchStateDataById",
  async (argument, thunkAPI) => {
    try {
      const response = await getStateById(argument);
      return response;
    } catch (error) {}
  }
);
export const addStateData = createAsyncThunk(
  "state/addStateData",
  async (argument, thunkApi) => {
    try {
      const response = await postState(argument);
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
export const updateStateData = createAsyncThunk(
  "state/updateStateData",
  async (argument, thunkApi) => {
    try {
      const response = await putState(argument);

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

export const deleteStateData = createAsyncThunk(
  "state/deleteState",
  async (argument, thunkApi) => {
    try {
      const response = await deleteState(argument);

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

const allFunctions = [
  addStateData,
  fetchStateData,
  deleteStateData,
  updateStateData,
];
export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setState: (state, action) => {
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
          state.value = action.payload;
        });
    }
  },
});

export const { setState } = stateSlice.actions;
export default stateSlice.reducer;
