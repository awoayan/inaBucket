import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import './App.css'


function BucketsDropsPage() {
    const { bucketId } = useParams();
    const [bucketDrops, setBucketDrops] = useState([]);
    const [bucket, setBucket] = useState('');

    useEffect(() => {
        const fetchBucketInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/buckets/${bucketId}`);
                if (response.ok) {
                    const data = await response.json();
                    setBucket(data);
                } else {
                    console.error(response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchBucketDrops = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/bucket_drops/${bucketId}`);
                if (response.ok) {
                    const data = await response.json();
                    setBucketDrops(data);
                } else {
                    console.error(response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchBucketInfo();
        fetchBucketDrops();
    }, [bucketId]);

    if (!bucketDrops) {
        return null;
    }

    console.log("BUCKET", bucket)
    return (
        <>
            <body>
                <div>
                    <h2 style={{ textAlign: 'center' }} className="title is-1">{bucket.title}</h2>
                    {/* <h3 style={{ textAlign: 'center' }}>Created by @{bucket.owner.username}</h3> */}
                    <p style={{ textAlign: 'center' }}>{bucket.details}</p>
                </div>
                <div className="floating-masonry-container">
                    {bucketDrops.map((bucketDrop) => (
                        <div key={bucketDrop.id}>
                            <div className="floating-masonry-item floating-white-container">
                                <Link style={{ textDecoration: 'none' }} to={`/drops/${bucketDrop.drop_id}`} className="card-link">
                                    <div className="floating-card">
                                        <img src={bucketDrop.drop_photo} alt={bucketDrop.drop_name} />


                                        <p>{bucketDrop.drop_name}</p>

                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                    }
                </div >
            </body>
        </ >


    );
}

export default BucketsDropsPage;
