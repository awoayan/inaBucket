import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetTokenQuery } from "./app/api";
import Dropdown from "./dropdown/DropdownContent";
import Notification from "./login_signup/Notification";
import "./App.css"



function ProfilePage() {
    const [buckets, setBuckets] = useState([]);
    useEffect(() => {
        const fetchBuckets = async () => {
            try {
                const response = await fetch("https://localhost:8000/api/buckets");
                if (response.ok) {
                    const data = await response.json();
                    setBuckets(data);
                } else {
                    console.error(response);
                }
            } catch (error) {
                console.error(error);
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

    return (
        <div>
            <h1 className="create-dropdown">
                <Dropdown userBuckets={userBuckets} />
            </h1>
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
                                        <div className="card-details">
                                            <h2>{bucket.title}</h2>
                                            <p>@{bucket.owner.username}</p>
                                            <div style={{ maxHeight: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {bucket.details.length > 150 ? `${bucket.details.slice(0, 150)}...` : bucket.details}
                                            </div>
                                        </div>
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

