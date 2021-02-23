import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api/index.js'

function CreateDeck({updateDecks}) {
    const [newDeck, setNewDeck] = useState({name: "", description: ""});
    const history = useHistory();

    const formChange = ({ target }) => {
        setNewDeck({...newDeck, [target.name]: target.value});
    }
    
    const formSubmit = async (event) => {
        event.preventDefault();
        const response = await createDeck(newDeck);
        history.push(`/decks/${response.id}`);
        updateDecks(1);
    }

    return (
        <div className="col-9 mx-auto">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                    <li className="breadcrumb-item">Create Deck</li>
                </ol>
            </nav>
            <form onSubmit={formSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                    type="text" 
                    name="name"
                    value={newDeck.name}
                    onChange={formChange}
                    id="name" 
                    className="form-control" 
                    placeholder="Deck Name" 
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                    name="description" 
                    value={newDeck.description}
                    onChange={formChange}
                    className="form-control" 
                    id="description" 
                    placeholder="Brief description of the deck."
                    rows={4}
                    />
                </div>
                <Link to="/" name="cancel" className="btn btn-secondary mr-3">Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;
                