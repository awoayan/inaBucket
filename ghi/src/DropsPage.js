import React, { useState, useEffect } from 'react';
import { useGetTokenQuery, useLogOutMutation } from "./app/api";
import { useParams } from 'react-router-dom';
import SaveDropForm from './dropdown/SaveDropForm';

import DeleteDrops from './dropdown/DeleteDrop';
import EditDropDropdown from './dropdown/EditDropDropdown';
import './App.css'


function DropsPage() {
    const { data: token } = useGetTokenQuery();
    const { dropId } = useParams();
    const [drop, setDrop] = useState(null);
    const [showSave, setShowSave] = useState(false)

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
        <body>
        <div>
            <div className='column'>
                <div className='drop-card-container'>
                    <div className="drop-card">
                        <div>
                            <img className='card-image' src={drop.photo} alt={drop.name} />
                            <div className="middle">
                                <div>
                                    {showSave && <SaveDropForm dropId={dropId} />}
                                    <button className="save-button2" onClick={toggle}>
                                        save
                                    </button>
                                </div>
                            </div>
                            <div className="card-details">
                                <h1>{drop.name}</h1>
                                <p>{drop.details}</p>
                                <p>{drop.city}</p>
                                <p>{drop.address}</p>
                                <p>{drop.url}</p>
                                {/*  */}
                            </div>


                            <div className="edit-buttons">
                                {!token || token.account.id === drop.creator_id.id ? (

                                    <DeleteDrops dropId={dropId} />,

                                    <EditDropDropdown dropId={dropId} />
                                ) : (
                                    <p></p>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div>
                <DeleteDrops dropId={dropId} />
            </div>
            <SaveDropForm dropId={dropId} />
                <footer>
                    Bcket
                </footer>
        </div>
        </body>
            );
}
            export default DropsPage;
