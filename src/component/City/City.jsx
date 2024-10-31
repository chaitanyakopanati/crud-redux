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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCityData,
  fetchCityData,
  setCity,
} from "../../features/country/citySlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';

const City = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cityList = useSelector((state) => state.city.value);
  const isLoading = useSelector((state) => state.city.isLoading);

  useEffect(() => {
    fetchCity();
  }, []);
  const fetchCity = async () => {
    dispatch(fetchCityData()).then((res) => dispatch(setCity(res.payload)));
  };
  const handleEdit = (id) => navigate(`/city_form/${id}`);
  const handleDelete = async (id) => {
    dispatch(deleteCityData(id)).then(() => fetchCity());
  };

  return (
    <>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Button sx={{ margin:2,marginLeft:175}} variant="outlined" onClick={() => navigate("/city_form")}>add</Button>
      <TableContainer>
        <Table
           sx={{marginLeft:16 ,width:1350 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>city_Id</TableCell>
              <TableCell align="right">Country_Name</TableCell>
              <TableCell align="right">State_Name</TableCell>
              <TableCell align="right">City_Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cityList && cityList.length > 0
              ? cityList.map((row, i) => {
                  return (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.city_id}
                      </TableCell>
                      <TableCell align="right">
                        {row.master_state.master_country.country_name}
                      </TableCell>
                      <TableCell align="right">
                        {row.master_state.state_name}
                      </TableCell>
                      <TableCell align="right">{row.city_name}</TableCell>
                      <TableCell align="right">
                        <Button  startIcon={<EditIcon />} onClick={() => handleEdit(row.city_id)}>
                          Edit
                        </Button>
                        <Button startIcon={<DeleteIcon/>} 
                          onClick={() => {
                            handleDelete(row.city_id);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
  
    </>

  );
};

export default City
;
