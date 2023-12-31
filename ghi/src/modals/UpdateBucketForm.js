import React, { useState } from "react";
import { useGetTokenQuery } from "../app/api";
import Notification from "../Notification";

function UpdateBucketForm() {
	const [title, setTitle] = useState("");
	const [coverPhoto, setCoverPhoto] = useState("");
	const [details, setDetails] = useState("");

	const handleTitleChange = (event) => {
		const value = event.target.value;
		setTitle(value);
	};

	const handleCoverPhotoChange = (event) => {
		const value = event.target.value;
		setCoverPhoto(value);
	};
	const handleDetailsChange = (event) => {
		const value = event.target.value;
		setDetails(value);
	};

	let accountId = null;

	const { data: tokenData } = useGetTokenQuery();

	if (!tokenData) {
		return (
			<div classNameNameName="container">
				<Notification type="info"> Please Login</Notification>
			</div>
		);
	} else {
		accountId = tokenData.account.id;
	}


	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.title = title;
		data.cover_photo = coverPhoto;
		data.details = details;
		data.account_id = accountId;


		const bucketUrl = "http://localhost:8000/api/buckets";
		const fetchConfig = {
			method: "put",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		};
		const response = await fetch(bucketUrl, fetchConfig);
		if (response.ok) {


			updateTitle("");
			updateDetails("");
			updateCoverPhoto("");
		}
	};
	return (
		<>
			<div className="create-bucket">
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label className="label">Bucket Title</label>
						<div className="control">
							<input
								required
								onChange={handleTitleChange}
								value={title}
								name="title"
								className="input"
								type="text"
								placeholder="Your Bucket Title"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Cover Photo</label>
						<div className="control">
							<input
								required
								onChange={handleCoverPhotoChange}
								value={coverPhoto}
								name="coverPhoto"
								className="input"
								type="text"
								placeholder="Bucket Cover Photo"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Details</label>
						<div className="control">
							<input
								required
								onChange={handleDetailsChange}
								value={details}
								name="details"
								className="input"
								type="text"
								placeholder="Your details"
							/>
						</div>
					</div>
					<div className="field is-grouped">
						<div className="control">
							<button className="button is-primary">Submit</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default UpdateBucketForm;
