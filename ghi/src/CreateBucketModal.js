// import { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useAddBucketMutation, useGetTokenQuery } from "./app/api";
// import { preventDefault } from "./app/utils";
// import { clearForm, showModal, updateField, CREATE_BUCKET_MODAL } from "./app/bucketSlice"
// import Notification from "./Notification";

// function CreateBucketModal(){
//     const dispatch = useDispatch()
//     const { show, title, coverPhoto, details, accountID } = useSelector(
//         (state) => state.bucket
//     );

//     const modalClass = `modal ${show === CREATE_BUCKET_MODAL ? "is-active" : ""}`;
//     const [createBucket, { error, isLoading: createBucketLoading}] = useAddBucketMutation();
//     const field = useCallback(
//         (e) =>
//         dispatch(updateField({ field: e.target.name, value: e.target.value})),
//         [dispatch]
//     )
//     let theAccountId = null
//     const { data: tokenData } = useGetTokenQuery()
//     if (tokenData) {
//         theAccountId = tokenData.account.id;
//     }

//     return(
//         <>
//         <div

//             className={modalClass}
// 			key="signup-modal">
// 			<div className="modal-background"></div>
// 			<div className="modal-content">
// 				<div className="box content">
// 					<h3>Create a Bucket</h3>
// 					{error ? (
// 						<Notification type="danger">{error.data.detail}</Notification>
// 					) : null}
// 					<form
// 						method="POST"
// 						onSubmit={preventDefault(createBucket, () => ({
// 							title,
//                             coverPhoto,
//                             details,
//                             accountID: theAccountId
// 						}))}>
// 						<div className="field">
// 							<label className="label">Bucket Title</label>
// 							<div className="control">
// 								<input
// 									required
// 									onChange={field}
// 									value={title}
// 									name="title"
// 									className="input"
// 									type="text"
// 									placeholder="Bucket Title"
// 								/>
// 							</div>
// 						</div>
// 						<div className="field">
// 							<label className="label">Cover Photo</label>
// 							<div className="control">
// 								<input
// 									required
// 									onChange={field}
// 									value={coverPhoto}
// 									name="coverPhoto"
// 									className="input"
// 									type="text"
// 									placeholder="Your Bucket Cover Photo"
// 								/>
// 							</div>
// 						</div>
// 						<div className="field">
// 							<label className="label">Details</label>
// 							<div className="control">
// 								<input
// 									required
// 									onChange={field}
// 									value={details}
// 									name="details"
// 									className="input"
// 									type="text"
// 									placeholder="Details About Your Bucket"
// 								/>
// 							</div>
// 						</div>
// 						<div className="field is-grouped">
// 							<div className="control">
// 								<button
// 									disabled={Loading}
// 									className="button is-primary">
// 									Submit
// 								</button>
// 							</div>
// 							<div className="control">
// 								<button
// 									type="button"
// 									onClick={() => dispatch(showModal(null))}
// 									className="button">
// 									Cancel
// 								</button>
// 							</div>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>

//         </>
//     )

// }

// export default CreateBucketModal;
