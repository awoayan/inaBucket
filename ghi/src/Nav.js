import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogOutMutation } from "./app/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal, LOG_IN_MODAL, SIGN_UP_MODAL } from "./app/accountSlice";
import LogInModal from "./login_signup/LoginModal";
import SignUpModal from "./login_signup/SignUpModal";
import { useEffect } from "react";
import SearchPage from "./Searchbar";
import './App.css'
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import { mdiWaterCircle } from '@mdi/js';



function LoginButtons(props) {
	const dispatch = useDispatch();
	const classNames = `buttons ${props.show ? "" : "is-hidden"}`;

	return (
		<div className={classNames}>
			<button
				onClick={() => dispatch(showModal(SIGN_UP_MODAL))}
				className="button is-info">
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
				className="button is-info">
				Log out
			</button>
		</div>
	);
}

function DisplayAvatar() {
	const { data: tokenData } = useGetTokenQuery();

	if (tokenData) {
		let avatar = tokenData.avatar;


		if (avatar === undefined) {
			return (
				<figure className="image is-64x64 mt-4 ml-5">
					<Icon path={mdiAccountCircle} title="Profile" size={2} color="hsl(207, 61%, 51%)" />
				</figure>
			);
		} else {
			return (
				<figure className="image is-64x64">
					<img className="is-rounded" src={avatar} alt="avatar, ya'll"/>
				</figure>
			);
		}
	}
}

function Nav() {
	const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

	return (
		<>
			<nav 
				className="navbar is-fixed-top has-background-link-dark" 
				role="navigation" 
				aria-label="main navigation">
				<div className="navbar-brand">
					<NavLink
						className="navbar-item"
						to="/">
						<figure className="image is-64x64 mt-2">
							<Icon path={mdiWaterCircle} title="Home" size={2} color="hsl(207, 61%, 51%)" />
						</figure>
					</NavLink>
					<div>
						<SearchPage />
					</div>
					<div>
						<NavLink to={"/profile"}>
							<DisplayAvatar />
						</NavLink>
					</div>
				</div>
				<div id="navbarBasicExample" className="navbar-menu "> 
					<div className="navbar-end">
						<div className="navbar-item ">
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
