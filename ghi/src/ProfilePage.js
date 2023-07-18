import React, { useState, useEffect } from 'react';
import { useGetTokenQuery } from './app/api';
import Notification from './Notification';

function ProfilePage() {
    const [buckets, setBuckets] = useState([])
    
    useEffect(() => {
        const fetchBuckets = async () => {
            const url = 'http://localhost:8000/api/buckets'
            const response = await fetch(url)
            
            if (response.ok) {
                const data = await response.json()
                setBuckets(data)
                console.log(data)
            } else {
                console.error(response)
            }
        }

        fetchBuckets()
    }, [])

    const { data: tokenData} = useGetTokenQuery()
    console.log("hello line 26")
    
    let userBuckets = null
    
     if (!tokenData) {
        return (
            <div className="container">
                <Notification type="info"> Please Login</Notification>
            </div>
        )
    } else {
        userBuckets = buckets.filter(
            (bucket) => bucket.owner.id === tokenData.account.id);
    }

   return  (
        <div>
        <h2>These are buckets on cards</h2>
        <div className="columns">
            {userBuckets.map((bucket) => (
            <div className="column" key={bucket.id}>
                <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                    <img
                        src={bucket.cover_photo}
                        alt={bucket.title}
                    />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                        <img
                            src={bucket.owner.profile_picture}
                            alt={bucket.owner.username}
                        />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{bucket.title}</p>
                        <p className="subtitle is-6">
                        @{bucket.owner.username}
                        </p>
                    </div>
                    </div>
                    <div className="content">
                    {bucket.details}
                    <br />
                    {/* <a href="#">@bulmaio</a>. */}
                    <br />
                    {/* {bucket.tags.map((tag) => (
                        <a key={tag} href="#">{tag}</a>
                    ))} */}
                    <br />
                    <time dateTime={bucket.timestamp}>
                        {bucket.timestamp}
                    </time>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );

}



export default ProfilePage;
