import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogOutMutation } from "./app/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal, LOG_IN_MODAL, SIGN_UP_MODAL } from "./app/accountSlice";
import homeLogo from "./homeLogo.svg";
import LogInModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useEffect, useState } from "react";
import SearchPage from "./Searchbar";
import { Link } from "react-router-dom";


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

function DisplayAvatar() {
	const { data: tokenData } = useGetTokenQuery();

	if (tokenData) {
		let avatar = tokenData.avatar;
		console.log("avatar", avatar);

		if (avatar === undefined) {
			return (
				<figure className="image is-64x64">
					<img
						className="is-rounded"
						src="https://bulma.io/images/placeholders/128x128.png"
					/>
				</figure>
			);
		} else {
			return (
				<figure className="image is-64x64">
					<img
						className="is-rounded"
						src={avatar}
					/>
				</figure>
			);
		}
	}
}

function Nav() {
	const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

	// let avatar =

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
				<div>


					<Link to={"/profile"}>
						<DisplayAvatar />
					</Link>

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
					</div>
				</div>


			</nav>

			<LogInModal />
			<SignUpModal />
		</>
	);
}

export default Nav;
