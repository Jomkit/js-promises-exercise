function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
/****** Number Facts *******/
const num_url = 'http://numbersapi.com';



// Make requests to Numbers API to get a fact about your favorite number
// Make sure response is JSON

let num_promise = axios.get(`${num_url}/5?json`)
    .then(res => {
        p = $('#fav-num');
        text = $(`<p>Fun fact: ${res.data.text}</p>`);
        p.append(text[0]);
        console.log(res.data.text);
    })

// Figure out how to get data on multiple numbers in a single request. Make that 
// request and when you get the data back, put all of the number facts on the page.

let num2_promise = axios.get(`${num_url}/`)