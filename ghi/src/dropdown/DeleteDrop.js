import React from 'react'
import { useNavigate } from 'react-router-dom'

function DeleteDrop({ dropId }) {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/drops/${dropId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Drop deleted successfully!');
                navigate('/profile');
            } else {
                console.error('Failed to delete drop');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <button className='like' onClick={handleDelete}> Delete


            </button>

        </>

    )
}
export default DeleteDrop;

