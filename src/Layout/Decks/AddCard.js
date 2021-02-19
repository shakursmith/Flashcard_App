import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api/index.js'
import CardForm from "./CardForm.js";

function AddCard({updateDecks}) {
    const [deck, setDeck] = useState([]);
    const [card, addCard] = useState({front: "", back: "", deckId: ""});
    const {deckId} = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(() => response);
        };
        deckInfo();
        return () => abortController.abort();
    }, [deckId])

    const formChange = ({ target }) => {
        addCard({...card, [target.name]: target.value});
    }
    
    const formSubmit = async (event) => {
        event.preventDefault();
        addCard({...card, deckId: deckId});
        await createCard(deckId, card);
        updateDecks(1);
        addCard({front: "", back: "", deckId: ""});
    }

    return (
        <div className="col-9 mx-auto">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item">Add Card</li>
                </ol>
            </nav>
            <div className="row pl-3 pb-2">
                <h1>{deck.name}: Add Card</h1>
            </div>
            <CardForm formSubmit={formSubmit} formChange={formChange} card={card} deckId={deckId} />
        </div>
    )
}

export default AddCard;
                