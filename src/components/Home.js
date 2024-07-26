import React, { useEffect, useState } from 'react';
import { getAllEmployees, deleteEmployee, getEmployeeById } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    TextField,
    Button,
    IconButton,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Pagination,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        paginateEmployees();
    }, [employees, currentPage]);

    const fetchEmployees = async () => {
        try {
            const response = await getAllEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]);
        }
    };

    const paginateEmployees = () => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = startIndex + entriesPerPage;
        setFilteredEmployees(employees.slice(startIndex, endIndex));
    };

    const handleSearch = async () => {
        if (searchId) {
            try {
                const response = await getEmployeeById(searchId);
                setEmployees([response.data]);
                setCurrentPage(1);
            } catch (error) {
                console.error('Error searching employee:', error);
                setEmployees([]);
                setCurrentPage(1);
            }
        } else {
            fetchEmployees(); // Fetch all employees if search is cleared
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleOpenDialog = (employee) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedEmployee(null);
    };

    const handleConfirmDelete = () => {
        handleDelete(selectedEmployee.id);
        handleCloseDialog();
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Container>
             <Box display="flex" justifyContent="center">
                <Typography variant="h3" component="h1" gutterBottom>
                    Employee Management
                </Typography>
            </Box>
            <Grid container spacing={2} alignItems="center" marginBottom={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Search by ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
                        Search
                    </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/add')}>
                        Add Employee
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>District</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.id}</TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.mobile}</TableCell>
                                    <TableCell>{employee.country}</TableCell>
                                    <TableCell>{employee.state}</TableCell>
                                    <TableCell>{employee.district}</TableCell>
                                    <TableCell>
                                        <Box display="flex" justifyContent="space-between">
                                            <IconButton color="primary" onClick={() => navigate(`/details/${employee.id}`)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton color="primary" onClick={() => navigate(`/edit/${employee.id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => handleOpenDialog(employee)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">No employees found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(employees.length / entriesPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete {selectedEmployee?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Home;
