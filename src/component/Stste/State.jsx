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
  fetchCountryData,
  setCountry,
} from "../../features/country/countrySlice";
import {
  deleteStateData,
  fetchStateData,
  setState,
} from "../../features/country/stateSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const State = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateList = useSelector((state) => state.state.value);
  const isLoading = useSelector((state) => state.state.isLoading);

  useEffect(() => {
    fetchstate();
    fetchCountry();
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
  const handleDelete = async (id) => {
    dispatch(deleteStateData(id)).then(() => fetchstate());
  };
  const handleEdit = (row) => {
    navigate(`/state_form/${row.state_id}`);
  };
  return (
    <>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <Button variant="outlined" sx={{ margin:2,marginLeft:175}} onClick={() => navigate("/state_form")}>add</Button>
        <TableContainer>
          <Table
            sx={{marginLeft:16 ,width:1350 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>state_Id</TableCell>
                <TableCell align="right">Country_Name</TableCell>
                <TableCell align="right">State_Name</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stateList && stateList.length > 0
                ? stateList.map((row, i) => {
                    return (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.state_id}
                        </TableCell>
                        <TableCell align="right">
                          {row.master_country.country_name}
                        </TableCell>
                        <TableCell align="right">{row.state_name}</TableCell>
                        <TableCell align="right">
                          <Button
                           startIcon={<EditIcon />} onClick={() => handleEdit(row)}>Edit</Button>
                          <Button
                          startIcon={<DeleteIcon/>}
                            onClick={() => {
                              handleDelete(row.state_id);
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
      </div>
    </>
  );
};

export default State;
