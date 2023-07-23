import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SaveDropForm from './SaveDropForm';
import './DropPage.css' 

function DropsPage() {
    const { dropId } = useParams();
    const [drop, setDrop] = useState(null);

    useEffect(() => {
        const fetchDrop = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/drops/${dropId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
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
            <div className="card" style={{ width: '550px', height: '750px' , backgroundColor: 'SeaShell ' }}>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-2">{drop.name}</p>
                            <img src={drop.photo} alt={drop.name} />
                            <p>{drop.details}</p>
                            <p>{drop.city}</p>
                            <p>{drop.address}</p>
                            <p>{drop.url}</p>
                        </div>
                    </div>
                </div>
                <SaveDropForm dropId={dropId}/>
            </div>
        </div>
    );
}

export default DropsPage;