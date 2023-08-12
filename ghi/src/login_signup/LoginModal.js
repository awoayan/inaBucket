import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "../app/api";
import { eventTargetSelector as target, preventDefault } from "../app/utils";
import { showModal, updateField, LOG_IN_MODAL } from "../app/accountSlice";
import "../style/login-modal.css"

function LogInModal() {
	const dispatch = useDispatch();
	const { show, username, password } = useSelector((state) => state.account);
	const modalClass = `modal ${show === LOG_IN_MODAL ? "is-active" : ""}`;
	const [logIn, { error, isLoading: logInLoading }] = useLogInMutation();
	const field = useCallback(
		(e) =>
			dispatch(updateField({ field: e.target.name, value: e.target.value })),
		[dispatch]
	);

	return (
		<div
			className={modalClass} key="modal">
			<div className="modal-content">
				<div className="modal-form">
					<h3>Log In</h3>
					{error ? (
						<div classname="error-notification">{error.data.detail}</div>
					) : null}
					<form method="POST" onSubmit={preventDefault(logIn, target)}>
						<div className="form-field">
							<label className="form-label" htmlFor="email">Email</label>
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
						<div className="form-field">
							<label className="form-label">Password</label>
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
						<div className="form-buttons">
							<div className="control">
								<button disabled={logInLoading} className="submit-button">Submit</button>
							</div>
							<div className="control">
								<button
									type="button"
									onClick={() => dispatch(showModal(null))}
									className="cancel-button">
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

export default LogInModal;
