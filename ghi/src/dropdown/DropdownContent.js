import React from "react";
import { useState } from "react";
import CreateBucketModal from "../modals/CreateBucketModal";
import CreateDropModal from "../modals/CreateDropModal";
import '../style/dropdown.css'

function Dropdown({ userBuckets }) {
	const [isOpen, setIsOpen] = useState(false);

	return (

		<div className="navbar-item dropdown">
			<div className="dropdown-trigger">
				<button
					onClick={() => setIsOpen(!isOpen)}>
					<span>Create</span>
					<span className="icon is-small">

					</span>
				</button>
				{isOpen && (
					<div className="dropdown">
						<button className="dropbtn">Create

						</button>
						<div className="dropdown-content">


						</div>


					</div>
				)}
			</div>
		</div>

	);
}

export default Dropdown;


// <div className="button is-primary">
// 	<CreateDropModal />
// </div>

// <div className="button is-primary">
// 									<CreateBucketModal />
// 								</div>