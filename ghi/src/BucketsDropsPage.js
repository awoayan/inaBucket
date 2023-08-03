import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import './App.css'


function BucketsDropsPage() {
    const { bucketId } = useParams();
    const [bucketDrops, setBucketDrops] = useState([]);
    const [bucketName, setBucketName] = useState('');

    useEffect(() => {
        const fetchBucketInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/buckets/${bucketId}`);
                if (response.ok) {
                    const data = await response.json();
                    setBucketName(data.title);
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
    console.log(bucketDrops)

    return (
        <div>
            <div>
                <h2 style={{ textAlign: 'center' }} className="title is-1">{bucketName}</h2>
                <p style={{ textAlign: 'center' }}>{bucketDrops.bucket_details}</p>
            </div>
            <div className="floating-masonry-container">
                {bucketDrops.map((bucketDrop) => (
                    <div key={bucketDrop.id}>
                        <div className="floating-masonry-item floating-white-container">
                            <Link to={`/drops/${bucketDrop.drop_id}`} className="card-link">
                                <div className="floating-card">
                                    <img src={bucketDrop.drop_photo} alt={bucketDrop.drop_name} />


                                    <h2>{bucketDrop.drop_name}</h2>

                                </div>
                            </Link>
                        </div>
                    </div>
                ))
                }
            </div >
        </div >


    );
}

export default BucketsDropsPage;
