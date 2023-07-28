import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import './App.css'
import CreateDropModal from './modals/CreateDropModal';

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

        fetchBucketInfo();
        fetchBucketDrops();
    }, [bucketId]);

    if (!bucketDrops) {
        return null;
    }

    return (
        <body>
            <div>
                <div>
                    <h2 style={{ textAlign: 'center', color: 'white' }} className="title is-1">{bucketName}</h2>
                </div>
                <div className="container">
                    <div className="columns is-multiline">
                        <div className="column is-12">
                            <div className="create-dropdown">
                                <div className="button is-primary">
                                    <CreateDropModal />
                                </div>
                            </div>
                        </div>
                        {bucketDrops.map((bucketDrop) => (

                            <div
                                className="column is-full-pc is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
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
                                    <div className="home-drop-card hover-drop">
                                        <img className='home-drop-image' src={bucketDrop.drop_photo} alt={bucketDrop.drop_name} />
                                        <div>
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
                        <footer>
                            Bcket
                        </footer>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default BucketsDropsPage;
