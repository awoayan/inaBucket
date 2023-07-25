
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function DeleteDrops({dropId}) {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/drops/${dropId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Drop deleted successfully!');
                navigate("/profile");
            } else {
                console.error('Failed to delete drop');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button className="button is-primary" onClick={handleDelete}>DELETE</button>
        </div>
                
    )
}


export default DeleteDrops;

