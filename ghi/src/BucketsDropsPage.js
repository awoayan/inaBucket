import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SaveDropForm from './SaveDropForm';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import './App.css'


function BucketsDropsPage() {
    const { bucketId, dropId } = useParams();
    const [bucketDrops, setBucketDrops] = useState([]);

    useEffect(() => {
        const fetchBucketDrops = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/bucket_drops/${bucketId}`)
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
            <h2>Here are the drops from {bucketId}</h2>
            <div className="columns is-multiline ">
                {bucketDrops.map((bucketDrop) => (
                    <div
                        className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
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
                            <div className="card">
                                <img className='card-image' src={bucketDrop.drop_photo} alt={bucketDrop.drop_name} />
                                <div className='card-conent'>
                                    <div className='media'>
                                    </div>
                                        <div className='card-details'>
                                            <h2>{bucketDrop.drop_name}</h2>
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
                Bcket
            </footer>
        </div>
    );
}

export default BucketsDropsPage;
