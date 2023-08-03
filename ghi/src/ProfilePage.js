import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetTokenQuery } from "./app/api";
import Dropdown from "./dropdown/DropdownContent";
import Notification from "./login_signup/Notification";
import UseDisplayAvatar from "./Avatar";
import "./App.css"
import './style/hidden-card.css'
import './style/profile.css'


function ProfilePage() {
    const [buckets, setBuckets] = useState([]);

    useEffect(() => {
        const fetchBuckets = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/buckets");
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
    console.log(userBuckets)
    return (
        <div>
            <div>
                <h2 className="create-dropdown">
                    <Dropdown userBuckets={userBuckets} />
                </h2>
            </div>

            <h2 id="home-avatar"> <UseDisplayAvatar size={4} /></h2>
            <h3 style={{ textAlign: 'center' }} id="render-modal-here" className="title is-1">{tokenData.account.full_name}</h3>
            <h4 style={{ textAlign: 'center' }}>Buckets Created: {userBuckets.length}</h4>
            <p style={{ textAlign: 'center' }}> @{tokenData.account.username}</p>
            <div className="floating-masonry-container">
                {userBuckets.map((bucket) => (
                    <div key={bucket.id} >
                        <div className="floating-masonry-item floating-white-container">
                            <Link to={`/bucketdrops/${bucket.id}`}>
                                <div className="floating-card">
                                    <img src={bucket.cover_photo} alt={bucket.title} />
                                    <h5 className="floating-text">{bucket.address} {bucket.title}</h5>
                                    {/* <p>{bucket.details}</p> */}
                                </div>

                            </Link>
                        </div>
                    </div>
                ))
                }
            </div>

        </div>

    );
}


export default ProfilePage;

