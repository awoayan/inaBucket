import { useState } from "react";
import { createPortal } from "react-dom";
import CreateBucketModalContent from "./ModalContent.js";

export default function CreateBucketModal() {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button onClick={() => setShowModal(true)}>
				Show modal using a portal
			</button>
			{showModal &&
				createPortal(
					<CreateBucketModalContent onClose={() => setShowModal(false)} />,
					document.body
				)}
		</>
	);
}
