import React from "react";
import { useState } from "react";
import CreateBucketModal from "./CreateBucketModal";
import CreateDropModal from "./CreateDropModal";

function Dropdown() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="navbar-item dropdown">
			<div className="dropdown-trigger">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="button"
					aria-haspopup="true"
					aria-controls="dropdown-menu3">
					<span>Create</span>
					<span className="icon is-small">
						<i
							className="fas fa-angle-down"
							aria-hidden="true"
						/>
					</span>
				</button>
				{isOpen && (
					<div
						className="dropdown-menu2"
						id="dropdown-menu32"
						role="menu2">
						<div className="dropdown-content">
							<li className="dropdown-item">
								<div className="button is-primary">
									<CreateDropModal />
								</div>
							</li>
							<li className="dropdown-item">
								<div className="button is-primary">
									<CreateBucketModal />
								</div>
							</li>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Dropdown;
