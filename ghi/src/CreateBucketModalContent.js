import CreateBucketForm from "./CreateBucketForm";

export default function CreateBucketModalContent({ onClose }) {
	return (
		<div class="modal2">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Create a Bucket</p>
					<div></div>
					<button
						onClick={onClose}
						class="delete"
						aria-label="close"></button>
				</header>
				<section class="modal-card-body">
					<CreateBucketForm />
				</section>

				<footer class="modal-card-foot">
					{/* <button class="button is-success">Save changes</button> */}
				</footer>
			</div>
		</div>
	);
}
