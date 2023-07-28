import { useState } from "react";
import { createPortal } from "react-dom";
import UpdateBucketModalContent from "./UpdateBucketModalContent.js";

export default function CreateBucketModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={() => setShowModal(true)}>Update Bucket</button>
            {showModal &&
                createPortal(
                    <UpdateBucketModalContent onClose={() => setShowModal(false)} />,
                    document.body
                )}
        </>
    );
}

