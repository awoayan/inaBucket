import React, { useState, useEffect } from 'react';
import { useGetTokenQuery } from './app/api';

function BucketsDropsPage(bucketid) {
const [bucketDrops, setBucketDrops] = useState([]);

useEffect(() => {
    const fetchBuckets = async () => {
    const url = "http://localhost:8000/api/bucket_drops";
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        setBucketDrops(data);
        console.log(data);
    } else {
        console.error(response);
    }
    };

    fetchBuckets();
}, []);
console.log("bucketdrops",bucketDrops)
// let finaldrops = function(bucketDrops) {
//     let userdrops = []
//     for (const drop of bucketDrops){
//         let drops = {};
//         if (bucketDrops.bucket_id === bucketid){
//             drops[drop.username],
//             drops[drop.drop_id],
//             drops[drop.drop_photo],
//             drops[drop.drop_details],
//             drops[drop.drop_city],
//             drops[drop.drop_address],
//             drops[drop.drop_url],
//             drops[drop.drop_name],
//             drops[drop.bucket_title]
//         }
//         userdrops.push(drops)
//     }
//     return userdrops
// }
// console.log(finaldrops)

// return (
// <div>
//     <h2>These are bucketDrops on cards</h2>
//     <div className="columns">
//         {bucketDrops.map((bucketDrop) => (
//             <div className="column" key={bucketDrop.id}>
//                 <div className="card">
//                     <div className="card-content">
//                         <div className="media-content">
//                             <p className="title is-4">{bucketDrop.buckets.title}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         ))}
//     </div>
// </div>
// );
}

export default BucketsDropsPage;
