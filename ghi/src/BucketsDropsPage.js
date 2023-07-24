import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SaveDropForm from './SaveDropForm';

function BucketsDropsPage() {
    const { bucketId, dropId } = useParams();
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

    if (bucketDrops.length === 0) {
        return (
            <h1>Your Bucket is empty. Save a drop! </h1>
        )
    }


    return (
        <div>
            <h2>Here are the drops from {bucketId}</h2>
            <div className="columns is-multiline ">
                {bucketDrops.map((bucketDrop) => (
                    <div
                        className="column is-one-fifth "
                        key={bucketDrop.id}
                        style={{ transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.classList.add('card-scaled');
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.classList.remove('card-scaled');
                        }}
                    >
                        <div> <button>
                            <SaveDropForm dropId={dropId} />
                        </button>

                        </div>
                        <Link to={`/drops/${bucketDrop.drop_id}`} className="card-link">
                            <div className="card">
                                <img className='card-image' src={bucketDrop.drop_photo} alt={bucketDrop.drop_name} />
                                <div className='card-conent'>
                                    <div className='media'>

                                    </div>
                                    <p className="title is-4">{bucketDrop.drop_name}</p>
                                    <p>{bucketDrop.drop_details}</p>
                                    <p>{bucketDrop.drop_city}</p>
                                    <p>{bucketDrop.drop_address}</p>
                                    <p>{bucketDrop.drop_url}</p>
                                </div>

                            </div>

                        </Link>
                    </div>
                ))}
                <footer>
                    Footer Note
                </footer>
            </div>
        </div>
    );
}

export default BucketsDropsPage;
