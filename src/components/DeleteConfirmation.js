import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../services/api';

const DeleteConfirmation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            await deleteEmployee(id);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <p>Are you sure you want to delete this employee?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() =>navigate("/")}>No</button>
        </div>
    );
};

export default DeleteConfirmation;
