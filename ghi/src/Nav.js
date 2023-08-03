import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogOutMutation } from "./app/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal, LOG_IN_MODAL, SIGN_UP_MODAL } from "./app/accountSlice";
import LogInModal from "./login_signup/LoginModal";
import SignUpModal from "./login_signup/SignUpModal";
import { useEffect } from "react";
import SearchPage from "./Searchbar";
import './style/nav.css'
import Icon from '@mdi/react';
import { mdiWaterCircle } from '@mdi/js';
import UseDisplayAvatar from "./Avatar";




function LoginButtons(props) {
	const dispatch = useDispatch();
	const classNames = `buttons ${props.show ? "" : "is-hidden"}`;

	return (
		<div className={classNames}>
			<button
				onClick={() => dispatch(showModal(SIGN_UP_MODAL))}
				className="button">
				<strong>Sign up</strong>
			</button>
			<button
				onClick={() => dispatch(showModal(LOG_IN_MODAL))}
				className="button">
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


function Nav() {
	const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

	return (
		<>
			<nav 
				className="navbar" 
				role="navigation" 
				aria-label="main navigation">
				<div className="navbar-container">
					<NavLink
						className=""
						to="/">
						<figure className="">
							<Icon path={mdiWaterCircle} title="Home" size={2} color="hsl(207, 61%, 51%)" />
						</figure>
					</NavLink>
					<div>
						<SearchPage />
					</div>
					<div>
					<NavLink to={"/profile"}>
						<UseDisplayAvatar size={2} />
					</NavLink>
					</div>
				</div>
				<div id="navbarBasicExample" className="navbar-container"> 
					<div className="">
						<div className="navbar_link">
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
