import UpdateDropForm from "./UpdateDropForm";
import '../style/other-modal.css'

export default function UpdateDropModalContent({ onClose }) {
    return (
        <div className="modal2">

            <div className="modal-content">
                <header className="modal-card-head">
                    <p className="modal-card-title">Update Your Drop</p>
                    <div></div>
                    <button
                        onClick={onClose}
                        className="delete"
                        aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <UpdateDropForm />
                </section>

                <footer className="modal-card-foot">
                </footer>
            </div>
        </div>
    );
}