import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCountryData,
  setCountry,
} from "../../features/country/countrySlice";
import {
  addStateData,
  fetchStateData,
  fetchStateDataById,
  setState,
  updateStateData,
} from "../../features/country/stateSlice";
import { updateCountry } from "../Apis";

const State_Form = () => {
  const [stateId, setStateId] = useState("");
  const [isLoadingOnButton, setIsLoadingOnButton] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const stateList = useSelector((state) => state.state.value);

  const countryList = useSelector((state) => state.country.value);

  useEffect(() => {
    fetchCountry();
    fetchstate();
  }, []);
  const fetchCountry = async () => {
    dispatch(fetchCountryData()).then((res) => {
      dispatch(setCountry(res.payload));
    });
  };
  const fetchstate = async () => {
    dispatch(fetchStateData()).then((res) => {
      dispatch(setState(res.payload));
    });
  };

  const SignUpSchema = Yup.object({
    country: Yup.string().required("*country is required*"),
    state: Yup.string().min(3).max(15).required("*state name is required*"),
  });
  const initialValues = {
    country: "",
    state: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values, action) => {
      setIsLoadingOnButton(true);

      const res = params.id
        ? dispatch(
            updateStateData({
              country: values.country,
              state: values.state,
              params: params.id,
            })
          ).then(() => fetchstate())
        : dispatch(
            addStateData({ country: values.country, state: values.state })
          ).then(() => fetchstate());
      res
        .then(() => setIsLoadingOnButton(false))
        .then(() => navigate("/state"));
    },
  });
  const getstateById = async () => {
    const res = await dispatch(fetchStateDataById(params.id));
    return res.payload;
  };
  useEffect(() => {
    const data = async () => {
      const state =
        stateList.length > 0
          ? stateList.find((el) => el.state_id == params.id)
          : await getstateById();
      if (params.id) {
        formik.setFieldValue("country", state.country_id);
        formik.setFieldValue("state", state.state_name);
      }
      setStateId(state);
    };
    data();
  }, [params.id]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div>
            <InputLabel id="demo-simple-select-label">country</InputLabel>
            <FormControl
              fullWidth
              error={formik.errors.country && formik.touched.country}
            >
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                label="country"
                name="country"
                displayEmpty
                value={formik.values.country}
                onChange={formik.handleChange}
                variant="standard"
              >
                <MenuItem value="" >Please Select Country</MenuItem>
                {countryList &&
                  countryList.map((option,i) => (
                    <MenuItem key={i} value={option.country_id}>
                      {option.country_name}
                    </MenuItem>
                  ))}
              </Select>
              {formik.errors.country && formik.touched.country ? (
                <FormHelperText>{formik.errors.country}</FormHelperText>
              ) : null}
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl fullWidth>
              <TextField
                id="outlined-error-helper-text"
                label="state"variant="standard"
                name="state"
                error={formik.errors.state && formik.touched.state}
                helperText={
                  formik.errors.state && formik.touched.state
                    ? formik.errors.state
                    : null
                }
                value={formik.values.state}
                onChange={formik.handleChange}
              />
            </FormControl>
          </div>
          {params.id ? (
            <Button sx={{margin:2}} variant="outlined" type="submit">
              {isLoadingOnButton ? (
                <CircularProgress color="inherit"  size={20} />
                ) : (
                  "Update"
                  )}
            </Button>
          ) : (
            <Button sx={{margin:2}} variant="outlined" type="submit">
              {isLoadingOnButton ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Save" 
              )}
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default State_Form;
