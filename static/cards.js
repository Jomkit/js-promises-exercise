let base = 'https://deckofcardsapi.com/api/deck';

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card,console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

async function part1(){
    let deck = await axios.get(`${base}/new/shuffle`);
    // console.log(deck.data);
    let card = await axios.get(`${base}/${deck.data.deck_id}/draw/?count=1`)
    console.log(card.data.cards[0].value + " of " + card.data.cards[0].suit);
}
part1();

// let promise = axios.get(`${base}/new/shuffle`)
//     .then(res => {
//         // console.log(res.data);
//         return axios.get(`${base}/${res.data['deck_id']}/draw`);
//     })
//     .then(res => {
//         let text = res.data.cards[0].value + ' of ' + res.data.cards[0].suit;
//         console.log('PART 1');
//         console.log(text);
//         console.log(`Remaining: ${res.data.remaining}`)
//         console.log("/////////");
//     });

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.

async function part2(){
    let deck = await axios.get(`${base}/new/shuffle`);
    // console.log(deck.data);
    let {data: card1} = await axios.get(`${base}/${deck.data.deck_id}/draw/?count=1`)
    let {data: card2} = await axios.get(`${base}/${deck.data.deck_id}/draw/?count=1`)

    console.log(card1.cards[0].value + " of " + card1.cards[0].suit);
    console.log(card2.cards[0].value + " of " + card2.cards[0].suit);
}
part2();

// let card1;
// let promise2 = axios.get(`${base}/new/shuffle`)
//     .then(res => {
//         // console.log(res.data);
//         return axios.get(`${base}/${res.data['deck_id']}/draw`);
//     })
//     .then(res => {
//         card1 = res.data.cards[0].value + ' of ' + res.data.cards[0].suit;
//         return axios.get(`${base}/${res.data['deck_id']}/draw`);
//     })
//     .then(res => {
//         let card2 = res.data.cards[0].value + ' of ' + res.data.cards[0].suit;
//         console.log('PART 2');
//         console.log(card1);
//         console.log(card2);
//         console.log('//////////');
//     })

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

$btn = $('button');
$cardField = $('#card-field');
$img = $('<img></img>');

class Deck {
    constructor(){
        this.deckId;
    }
    async initDeck() {
        // Partial var is just for testing, add to axios.get url as necessary
        let partial = '/?cards=AS,2S,KS,AD,2D,KD';
        let {data: res} = await axios.get(`${base}/new/shuffle`);
        this.deckId = res.deck_id;
        console.log('ready!');
    }
    async drawCard(){
        let {data: res} = await axios.get(`${base}/${this.deckId}/draw`);
        let src = res.cards[0].image;
        // console.log(res);
        $img.attr("src", src);
        $cardField.append($img);
        console.log("remaining:", res.remaining);
        if(res.remaining == 0){
            $btn.remove();
            $('.container').text('No more cards!');
        }
    }
}

let deck = new Deck();
deck.initDeck();
$btn.click(() => deck.drawCard());



// let drawPromise = axios.get(`${base}/new/shuffle`)
//     .then(res => {
//         let dId = res.data.deck_id;
//         $btn.click(() => draw(dId));
//         // return dId;
//     });

// // Draw a card
// function draw(deckId){
//     return axios.get(`${base}/${deckId}/draw`)
//         .then(res => {
//             src = res.data.cards[0].image;
//             $img.attr("src", src);
//             $cardField.append($img);
//             console.log('remaining:' + res.data.remaining);
//             if(res.data.remaining == 0){
//                 $btn.remove();
//                 $('.container').text('No more cards!');
//             }
//         })
// };

