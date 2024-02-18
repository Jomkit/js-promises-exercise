let base = 'https://deckofcardsapi.com/api/deck';

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card,console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let promise = axios.get(`${base}/new/shuffle`)
    .then(res => {
        // console.log(res.data);
        return axios.get(`${base}/${res.data['deck_id']}/draw`);
    })
    .then(res => {
        let text = res.data.cards[0].value + ' of ' + res.data.cards[0].suit;
        console.log('PART 1');
        console.log(text);
        console.log(`Remaining: ${res.data.remaining}`)
        console.log("/////////");
    });

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.
let card1;
let promise2 = axios.get(`${base}/new/shuffle`)
    .then(res => {
        // console.log(res.data);
        return axios.get(`${base}/${res.data['deck_id']}/draw`);
    })
    .then(res => {
        card1 = res.data.cards[0].value + ' of ' + res.data.cards[0].suit;
        return axios.get(`${base}/${res.data['deck_id']}/draw`);
    })
    .then(res => {
        let card2 = res.data.cards[0].value + ' of ' + res.data.cards[0].suit;
        console.log('PART 2');
        console.log(card1);
        console.log(card2);
        console.log('//////////');
    })

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
let drawPromise = axios.get(`${base}/new/shuffle`)
    .then(res => {
        let dId = res.data.deck_id;
        $btn.click(() => draw(dId));
        // return dId;
    });

$btn = $('button');
$cardField = $('#card-field');
$img = $('<img></img>');

// Draw a card
function draw(deckId){
    return axios.get(`${base}/${deckId}/draw`)
        .then(res => {
            src = res.data.cards[0].image;
            $img.attr("src", src);
            $cardField.append($img);
            console.log('remaining:' + res.data.remaining);
            if(res.data.remaining == 0){
                $btn.remove();
                $('.container').text('No more cards!');
            }
        })
};

