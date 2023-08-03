import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './style/hidden-card.css'
import './App.css'

import Icon from '@mdi/react';
import { mdiPail } from '@mdi/js';



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
			<body>
				<h1 style={{ textAlign: 'center' }} >PINTRIP </h1>
				<h2 style={{ textAlign: 'center' }} >Let's explore!</h2>

				<div>
					<div className="floating-masonry-container">
						<div>
							{mixedItems.map((item, index) => (
								<div key={index}>
									{("title" in item) ? (
										<div className="floating-masonry-item floating-white-container">
											<Link to={`/bucketdrops/${item.id}`}>

												<img className="floating-card" src={item.cover_photo} alt={item.title} />
												<h5 className="floating-text">{item.address} {item.title}  <Icon path={mdiPail} size={.9} /></h5>

											</Link>
										</div>
									) : (
										<div className="floating-masonry-item floating-white-container">

											<Link to={`/drops/${item.id}`} className="card-link">

												<img className="floating-card" src={item.photo} alt={item.name} />
												<p className="floating-text">{item.name}</p>
												<h5 className="floating-text" >@{item.creator_id.username} </h5>
											</Link>
										</div>

									)}
								</div>
							))}

						</div>
					</div>
				</div >
			</body >

		</div >
	);
}


export default HomePage;
