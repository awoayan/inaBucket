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

    return (
        <div>
            <div>
                <h2 style={{ textAlign: 'center' }} className="title is-1">{bucketName}</h2>
            </div>
            <div className="columns is-multiline">
                <div className="column is-12">
                    {/* <div className="create-dropdown" id="render-modal-here">
                        <div className="button is-primary">
                            <Dropdown />
                        </div>
                    </div> */}
                </div>
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
                            <div className="card hover-drop">
                                <img className='card-image' src={bucketDrop.drop_photo} alt={bucketDrop.drop_name} />
                                <div className='card-content'>
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
