import React, { useEffect, useState } from 'react';
import { getEmployeeById } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';

const EmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        fetchEmployee(id);
    }, [id]);

    const fetchEmployee = async (id) => {
        try {
            const response = await getEmployeeById(id);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    if (!employee) return <Typography>Loading...</Typography>;

    return (
        <Container sx={{ marginTop: 4 }}>
            <Paper style={{ padding: 16 }}>
                <Box textAlign="center" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        Employee Details
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Name: {employee.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Email: {employee.email}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Mobile: {employee.mobile}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Country: {employee.country}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">State: {employee.state}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">District: {employee.district}</Typography>
                    </Grid>
                </Grid>
                <Box textAlign="center" mt={2}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                        Back
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EmployeeDetails;
