import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "../app/api";
import { preventDefault } from "../app/utils";
import { showModal, updateField, SIGN_UP_MODAL } from "../app/accountSlice";
import Notification from "./Notification";

function SignUpModal() {
	const dispatch = useDispatch();
	const { show, username, password, full_name, e_username } = useSelector(
		(state) => state.account
	);
	const modalClass = `modal ${show === SIGN_UP_MODAL ? "is-active" : ""}`;
	const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
	const errorMessage = error && error.data && error.data.detail;
	const field = useCallback(
		(e) =>
			dispatch(updateField({ field: e.target.name, value: e.target.value })),
		[dispatch]
	);

	return (
		<div
			className={modalClass}
			key="signup-modal">
			<div className="modal-background"></div>
			<div className="modal-content">
				<div className="box content">
					<h3>Sign Up</h3>
					{error ? (
						<Notification type="danger">{errorMessage}</Notification>
					) : null}
					<form
						method="POST"
						onSubmit={preventDefault(signUp, () => ({
							email: username,
							password,
							full_name,
							username: e_username,
						}))}>
						<div className="field">
							<label
								className="label"
								htmlFor="email">
								Email
							</label>
							<div className="control">
								<input
									required
									onChange={field}
									value={username}
									name="username"
									className="input"
									type="email"
									placeholder="you@example.com"
								/>
							</div>
						</div>
						<div className="field">
							<label className="label">Password</label>
							<div className="control">
								<input
									required
									onChange={field}
									value={password}
									name="password"
									className="input"
									type="password"
									placeholder="secret..."
								/>
							</div>
						</div>
						<div className="field">
							<label className="label">First and last names</label>
							<div className="control">
								<input
									required
									onChange={field}
									value={full_name}
									name="full_name"
									className="input"
									type="text"
									placeholder="Your Name"
								/>
							</div>
						</div>
						<div className="field">
							<label className="label">Username</label>
							<div className="control">
								<input
									required
									onChange={field}
									value={e_username}
									name="e_username"
									className="input"
									type="text"
									placeholder="Your Username"
								/>
							</div>
						</div>
						<div className="field is-grouped">
							<div className="control">
								<button
									disabled={signUpLoading}
									className="button is-primary">
									Submit
								</button>
							</div>
							<div className="control">
								<button
									type="button"
									onClick={() => dispatch(showModal(null))}
									className="button">
									Cancel
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUpModal;
