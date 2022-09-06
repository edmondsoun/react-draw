import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck";


function DrawApp() {

    //when page loads, create new deck
    const [deck, setDeck] = useState({
        deckId: null,
        cardsRemaining: null,
        isLoading: true
    });

    const [cards, setCards] = useState([]);

    //useEffect for initial deck
    useEffect(function fetchDeckOnMount() {
        async function fetchDeck() {
            const deckResult = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
            setDeck({
                deckId: deckResult.data.deck_id,
                cardsRemaining: deckResult.data.remaining,
                isLoading: false
            });
        }
        fetchDeck();
    }, []);

    async function drawCard() {
        if (deck.cardsRemaining === 0) {
            alert('Error: no cards remaining!')
        } else {
            const drawResult = await axios.get(`${BASE_URL}/${deck.deckId}/draw/?count=1`);
            setDeck({
                ...deck,
                cardsRemaining: drawResult.data.remaining
            });
            setCards([...cards, drawResult.data.cards[0]]);
        }
    }

    if (deck.isLoading) return <i>Loading...</i>


    //separate DOM component
    return (
        <div>
            <button onClick={drawCard}>Draw a card!</button>
            <div>
                {cards.length !== 0 &&
                    cards.map(c => <Card card={c} key={c.code} />)}
            </div>
        </div>
    )
}


export default DrawApp;