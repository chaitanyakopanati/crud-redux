import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCityData,
  fetchCityById,
  fetchCityData,
  fetchStateByCountryIdData,
  setCity,
  setStateFromCity,
  updateCityData,
} from "../../features/country/citySlice";
import * as Yup from "yup";

import {
  fetchCountryData,
  setCountry,
} from "../../features/country/countrySlice";

const City_Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [isLoadingOnButton, setIsLoadingOnButton] = useState(false);
  const[isCountry,setIsCountry]=useState(false)

  const countryList = useSelector((state) => state.country.value);
  const cityList = useSelector((state) => state.city.value);
  const stateList = useSelector((state) => state.city.state);

  useEffect(() => {
    fetchCountry();
    fetchCity();
  }, []);
  const fetchCountry = async () => {
    dispatch(fetchCountryData()).then((res) => {
      dispatch(setCountry(res.payload));
    });
  };
  
  const fetchCity = async () => {
    dispatch(fetchCityData()).then((res) => dispatch(setCity(res.payload)));
  };
  const SignUpSchema = Yup.object({
    country: Yup.string().required("*country is required*"),
    
    state: Yup.string().min(1).required("*state is required*"),
    city: Yup.string().min(3).max(15).required("*City name is required*"),
  });
  const initialValues = {
    country: "",
    state: "",
    city: "",
  };
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values, action) => {
      setIsLoadingOnButton(true);
      
      const res = params.id
      ? dispatch(
        updateCityData({
          country: values.country,
          state: values.state,
          city: values.city,
          params: params.id,
        })
        ).then(() => fetchCity())
        : dispatch(addCityData(values)).then(() => fetchCity());
        
        res.then(() => setIsLoadingOnButton(false)).then(() => navigate("/city"));
        
        action.resetForm()
      },
    });
    const fetchStatebyCountry = async () => {
      setIsCountry(true)
      dispatch(fetchStateByCountryIdData(formik.values.country)).then((res) =>
      dispatch(setStateFromCity(res.payload))
      );
    };
    useEffect(() => {
      formik.values.country && fetchStatebyCountry();
      if (isCountry) {
        formik.setFieldValue("state","")
      } 
    }, [formik.values.country]);
    console.log(isCountry);
    
    const getCityById = async () => {
      const res = await dispatch(fetchCityById(params.id));
      
      return res.payload;
    };
    
    useEffect(() => {
      const data = async () => {
        const state =
        cityList && cityList.length > 0
        ? cityList.find((el) => el.city_id == params.id)
        : await getCityById();


        if (params.id) {
          return (
            formik.setFieldValue("country", state.master_state.country_id),
            formik.setFieldValue("state", state.state_id),  
            formik.setFieldValue("city", state.city_name)
            );
          }
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
              sx={{ m: 1, minWidth: 120 }}
              error={formik.errors.country && formik.touched.country}
              >
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                label="country"
                inputProps={{ 'aria-label': 'Without label' }}
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                displayEmpty
                variant="standard"
                
                >
                <MenuItem value="" >Please Select Country</MenuItem>
                {countryList &&
                  countryList.map((option, i) => (
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
          <br />
          <div>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <FormControl
              fullWidth
              error={formik.errors.state && formik.touched.state}
              >
              <Select
                
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                label="state"
                name="state"
                displayEmpty
                value={formik.values.state}
                onChange={formik.handleChange}
                variant="standard"
                
                >
                <MenuItem  value="" >Please Select State</MenuItem>
                {stateList &&
                  stateList.map((option, i) => (
                    <MenuItem key={i} value={option.state_id}>
                      {option.state_name}
                    </MenuItem>
                  ))}
              </Select>
              {formik.errors.state && formik.touched.state ? (
                <FormHelperText>{formik.errors.state}</FormHelperText>
                ) : null}
            </FormControl>
          </div>
          <br />
          <br />
          <div>
            <FormControl fullWidth>
              <TextField
            
            id="outlined-error-helper-text"
            label="city"
            name="city"variant="standard"
            error={formik.errors.city && formik.touched.city}
            helperText={
              formik.errors.city && formik.touched.city
              ? formik.errors.city
              : null
            }
            value={formik.values.city}
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

export default City_Form;

