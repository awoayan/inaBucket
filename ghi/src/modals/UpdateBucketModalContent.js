import UpdateBucketForm from "./UpdateBucketForm";
import '../style/other-modal.css'

export default function UpdateBucketModalContent({ onClose }) {
    return (
        <div className="modal2">

            <div className="modal-content">
                <header className="modal-card-head">
                    <p className="modal-card-title">Update a Bucket</p>
                    <div></div>
                    <button
                        onClick={onClose}
                        class="delete"
                        aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <UpdateBucketForm />
                </section>
                <footer className="modal-card-foot">
                </footer>
            </div>
        </div>
    );
}
