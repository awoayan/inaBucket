import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SaveDropForm from './SaveDropForm';
// import './DropPage.css' 

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
            <div className='column is-one'>
            <div className="drop-card is-centered">
                    <img className='card-image' src={drop.photo} alt={drop.name} />
                    <div className="card-details">
                        <h1>{drop.name}</h1>
                        <p>{drop.details}</p>
                        <p>{drop.city}</p>
                        <p>{drop.address}</p>
                        <p>{drop.url}</p>
                        <SaveDropForm dropId={dropId} />
                    </div>
                </div>
            </div>
            <footer>
                Footer Note
            </footer>
        </div>
    );
}
export default DropsPage;




















