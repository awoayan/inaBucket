import React, { useState, useEffect } from "react";
import { useGetTokenQuery } from "../app/api";
import Notification from "../login_signup/Notification";
import { useNavigate } from 'react-router-dom'


function CreateDropForm() {
	const [name, setName] = useState("");
	const [photo, setPhoto] = useState("");
	const [details, setDetails] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [url, setUrl] = useState("");
	const [buckets, setBuckets] = useState([]);
	const [bucket, setBucket] = useState("");

	const navigate = useNavigate();

	const { data: tokenData } = useGetTokenQuery();

	useEffect(() => {
		const fetchBuckets = async () => {
			try {
				const response = await fetch("http://localhost:8000/api/buckets")
				if (response.ok) {
					const data = await response.json();
					setBuckets(data);
				} else {
					console.error(response)
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchBuckets();
	}, []);

	let creator_id = null;

	if (!tokenData) {
		return (
			<div classNameNameName="container">
				<Notification type="info"> Please Login</Notification>
			</div>
		);
	} else {
		creator_id = tokenData.account.id;
	}

	let userBuckets = buckets.filter(
		(bucket) => bucket.owner.id === tokenData.account.id
	);

	const handleNameChange = (event) => {
		const value = event.target.value;
		setName(value);
	};

	const handlePhotoChange = (event) => {
		const value = event.target.value;
		setPhoto(value);
	};

	const handleDetailsChange = (event) => {
		const value = event.target.value;
		setDetails(value);
	};

	const handleCityChange = (event) => {
		const value = event.target.value;
		setCity(value);
	};

	const handleAddressChange = (event) => {
		const value = event.target.value;
		setAddress(value);
	};

	const handleUrlChange = (event) => {
		const value = event.target.value;
		setUrl(value);
	};

	const handleBucketChange = (event) => {
		const value = event.target.value;
		setBucket(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.name = name;
		data.photo = photo;
		data.details = details;
		data.city = city;
		data.address = address;
		data.url = url;
		data.creator_id = creator_id;
		data.bucket_id = bucket;

		const bucketUrl = "http://localhost:8000/api/drops";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		};
		const response = await fetch(bucketUrl, fetchConfig);
		if (response.ok) {
			navigate(`/bucketdrops/${bucket}`);
		}

		setName("");
		setPhoto("");
		setDetails("");
		setCity("");
		setAddress("");
		setUrl("");
		setBucket("");
	};

	return (
		<>
			<div className="create-bucket">
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label className="label">Drop Name</label>
						<div className="control">
							<input
								required
								onChange={handleNameChange}
								value={name}
								name="name"
								className="input"
								type="text"
								placeholder="Your Drop Name"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Photo</label>
						<div className="control">
							<input
								required
								onChange={handlePhotoChange}
								value={photo}
								name="photo"
								className="input"
								type="text"
								placeholder="Location Photo"
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
					<div className="field">
						<label className="label">City</label>
						<div className="control">
							<input
								required
								onChange={handleCityChange}
								value={city}
								name="city"
								className="input"
								type="text"
								placeholder="Location details"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Address</label>
						<div className="control">
							<input
								required
								onChange={handleAddressChange}
								value={address}
								name="address"
								className="input"
								type="text"
								placeholder="Address"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Website</label>
						<div className="control">
							<input
								required
								onChange={handleUrlChange}
								value={url}
								name="url"
								className="input"
								type="text"
								placeholder="Your details"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Select bucket</label>
						<div className="control">
							<div className="select">
								<select
									onChange={handleBucketChange}
									required
									name="bucket"
									value={bucket}
									id="bucket"
									className="select">
									<option>Select</option>
									{userBuckets.map((bucket) => {
										return (
											<option
												key={bucket.id}
												value={bucket.id}>
												{bucket.title}
											</option>
										);
									})}
								</select>
							</div>
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

export default CreateDropForm;
