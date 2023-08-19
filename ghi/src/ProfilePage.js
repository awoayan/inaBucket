import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetTokenQuery } from "./app/api";
import Notification from "./login_signup/Notification";
import UseDisplayAvatar from "./Avatar";
import CreateBucketModal from "./modals/CreateBucketModal";
import CreateDropModal from "./modals/CreateDropModal"
import "./App.css"
import './style/hidden-card.css'
import './style/profile.css'
import './style/dropdown.css'


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

    return (
        <div>



            <div className="dropdown">
                <button className="dropbtn">Create</button>
                <div className="dropdown-content">
                    <p> <CreateBucketModal /> </p>


                    <p><CreateDropModal /> </p>

                </div>

            </div>


            {/* <h2 id="home-avatar"> <UseDisplayAvatar size={4} /></h2> */}
            <h1 id="render-modal-here" className="title is-1 user-name">{tokenData.account.full_name}</h1>
            <h2 style={{ textAlign: 'center' }}>Buckets Created: {userBuckets.length}</h2>
            <p style={{ textAlign: 'center' }}> @{tokenData.account.username}</p>
            <div>
                <div className="floating-masonry-container">
                    <div>
                        {userBuckets.map((item, index) => (
                            <div key={index}>

                                <div className="floating-masonry-item floating-white-container">
                                    <Link style={{ textDecoration: 'none' }} to={`/bucketdrops/${item.id}`}>

                                        <img className="floating-card" src={item.cover_photo} alt={item.title} />
                                        <p className="floating-text">{item.address} {item.title}</p>

                                    </Link>
                                </div>



                            </div>
                        ))}

                    </div>
                </div>
            </div >



        </div>

    );
}


export default ProfilePage;

