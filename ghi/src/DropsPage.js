import React, { useState, useEffect } from 'react';
import { useGetTokenQuery } from "./app/api";
import { useParams } from 'react-router-dom';
import SaveDropForm from './dropdown/SaveDropForm';
import UpdateDropModal from './modals/UpdateDropModal'
import './style/card.css'
import DeleteDrop from './dropdown/DeleteDrop';


function DropsPage() {
    const { data: token } = useGetTokenQuery();
    const { dropId } = useParams();
    const [drop, setDrop] = useState(null);
    const [showSave, setShowSave] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    function toggleUpdate() {
        setShowUpdate((showUpdate) => !showUpdate)
    }


    function toggle() {

        setShowSave((showSave) => !showSave);

    }

    useEffect(() => {
        const fetchDrop = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/drops/${dropId}`);
                if (response.ok) {
                    const data = await response.json();
                    setDrop(data);
                } else {
                    console.error(response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchDrop();
    }, [dropId]);

    if (!drop) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <div className="drop-two-container">
                <div className="images">
                    <img className="image" src={drop.photo} />
                </div>
                <div className="product">
                    <p></p>
                    <h1>{drop.name}</h1>
                    <h2>{drop.city}</h2>
                    <p>{drop.details}</p>
                    <p>{drop.url}</p>
                    <p>@{drop.creator_id.username}</p>


                    <div className='buttons'>
                        {showSave && <SaveDropForm dropId={dropId} />}
                        <button onClick={toggle}>
                            Save to Bucket
                        </button>
                        {!token || token.account.id === drop.creator_id.id ? (
                            <>
                                <UpdateDropModal dropId={dropId} />

                                <DeleteDrop dropId={dropId} />
                            </>

                        ) : (
                            <p></p>

                        )}

                    </div>
                </div>
            </div>

        </div >





    );
}
export default DropsPage;



