import React from "react";
import CreateBucketForm from "./CreateBucketForm";
import '../style/other-modal.css'

export default function CreateBucketModalContent({ onClose }) {
	return (
		<div className="modal2">

			<div className="modal-content">
				<header className="modal-card-head">
					<p className="modal-card-title">Create a Bucket</p>
					<div></div>
					<button
						onClick={onClose}
						className="delete"
						aria-label="close"></button>
				</header>
				<section className="modal-card-body">
					<CreateBucketForm />
				</section>
				<footer className="modal-card-foot">
				</footer>
			</div>
		</div>
	);
}
