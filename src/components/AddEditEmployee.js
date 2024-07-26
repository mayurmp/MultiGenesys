import React, { useEffect, useState } from 'react';
import { getEmployeeById, createEmployee, editEmployee, getCountries } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, Container, Typography, Paper, Box } from '@mui/material';

const AddEditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({ name: '', email: '', mobile: '', country: '', state: '', district: '' });
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetchCountries();
        if (id) {
            fetchEmployee(id);
        }
    }, [id]);

    const fetchCountries = async () => {
        try {
            const response = await getCountries();
            console.log('Countries API response:', response.data); // Log the response to check if data is correct
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchEmployee = async (id) => {
        try {
            const response = await getEmployeeById(id);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (id) {
                await editEmployee(id, employee);
            } else {
                await createEmployee(employee);
            }
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: 16 }}>
                <Box display="flex" justifyContent="center" marginBottom={2}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {id ? 'Edit Employee' : 'Add Employee'}
                    </Typography>
                </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={employee.email}
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mobile"
                            value={employee.mobile}
                            onChange={(e) => setEmployee({ ...employee, mobile: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Country</InputLabel>
                            <Select
                                value={employee.country}
                                onChange={(e) => setEmployee({ ...employee, country: e.target.value })}
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country.code} value={country.country}>{country.country}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="State"
                            value={employee.state}
                            onChange={(e) => setEmployee({ ...employee, state: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="District"
                            value={employee.district}
                            onChange={(e) => setEmployee({ ...employee, district: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>
        </Container>
    );
};

export default AddEditEmployee;
