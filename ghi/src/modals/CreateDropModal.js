import { useState } from "react";
import { createPortal } from "react-dom";
import CreateDropModalContent from "./CreateDropModalContent.js";

export default function CreateDropModal() {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className="button is-primary">
				Create a Drop
			</button>
			{showModal &&
				createPortal(
					<CreateDropModalContent onClose={() => setShowModal(false)} />,
					document.getElementById("render-modal-here")
				)}
		</>
	);
}
