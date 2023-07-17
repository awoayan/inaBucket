import React, { useState, useEffect } from 'react';

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
    return (
        <div>
            <h2>Sales</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Bucket Title</th>
                        <th>Bucket Cover Photo</th>
                        <th>Bucket Details</th>
                        <th>Bucket Owner</th>
                    </tr>
                </thead>
                <tbody className="table-hover">
                    {buckets.map(bucket => {
                        return (
                            <tr key={buckets.id}>
                                <td>{bucket.title}</td>
                                <td>{bucket.cover_photo}</td>
                                <td>{bucket.details}</td>
                                <td>{bucket.owner.username}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default ProfilePage;
