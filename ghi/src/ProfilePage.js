import React, { useEffect } from 'react';

const ProfilePage = () => {
    const profileData = useSelector((state) => state.profilePage);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAccountData = async () => {
            // need to fetch the id from the account
            const accountResponse = await fetch(`https://localhost:8000/api/accounts/`);
            const accountData = await accountResponse.json();

            dispatch(setProfileData(accountData));

            const bucketResponse = await fetch('https://localhost:8000/api/buckets');
            const bucketsData = await bucketResponse.json();

            dispatch(setBuckets(bucketsData));
        };

        fetchAccountData();
    }, [dispatch]);
    
    return (
        <div>
            <h1>{profileData.full_name}'s Profile</h1>
            {/* <img SOME PROFILE PICTURE CODE /> */}
            <h2>My Buckets</h2>
            {profileData.buckets.map((bucket) => (
                <div key={bucket.id}>
                    <h3>{bucket.title}</h3>
                    <p>{bucket.details}</p>
                    {/* More bucket stuff */}
                </div>
            ))}
        </div>
    );
};

export default ProfilePage;
