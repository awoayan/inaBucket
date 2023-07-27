import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import './App.css'

function BucketsDropsPage() {
    const { bucketId } = useParams();
    const [bucketDrops, setBucketDrops] = useState([]);

    useEffect(() => {
        const fetchBucketDrops = async () => {
            try {
                const response = await fetch(`https://localhost:8000/api/bucket_drops/${bucketId}`)
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
        fetchBucketDrops();
    }, [bucketId]);

    if (!bucketDrops) {
        return null
    }
    if (bucketDrops.length === 0) {
        return (
            <h1>Your Bucket is empty. Save a drop! </h1>
        )
    }

    return (
        <div>
            <h2>{bucketDrops.title}</h2>
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
                        <Link to={`/drops/${bucketDrop.drop_id}`} className="card-link">
                            <div className="card hover-drop">
                                <img className='card-image' src={bucketDrop.drop_photo} alt={bucketDrop.drop_name} />
                                <div className='card-conent'>
                                    <div className='media'>
                                    </div>
                                    <div className='card-details'>
                                        <h2>{bucketDrop.drop_name}</h2>
                                        {/* <p>{bucketDrop.drop_details}</p>
                                            <p>{bucketDrop.drop_city}</p>
                                            <p>{bucketDrop.drop_address}</p>
                                            <p>{bucketDrop.drop_url}</p> */}
                                        <div className='move-left'>
                                            <Icon path={mdiArrowRight} size={2} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <footer>
                Footer Note
            </footer>
        </div>
    );
}

export default BucketsDropsPage;
