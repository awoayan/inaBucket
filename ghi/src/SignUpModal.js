import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "./app/api";
import { preventDefault } from "./app/utils";
import { showModal, updateField, SIGN_UP_MODAL } from "./app/accountSlice";
import Notification from "./Notification";

function SignUpModal() {
	// const dispatch = useDispatch();
	// const { show, password, e_username, full_name, explorer } = useSelector(
	// 	(state) => state.account
	// );

	const [full_name, setFullName] = useState("");
	const [e_username, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [explorer, setExplorer] = useState("");

	const handleFullNameChange = (event) => {
		const value = event.target.value;
		setFullName(value);
	};

	const handleEmailChange = (event) => {
		const value = event.target.value;
		setEmail(value);
	};

	const handlePasswordChange = (event) => {
		const value = event.target.value;
		setPassword(value);
	};

	const handleExplorerChange = (event) => {
		const value = event.target.value;
		setExplorer(value);
	};

	const data = {};
	data.full_name = full_name;
	data.email = e_username;
	data.password = password;
	data.username = explorer;

	const modalClass = `modal ${show === SIGN_UP_MODAL ? "is-active" : ""}`;
	const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
	// const field = useCallback(
	// 	(e) =>
	// 		dispatch(updateField({ field: e.target.name, value: e.target.value })),
	// 	[dispatch]
	// );

	setFullName("");
	setEmail("");
	setPassword("");
	setExplorer("");

	return (
		<div
			className={modalClass}
			key="signup-modal">
			<div className="modal-background"></div>
			<div className="modal-content">
				<div className="box content">
					<h3>Sign Up</h3>
					{error ? (
						<Notification type="danger">{error.data.detail}</Notification>
					) : null}
					<form
						method="POST"
						onSubmit={preventDefault(signUp, () => data)}>
						<div className="field">
							<label
								className="label"
								htmlFor="email">
								Email
							</label>
							<div className="control">
								<input
									required
									onChange={handleEmailChange}
									value={e_username}
									name="e_username"
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
									onChange={handlePasswordChange}
									value={password}
									name="password"
									className="input"
									type="password"
									placeholder="secret..."
								/>
							</div>
						</div>
						<div className="field">
							<label className="label">First and Last names</label>
							<div className="control">
								<input
									required
									onChange={handleFullNameChange}
									value={full_name}
									name="full_name"
									className="input"
									type="text"
									placeholder="Your Name"
								/>
							</div>
						</div>
						<div className="field">
							<label className="label">Explorer Username</label>
							<div className="control">
								<input
									required
									onChange={handleExplorerChange}
									value={explorer}
									name="explorer"
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
							{/* <div className="control">
								<button
									type="button"
									onClick={() => dispatch(showModal(null))}
									className="button">
									Cancel
								</button>
							</div> */}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUpModal;
