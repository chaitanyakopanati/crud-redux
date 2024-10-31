import {
  Backdrop,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCountryData,
  fetchCountryData,
  postCountryData,
  setCountry,
} from "../../features/country/countrySlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getCountry } from "../Apis";

const Country = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.country.value);
  const isLoading = useSelector((state) => state.country.isLoading);
  useEffect(() => {
    fetchCountry();
  }, []);
  const fetchCountry = async () => {
    dispatch(fetchCountryData()).then((res) => {
      dispatch(setCountry(res.payload));
    });
  };

  const handleDelete = async (id) => {
    dispatch(deleteCountryData(id)).then(() => fetchCountry());
  };
  const handleEdit = (id) => {
    navigate(`/country_form/${id}`);
  };
  return (
    <>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Button variant="outlined" sx={{ margin:2,marginLeft:175}}  onClick={() => navigate("/country_form")}>add</Button>
      <TableContainer>
        <Table
         sx={{marginLeft:16 ,width:1350 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Country_Id</TableCell>
              <TableCell align="right">Country_Name</TableCell>
              <TableCell align="right">currency_Name</TableCell>
              <TableCell align="right">currency_code</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryList && countryList.length > 0
              ? countryList.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.country_id}
                    </TableCell>
                    <TableCell align="right">{row.country_name}</TableCell>
                    <TableCell align="right">{row.currency_name}</TableCell>
                    <TableCell align="right">{row.currency_code}</TableCell>
                    <TableCell align="right">
                      <Button
                       startIcon={<EditIcon />} onClick={() => handleEdit(row.country_id)}>
                        Edit
                      </Button>
                      <Button
                      startIcon={<DeleteIcon/>}
                        onClick={() => {
                          handleDelete(row.country_id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Country;
