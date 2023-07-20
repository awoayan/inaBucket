import React, { useState, useEffect } from "react";
import { useGetTokenQuery } from "./app/api";
import Notification from "./Notification";

function CreateDropForm() {
	const [name, setName] = useState("");
	const [photo, setPhoto] = useState("");
	const [details, setDetails] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [url, setUrl] = useState("");
	const [buckets, setBuckets] = useState([])
	const [bucket, setBucket] = useState("");

	const { data: tokenData } = useGetTokenQuery();

	creator_id = null; 

	if (!tokenData) {
		return (
			<div classNameNameName="container">
				<Notification type="info"> Please Login</Notification>
			</div>
		);
	} else {
		creator_id = tokenData.account.id;
	}

	const fetchData = async () => {

		const bucketurl = 
	}




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

		const bucketUrl = "http://localhost:8000/api/drops";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		};
		console.log("fetch Config:", fetchConfig);
		const response = await fetch(bucketUrl, fetchConfig);
		if (response.ok) {
			const newDrop = await response.json();
		}
	};

	return (
		<div>
			<h1>create a drop</h1>
		</div>
	);
}
