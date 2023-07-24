import UpdateBucketForm from "./UpdateBucketForm";

export default function UpdateBucketModalContent({ onClose }) {
    return (
        <div class="modal2">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Update a Bucket</p>
                    <div></div>
                    <button
                        onClick={onClose}
                        class="delete"
                        aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <UpdateBucketForm />
                </section>

                <footer class="modal-card-foot">
                    {/* <button class="button is-success">Save changes</button> */}
                </footer>
            </div>
        </div>
    );
}
