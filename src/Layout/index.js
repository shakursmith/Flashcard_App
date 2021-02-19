import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Study from "./Study/Study";
import { Switch, Route } from "react-router-dom";
import CreateDeck from "./Decks/CreateDeck";
import Deck from "./Decks/Deck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Decks/AddCard";
import EditCard from "./Decks/EditCard";
import Home from "./Home/Home";

function Layout() {
  const [deckLength, setDeckLength] = useState(0);

  const updateDecks = (newDecks) => {
    setDeckLength(() => deckLength + newDecks)
  }
 
  return (
    <div>
      <Header />
      <div className="container mb-4">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/" exact>
            <Home updateDecks={updateDecks} deckLength={deckLength} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId" exact>
            <Deck updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard updateDecks={updateDecks} />
          </Route>
          <Route>
            <NotFound />  
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Layout;
