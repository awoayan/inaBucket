import { useGetTokenQuery } from "./app/api";
import Notification from "./Notification";
import React, { useState, useEffect } from "react";

function SaveDropForm({ dropId }) {
    const [selectedBucket, setSelectedBucket] = useState(null);
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
    const handleSaveToBucket = async () => {
        if (selectedBucket) {
            try {
                const response = await fetch("http://localhost:8000/api/bucket_drops", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bucket_id: selectedBucket.id,
                        drop_id: dropId,
                    }),
                });
                if (response.ok) {
                    alert("Drop saved to bucket!");
                } else {
                    console.error(response);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    return (
        <div>
            <div className="field">
                <label className="label">Save to Bucket</label>
                <div className="control">
                    <div className="select">
                        <select
                            onChange={(e) =>
                                setSelectedBucket(
                                    userBuckets.find(
                                        (bucket) => bucket.id === parseInt(e.target.value)
                                    )
                                )
                            }
                        >
                            <option value="">Select a bucket</option>
                            {userBuckets.map((bucket) => (
                                <option key={bucket.id} value={bucket.id}>
                                    {bucket.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <button className="button is-primary" onClick={handleSaveToBucket}>
                Save to Bucket
            </button>
        </div>
    );
}
export default SaveDropForm;
