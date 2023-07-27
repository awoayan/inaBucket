import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SaveDropForm from './dropdown/SaveDropForm';
import DeleteDrops from './dropdown/DeleteDrop';
import EditDropDropdown from './dropdown/EditDropDropdown';


function DropsPage() {
    const { dropId } = useParams();
    const [drop, setDrop] = useState(null);
    useEffect(() => {
        const fetchDrop = async () => {
            try {
                const response = await fetch(`https://localhost:8000/api/drops/${dropId}`);
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
            <div className='column'>
                <div className='drop-card-container'>
                    <div className="drop-card">
                        <img className='card-image' src={drop.photo} alt={drop.name} />
                        <div className="card-details">
                            <h1>{drop.name}</h1>
                            <p>{drop.details}</p>
                            <p>{drop.city}</p>
                            <p>{drop.address}</p>
                            <p>{drop.url}</p>
                            <SaveDropForm dropId={dropId} />
                            <EditDropDropdown dropId={dropId} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <DeleteDrops dropId={dropId} />
            </div>
            <SaveDropForm dropId={dropId} />
        </div>


    );
}
export default DropsPage;
