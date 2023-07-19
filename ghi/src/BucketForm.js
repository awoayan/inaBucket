import React, { useState, useEffect } from 'react';
import { useGetTokenQuery } from './app/api';
import Notification from './Notification';


function CreateBucketForm(){
    const [title, setTitle] = useState("")
    const [coverPhoto, setCoverPhoto] = useState("")
    const [details, setDetails] = useState("")
    

   const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
   }

   const handleCoverPhotoChange = (event) => {
    const value = event.target.value;
    setCoverPhoto(value);

   }
   const handleDetailsChange = (event) => {
    const value = event.target.value;
    setCoverPhoto(value);
   }


   let accountId = null


    const { data: tokenData } = useGetTokenQuery()

    if (!tokenData) {
        return (
            <div classNameName="container">
                <Notification type="info"> Please Login</Notification>
            </div>
        )
    } else {
        accountId = tokenData.account.id;
    }


    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        const data = {}
        data.title = title
        data.cover_photo = coverPhoto
        data.details = details
        data.account_id = accountId

        const bucketUrl = "http://localhost:8080/api/buckets/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            credentials: "include",
        }
        const response = await fetch(bucketUrl, fetchConfig);
        if (response.ok){
            const newBucket = await response.json()

            setDetails("");
            setCoverPhoto("")
            setTitle("")
        }
    }
  return (
      <>
      <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
       <h1>
        My bucket modal 
       </h1>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
    </div>
      
      
      </>
    )
  



}

export default CreateBucketForm