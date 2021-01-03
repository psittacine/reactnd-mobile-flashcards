import AsyncStorage from "@react-native-async-storage/async-storage";

export const DECKS_STORAGE_KEY = "MobileFlashcards:decks";

// DOCS - AsyncStorage:  https://react-native-async-storage.github.io/async-storage/docs/usage

/*
Data:
We'll use `AsyncStorage` to store our decks and flashcards. Redux is optional for this project.

Using `AsyncStorage` you'll manage an object whose shape is similar to this.

Notice each deck creates a new key on the object. Each deck has a `title` and a `questions` key. `title` is the title for the specific deck and `questions` is an array of questions and answers for that deck.
*/

const initialDecksData = {
    React: {
        title: "React",
        questions: [{
                question: "What is React?",
                answer: "A library for managing user interfaces",
            },
            {
                question: "Where do you make Ajax requests in React?",
                answer: "The componentDidMount lifecycle event",
            },
        ],
    },
    JavaScript: {
        title: "JavaScript",
        questions: [{
            question: "What is a closure?",
            answer: "The combination of a function and the lexical environment within which that function was declared.",
        }, ],
    },
};

function setDummyData() {
    let dummyData = initialDecksData;

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));

    return dummyData;
}

function formatDecksResults(results) {
    return results === null ? setDummyData() : JSON.parse(results);
}

/*
// Sample from UdaciFitness; formatCalendarResults = JSON.parse(results)
export function fetchCalendarResults() {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults);
}
*/
/*
// DOCS:  setItem - serialize object value - JSON.stringify(jsonValue)
const setData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
        // saving error
    }
};
*/
/*
// DOCS:  getItem - deserialize object value - JSON.parse(jsonValue)
export const getDecks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};
*/
/*
export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) =>
        formatDecksResults(results)
    );
}
*/

// returns all of the decks along with their titles, questions, and answers.
export const getDecks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

        console.log("getDecks jsonValue: ", JSON.stringify(jsonValue));

        // TODO:  test which return value is needed if null
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        // return formatDecksResults(jsonValue);
    } catch (e) {
        console.log("Error getting Decks data: ", e);
    }
};

// takes in a single `id` argument; returns the deck associated with that id.
export const getDeck = async (id) => {
    try {
        const jsonValue = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

        console.log("getDeck jsonValue[id]: ", JSON.stringify(jsonValue[id]));

        return jsonValue != null ? JSON.parse(jsonValue)[id] : null;
    } catch (e) {
        console.log("Error getting Deck data: ", e);
    }
};

// takes in a single `title` argument; adds it to the decks.
export const saveDeckTitle = async (title) => {
    try {
        const decksList = getDecks();

        // TODO:  Prevent user from entering duplicate title/id (append unique number here or prevent submission on front end?)

        const newDeck = {
            [title]: {
                title,
                questions: [],
            },
        };

        console.log("saveDeckTitle - newDeck: ", JSON.stringify(newDeck));

        const newDecksList = {
            ...decksList,
            newDeck,
        };

        const jsonValue = JSON.stringify(newDecksList);

        console.log("saveDeckTitle jsonValue: ", jsonValue);

        await AsyncStorage.setItem(DECKS_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.log("Error saving Deck Title data: ", e);
    }
};

// takes in two arguments, `title` and `card`; adds the card to the list of questions for the deck with the associated title; card = {question, answer}
export const addCardToDeck = async (title, card) => {
    try {
        const decksList = getDecks();

        const newCardDeck = {
            [title]: {
                title,
                questions: decksList[title].questions.concat([card]),
            },
        };

        console.log("addCardToDeck - newCardDeck: ", JSON.stringify(newCardDeck));

        const newDecksList = {
            ...decksList,
            newCardDeck,
        };

        const jsonValue = JSON.stringify(newDecksList);

        console.log("addCardToDeck jsonValue: ", jsonValue);

        await AsyncStorage.setItem(DECKS_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.log("Error saving Deck Title data: ", e);
    }
};
