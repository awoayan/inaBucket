import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './App.css'

function HomePage() {
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
					const mixedItems = shuffleArray([...bucketData, ...dropData]);
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
			<h2 className="has-text-centered">Welcome to the homepage! Let's explore!</h2>
					{/* <div className="container is-variable"> */}
						<div className="columns is-multiline">
							{mixedItems.map((item, index) => (
								<div
									className="column is-one-third"
									key={index}
									key2={item.id}>
									{("title" in item) ? (
										<Link to={`/bucketdrops/${item.id}`} className="card-link">
											<div className="card has-background-grey-light">
												<div>
													<figure className="image is-128x128x">
														<img className='card-image' src={item.cover_photo} alt={item.title} />
													</figure>
												</div>
												<div>
													<div className="media">
														<div className="card-details">
															<h4>{item.title}</h4>
															<p>@{item.owner.username}</p>
														</div>
													</div>
													<div className="card-details">{item.details}</div>
												</div>
											</div>
										</Link>
									) : (
										<Link to={`/drops/${item.id}`} className="card-link">
											<div className="card">
												<div>
													<figure>
														<img className='card-image' src={item.photo} alt={item.name} />
													</figure>
												</div>
												<div className="card-details" >
													<div>
														<h3>{item.name}</h3>
														<h5>{item.city}</h5>
													</div>
												</div>
											</div>
										</Link>
									)}
								</div>
							))}
						</div>
					{/* </div> */}
			</div>
	);
}


export default HomePage;
