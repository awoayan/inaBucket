import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetTokenQuery } from "./app/api";
import Dropdown from "./DropdownContent";
import Notification from "./Notification";

function ProfilePage() {
    const [buckets, setBuckets] = useState([]);
    useEffect(() => {
        const fetchBuckets = async () => {
            const url = 'http://localhost:8000/api/buckets';
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setBuckets(data);
                console.log(data);
            } else {
                console.error(response);
            }
        };
        fetchBuckets();
    }, []);
    const { data: tokenData } = useGetTokenQuery();
    let userBuckets = null;
    if (!tokenData) {
        return (
            <div className="container">
                <Notification type="info"> Please Login</Notification>
            </div>
        );
    } else {
        userBuckets = buckets.filter(
            (bucket) => bucket.owner.id === tokenData.account.id
        );
    }

    // if (!userBuckets) {
    //     return null
    // }
    return (
        <div>
            <h2>These are profile owners buckets</h2>
            <div className="columns is-multiline ">
                {userBuckets.map((bucket) => (
                    <div
                        className="column is-one-fifth "
                        key={bucket.id}
                        style={{ transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.classList.add('card-scaled');
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.classList.remove('card-scaled');
                        }}
                    >
                        <Link to={`/bucketdrops/${bucket.id}`} className="card-link">
                            <div className="card">
                                <img className="card-image" src={bucket.cover_photo} alt={bucket.title} />
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-left">
                                            <figure className="image is-48x48">
                                                <img src={bucket.owner.profile_picture} alt={bucket.owner.username} />
                                            </figure>
                                        </div>
                                        <div className="media-content">
                                            <p className="title is-4">{bucket.title}</p>
                                            <p className="subtitle is-6">@{bucket.owner.username}</p>
                                        </div>
                                    </div>
                                    <div className="content" style={{ color: 'white', maxHeight: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {bucket.details.length > 150 ? `${bucket.details.slice(0, 150)}...` : bucket.details}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <footer>
                FOOTER NOTER
            </footer>
        </div>
    );
}
export default ProfilePage;
