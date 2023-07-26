import UpdateDropForm from "./UpdateDropForm";

export default function UpdateDropModalContent({ onClose }) {
    return (
        <div className="modal2">
            <div className="modal-background"></div>
            <div className="modal-card">
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
                    {/* <button class="button is-success">Save changes</button> */}
                </footer>
            </div>
        </div>
    );
}