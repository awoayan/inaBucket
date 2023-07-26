import React, { useState } from "react";
import UpdateDropModal from "./UpdateDropModal"
import DeleteDrop from "./DeleteDrop"

function EditDropDropdown({ onEdit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);



    const handleEdit = () => {
        setIsOpen(false);
        onEdit();
    };

    const handleDelete = () => {
        setIsOpen(false);
        onDelete();
    };

    return (
        <div className="dropdown">
            <button
                onClick={() => setIsOpen(!isOpen)} 
                className="button is-danger"
                aria-haspopup="true"
                aria-controls="dropdown-menu3">
                <span>Edit</span>
                <span classname="icon is-small"> 
                    <i 
                        className="fas fa-angle-down"
                        area-hidden="true"
                    />
                </span>
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
            {isOpen && <UpdateDropModal />}
            {isOpen && <DeleteDrop />}
        </div>
    );
}

export default EditDropDropdown;