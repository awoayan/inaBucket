import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BucketsDropsPage() {
const { bucketId } = useParams();
const [bucketDrops, setBucketDrops] = useState([]);

useEffect(() => {
    const fetchBucketDrops = async () => {
    const response = await fetch(`http://localhost:8000/api/bucket_drops/${bucketId}`)

    if (response.ok) {
        const data = await response.json();
        setBucketDrops(data);
        console.log(data);
    } else {
        console.error(response);
    }
    };

    fetchBucketDrops();
}, [bucketId]);

return (
<div>
    <h2>These are bucketDrops on cards</h2>
    <div className="columns">
        {bucketDrops.map((bucketDrop) => (
            <div
                className="column is-one-fifth"
                key={bucketDrop.id}
                style={{ transition: 'transform 0.2s' }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <Link to={`/drops/${bucketDrop.drop_id}`} className="card-link">
                <div className="card" style={{ width: '300px', maxHeight: '500px', border: 0 }}>
                    <div className="card-content">
                        <div className="media-content">
                            <p className="title is-4">{bucketDrop.drop_name}</p>
                            <img src={bucketDrop.drop_photo} alt={bucketDrop.drop_name} />
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        ))}
    </div>
</div>
);
}

export default BucketsDropsPage;
