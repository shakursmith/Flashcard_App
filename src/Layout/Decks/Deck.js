import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory, useRouteMatch } from 'react-router-dom';
import { deleteCard, readDeck } from '../../utils/api/index.js';
import { deleteDeck } from '../../utils/api/index.js';



function Deck({updateDecks}) {
    const [deck, setDeck] = useState([]);
    const {deckId} = useParams();
    const history = useHistory();
    const { url } = useRouteMatch();
    const { id, name, description, cards } = deck;

    useEffect(() => {
        const abortController = new AbortController();
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(() => response);
        };
        deckInfo();
        return () => abortController.abort();
    }, [deckId])


    const deleteHandler = async () => {
        if (window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")) {
          await deleteDeck(id);
          updateDecks(-1);
          history.push('/');
        } else {
            history.go(0);
        } 
    }

    if (!deck || !cards) {
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
                        <li className="breadcrumb-item">{name}</li>
                    </ol>
                </nav>
                <div className="card border-0 mb-4">
                    <div className="card-body">
                        <div className="row px-3">
                            <h5 className="card-title">{name}</h5>
                        </div>
                        <p className="card-text">{description}</p>
                        <div className="row px-3">
                            <Link to={`/decks/${id}/edit`} className="btn btn-secondary"><i className="fa fa-edit" aria-hidden="true"></i> Edit</Link>
                            <Link to={`/decks/${id}/study`} className="btn btn-primary ml-3"><i className="fa fa-bookmark" aria-hidden="true"></i> Study</Link>
                            <Link to={`/decks/${id}/cards/new`} className="btn btn-primary ml-3"><i className="fa fa-plus" aria-hidden="true"></i> Add Cards</Link>
                            <button onClick={deleteHandler} name="delete" value={id} className="btn btn-danger ml-auto"><i className="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
                <div className="row pl-3 pb-2">
                    <h1>Cards</h1>
                </div>
                {cards.map((card, index) => 
                    <div className="row" key={index}>
                        <div className="col">
                            <div className="card">
                                <div className="row card-body">
                                    <p className="col-6 card-text">{card.front}</p>
                                    <p className="col-6 card-text">{card.back}</p>
                                </div>
                                <div className="d-flex justify-content-end p-4">
                                    <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary"><i className="fa fa-edit" aria-hidden="true"></i> Edit</Link>
                                    <button onClick={async () => {
                                        if (window.confirm("Are you sure you want to delete this card? You will not be able to recover it.")) {
                                          await deleteCard(card.id);
                                          updateDecks(-1);
                                          history.go(0);
                                        } else {
                                            history.go(0);
                                        } 
                                    }} name="deleteCard" value={card.id} className="btn btn-danger ml-3"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
}

export default Deck;

// The Deck screen has the following features:

    // The path to this screen should include the deckId (i.e., /decks/:deckId).
    // There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).
    // The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of navigational components that compose declaratively in your application").
    // The screen includes "Edit", "Study", "Add Cards", and "Delete" buttons. Each button takes the user to a different destination, as follows:

    // | Button Clicked | Destination |
    // | -------------- | ---------------------------------------------------------------------------------------------- |
    // | "Edit" | Edit Deck Screen |
    // | "Study" | Study screen |
// | "Add Cards" | Add Card screen |
    // | "Delete" | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section below) |

// Each card in the deck:

    // is listed on the page under the "Cards" heading.
    // shows a question and the answer to the question.
// has an “Edit” button that takes the user to the Edit Card screen when clicked.
// has a “Delete” button that allows that card to be deleted.