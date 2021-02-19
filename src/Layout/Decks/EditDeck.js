import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api/index.js'

function EditDeck({updateDecks}) {
    const [deck, editDeck] = useState({name: "", description: ""});
    const history = useHistory();
    const {deckId} = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal);
            editDeck(() => response);
        };
        deckInfo();
        return () => abortController.abort();
    }, [deckId])

    const formChange = ({ target }) => {
        editDeck({...deck, [target.name]: target.value});
    }
    
    const formSubmit = async (event) => {
        event.preventDefault();
        const response = await updateDeck(deck);
        history.push(`/decks/${response.id}`);
        updateDecks(1);
    }

    if (!deck) {
        return (
            <div className="spinner-border text-primary" role="status">
               <span className="sr-only">Loading...</span>
            </div>
    )} else {
        return (
            <div className="col-9 mx-auto">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/"}><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item">Edit Deck</li>
                    </ol>
                </nav>
                <div className="row pl-3 pb-2">
                    <h1>Edit Deck</h1>
                </div>
                <form onSubmit={formSubmit}>
                    <div class="form-group">
                        <label>Name</label>
                        <input 
                        type="text" 
                        name="name"
                        value={deck.name}
                        onChange={formChange}
                        id="name" 
                        class="form-control" 
                        placeholder={deck.name} 
                        />
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea
                        name="description" 
                        value={deck.description}
                        onChange={formChange}
                        class="form-control" 
                        id="description" 
                        placeholder={deck.description}
                        rows={4}
                        />
                    </div>
                    <Link to={`/decks/${deckId}`} name="cancel" class="btn btn-secondary mr-3">Cancel</Link>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default EditDeck;
                