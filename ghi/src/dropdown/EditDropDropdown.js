import React, { useState } from "react";
import UpdateDropModal from "../modals/UpdateDropModal"
import DeleteDrop from "./DeleteDrop"
import { useParams } from 'react-router-dom';

function EditDropDropdown({ onEdit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const { dropId } = useParams();



    const handleEdit = () => {
        setIsOpen(false);
        onEdit();
    };

    const handleDelete = () => {
        setIsOpen(false);
        onDelete();
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}>
                <span>Update</span>

            </button>


            {isOpen && (
                <div className="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <button className="dropdown-item" onClick={handleEdit}>
                            Edit
                        </button>
                        <button className="dropdown-item" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
            {isOpen && <UpdateDropModal dropId={dropId} />}
            {isOpen && <DeleteDrop dropId={dropId} />}
        </>
    );
}

export default EditDropDropdown;