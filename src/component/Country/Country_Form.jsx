import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Input,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import {
  fetchCountryData,
  postCountryData,
  addCountry,
  setCountry,
  updateCountryData,
  putCountry,
} from "../../features/country/countrySlice";
import { getCountryById, updateCountry } from "../Apis";

const Country_Form = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoadingOnButton, setIsLoadingOnButton] = useState(false);
  const countryList = useSelector((state) => state.country.value);

  const fetchCountry = async () => {
    dispatch(fetchCountryData()).then((res) => {
      dispatch(setCountry(res.payload));
    });
  };
  const SignUpSchema = Yup.object({
    country: Yup.string().min(3).max(15).required("*Country name required*"),
    currency_code: Yup.string().max(15).required("*Currency Code required*"),
    currency_name: Yup.string().max(15).required("*Currency Name required*"),
  });
  const initialValues = {
    country: "",
    currency_name:"",currency_code:""
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values, action) => {
      setIsLoadingOnButton(true);
      const res = params.id
        ? dispatch(
            updateCountryData({ country: values.country,currency_name:values.currency_name,currency_code:values.currency_code, id: params.id })
          ).then(() => fetchCountry())
        : dispatch(postCountryData({ country: values.country,currency_name:values.currency_name,currency_code:values.currency_code})).then(() => fetchCountry());

      res
        .then(() => setIsLoadingOnButton(false))
        .then(() => navigate("/country"));
    },
  });
  const fetchCountryById = async () => {
    const res = await getCountryById(params.id);

    return res;
  };
  useEffect(() => {
    const data = async () => {
      const country =
        countryList.length > 0
          ? countryList.find((el) => el.country_id == params.id)
          : await fetchCountryById();
      if (params.id) {
        formik.setFieldValue("country", country.country_name);
        formik.setFieldValue("currency_name", country.currency_name);
        formik.setFieldValue("currency_code", country.currency_code);
      }
    };
    data();
  }, [params.id]);
  console.log(isLoadingOnButton);
  return (
    <>
      <body>
        <form onSubmit={formik.handleSubmit}>
          <div>
          <FormControl fullWidth>
            <TextField
                id="outlined-error-helper-text"
                label="Country"variant="standard"
                name="country"
                error={formik.errors.country && formik.touched.country}
                helperText={
                  formik.errors.country && formik.touched.country
                    ? formik.errors.country
                    : null
                }
                value={formik.values.country}
                onChange={formik.handleChange}
              />
            </FormControl>
            <br />

            <br /> <FormControl fullWidth>
            <TextField
                id="outlined-error-helper-text"
                label="Currency Name"variant="standard"
                name="currency_name"
                error={formik.errors.currency_name && formik.touched.currency_name}
                helperText={
                  formik.errors.currency_name && formik.touched.currency_name
                    ? formik.errors.currency_name
                    : null
                }
                value={formik.values.currency_name}
                onChange={formik.handleChange}
              />
            </FormControl>
            <br />

            <br /> <FormControl fullWidth>
            <TextField
                id="outlined-error-helper-text"
                label="Currency Code"variant="standard"
                name="currency_code"
                error={formik.errors.currency_code && formik.touched.currency_code}
                helperText={
                  formik.errors.currency_code && formik.touched.currency_code
                    ? formik.errors.currency_code
                    : null
                }
                value={formik.values.currency_code}
                onChange={formik.handleChange}
              />
            </FormControl>
            <br />

            <br />
            <div>
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
          </div>
        </form>
      </body>
    </>
  );
};

export default Country_Form;
