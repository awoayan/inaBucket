import { useState } from "react";
import { createPortal } from "react-dom";
import CreateBucketModalContent from "./CreateBucketModalContent.js";

export default function CreateBucketModal() {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className="button is-primary">
				Create a Bucket
			</button>
			{showModal &&
				createPortal(
					<CreateBucketModalContent onClose={() => setShowModal(false)} />,
					document.getElementById("render-modal-here")
				)}
		</>
	);
}
