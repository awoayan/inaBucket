import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SaveDropForm from './SaveDropForm';
import UpdateDropForm from './UpdateDropForm';
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
                <div className="drop-card">
                    <img className='card-image' src={drop.photo} alt={drop.name} />
                    <div className="card-content">
                        <p className="title is-2">{drop.name}</p>
                        <p>{drop.details}</p>
                        <p>{drop.city}</p>
                        <p>{drop.address}</p>
                        <p>{drop.url}</p>
                        <UpdateDropForm dropData={drop} />
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
