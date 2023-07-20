import { NavLink } from "react-router-dom";
import { createPortal } from "react-dom";

import { useGetTokenQuery, useLogOutMutation } from "./app/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal, LOG_IN_MODAL, SIGN_UP_MODAL } from "./app/accountSlice";
import homeLogo from "./homeLogo.svg";
import LogInModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useEffect, useState } from "react";
import SearchPage from "./Searchbar";
import CreateBucketModal from "./Modal";
import CreateDropModal from "./CreateDropModal";

function LoginButtons(props) {
	const dispatch = useDispatch();
	const classNames = `buttons ${props.show ? "" : "is-hidden"}`;

	return (
		<div className={classNames}>
			<button
				onClick={() => dispatch(showModal(SIGN_UP_MODAL))}
				className="button is-primary">
				<strong>Sign up</strong>
			</button>
			<button
				onClick={() => dispatch(showModal(LOG_IN_MODAL))}
				className="button is-light">
				Log in
			</button>
		</div>
	);
}

function LogoutButton() {
	const navigate = useNavigate();
	const [logOut, { data }] = useLogOutMutation();

	useEffect(() => {
		if (data) {
			navigate("/");
		}
	}, [data, navigate]);

	return (
		<div className="buttons">
			<button
				onClick={logOut}
				className="button is-light">
				Log out
			</button>
		</div>
	);
}

function Nav() {
	const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

	return (
		<>
			<nav
				className="navbar is-link is-fixed-top"
				role="navigation"
				aria-label="main navigation">
				<div className="navbar-brand">
					<NavLink
						className="navbar-item"
						to="/">
						<img
							src={homeLogo}
							height="86"
							width="43"
							alt=""
						/>
					</NavLink>
					<div>
						<SearchPage />
					</div>
					<button
						className="navbar-burger"
						aria-label="menu"
						aria-expanded="false"
						data-target="navbarBasicExample">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</button>
				</div>
				<div
					id="navbarBasicExample"
					className="navbar-menu">
					<div className="navbar-end">
						<div className="navbar-item">
							{tokenLoading ? (
								<LoginButtons show={false} />
							) : token ? (
								<LogoutButton />
							) : (
								<LoginButtons show={true} />
							)}
						</div>
						<div className="button is-primary">
							<CreateBucketModal />
						</div>
						<div className="button is-primary">
							<CreateDropModal />
						</div>
					</div>
				</div>
			</nav>

			<LogInModal />
			<SignUpModal />
		</>
	);
}

export default Nav;
