import { useState } from "react";
import { createPortal } from "react-dom";
import UpdateDropModalContent from "./UpdateDropModalContent.js";
import '../style/card.css'

export default function UpdateDropModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className="modal-button" onClick={() => setShowModal(true)}>Update</button>
            {showModal &&
                createPortal(
                    <UpdateDropModalContent onClose={() => setShowModal(false)} />,
                    document.body
                )}
        </>
    );
}