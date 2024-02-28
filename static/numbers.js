/****** Number Facts *******/
const baseURL = 'http://numbersapi.com';

// 1. Make requests to Numbers API to get a fact about your favorite number
// Make sure response is JSON

async function part1(){
    let res = await axios.get(`${baseURL}/5?json`)
    // console.log(res.data);
    p = $('#fav-num');
    text = $(`<p>Fun fact: ${res.data.text}</p>`);
    p.append(text[0]);
}
part1();

// 2. Figure out how to get data on multiple numbers in a single request. Make that 
// request and when you get the data back, put all of the number facts on the page.

async function part2(){
    let {data: p2} = await axios.get(`${baseURL}/11..15?json`);
    p = $('#mult-num');
    for(num in p2){
        fact = JSON.stringify(p2[num]);
        text = $(`<p>${num}: ${fact}</p>`);
        p.append(text[0]);

    } 
    // console.log(p2);
}
part2();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, 
// put them on the page. It’s okay if some of the facts are repeats.

async function part3(){
    let fourFacts = await Promise.all([
        axios.get(`${baseURL}/5?json`),
        axios.get(`${baseURL}/5?json`),
        axios.get(`${baseURL}/5?json`),
        axios.get(`${baseURL}/5?json`)
    ]);
    p = $('#fav-num');
    p.append('<h2>More facts about my favorite number:</h2>');
    // console.log(fourFacts[0].data.text);
    for(i in fourFacts){
        let text = $(`<p>${fourFacts[i].data.text}</p>`);
        p.append(text);
    }
}
part3();
