import UpdateDropForm from "./UpdateDropForm";

export default function UpdateDropModalContent({ onClose }) {
    return (
        <div class="modal2">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Update a Drop</p>
                    <div></div>
                    <button
                        onClick={onClose}
                        class="delete"
                        aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <UpdateDropForm />
                </section>

                <footer class="modal-card-foot">
                    {/* <button class="button is-success">Save changes</button> */}
                </footer>
            </div>
        </div>
    );
}