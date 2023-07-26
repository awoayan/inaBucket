import CreateDropForm from "./CreateDropForm";

export default function CreateDropModalContent({ onClose }) {
	return (
		<div class="modal2">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Create a Drop</p>
					<div></div>
					<button
						onClick={onClose}
						class="delete"
						aria-label="close"></button>
				</header>
				<section class="modal-card-body">
					<CreateDropForm />
				</section>

				<footer class="modal-card-foot">
					{/* <button class="button is-success">Save changes</button> */}
				</footer>
			</div>
		</div>
	);
}
