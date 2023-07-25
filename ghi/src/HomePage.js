import React, { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { Link } from 'react-router-dom';
import './App.css'

function HomePage() {
	const [buckets, setBuckets] = useState([]);
	const [drops, setDrops] = useState([]);
	const [mixedItems, setMixedItems] = useState([]);
	useEffect(() => {
		const fetchBucketsAndDrops = async () => {
			try {
				const bucketUrl = "http://localhost:8000/api/buckets";
				const dropUrl = "http://localhost:8000/api/drops";
				const bucketResponse = await fetch(bucketUrl);
				const dropResponse = await fetch(dropUrl);
				if (bucketResponse.ok && dropResponse.ok) {
					const bucketData = await bucketResponse.json();
					const dropData = await dropResponse.json();
					setBuckets(bucketData);
					setDrops(dropData);
					const mixedItems = mixAndShuffleItems(bucketData, dropData);
					setMixedItems(mixedItems);
				} else {
					console.error(bucketResponse);
					console.error(dropResponse);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchBucketsAndDrops();
	}, []);
	const mixAndShuffleItems = (buckets, drops) => {
		const mixedItems = [...buckets, ...drops];
		const shuffledItems = shuffleArray(mixedItems);
		return shuffledItems;
	};
	const shuffleArray = (array) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};


	return (
		<div>
			<h2>These are buckets and drops on cards</h2>
			<body>

				<div className="container">
					<div className="columns is-multiline">
						{mixedItems.map((item) => (
							<div className="column is-one-fifth" key={item.id}>
								{("title" in item) ? (
									<Link to={`/bucketdrops/${item.id}`} className="card-link">
										<div className="card">
											<div className="card-image">
												<figure className="image is-4by3">
													<img src={item.cover_photo} alt={item.title} />
												</figure>
											</div>
											<div className="card-content">
												<div className="media">
													<div className="media-left">
														<figure className="image is-48x48">
															<img
																src={item.owner.profile_picture}
																alt={item.owner.username}
															/>
														</figure>
													</div>
													<div className="media-content">
														<p className="title is-4">{item.title}</p>
														<p className="subtitle is-6">@{item.owner.username}</p>
													</div>
												</div>
												<div className="content">{item.details}</div>
											</div>
										</div>
									</Link>
								) : (
									<Link to={`/drops/${item.id}`} className="card-link">
										<div className="card">
											<div className="card-image">
												<figure className="image is-4by3">
													<img src={item.photo} alt={item.name} />
												</figure>
											</div>
											<div className="card-content">
												<div className="content">
													<p>City: {item.city}</p>
													<p>Address: {item.address}</p>
													<p>
														URL: <a href={item.url}>{item.url}</a>
													</p>
												</div>
											</div>
										</div>
									</Link>
								)}
							</div>
						))}
					</div>
				</div>
			</body>

			<footer className="footer-orange">
				pintrip
			</footer>
		</div >
	);
}


export default HomePage;
