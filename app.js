function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
/****** Number Facts *******/
const num_url = 'http://numbersapi.com';



// 1. Make requests to Numbers API to get a fact about your favorite number
// Make sure response is JSON

let numPromise = axios.get(`${num_url}/5?json`)
    .then(res => {
        p = $('#fav-num');
        text = $(`<p>Fun fact: ${res.data.text}</p>`);
        p.append(text[0]);
        console.log(res.data.text);
    });

// 2. Figure out how to get data on multiple numbers in a single request. Make that 
// request and when you get the data back, put all of the number facts on the page.

let num2Promise = axios.get(`${num_url}/11..15?json`)
    .then(res => {
        p = $('#mult-num');
        for(num in res.data){
            fact = JSON.stringify(res.data[num]);
            text = $(`<p>${num}: ${fact}</p>`);
            p.append(text[0]);

        } 
        
    });

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, 
// put them on the page. It’s okay if some of the facts are repeats.
let fourNumPromises = [];

for(let i = 0; i < 4; i++){
    fourNumPromises.push(
        axios.get(`${num_url}/5?json`)
    );
}

Promise.all(fourNumPromises)
    .then(numArr => {
        p = $('#fav-num');
        p.append(`<h2>More facts about my favorite number:</h2>`)
        numArr.forEach(n => {
            text = $(`<p>${n.data.text}</p>`);
            p.append(text[0]);
        })
    });