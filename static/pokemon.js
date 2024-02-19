const base = "https://pokeapi.co/api/v2"

let n1;
let sprite;

function getPokemon() {

    axios.get(`${base}/pokemon?limit=1300`)
    .then(res => {
        let rnd = Math.floor(Math.random() * 1025);
        
        n1 = res.data.results[rnd].name;    
        return axios.get(res.data.results[rnd].url);
    })
    .then(res => {
        sprite = res.data.sprites.front_default;
        return axios.get(res.data.species.url);
    })
    .then(res => {
        let entries = res.data.flavor_text_entries;

        for(entry in entries){
            if(entries[entry]['language']['name'] == 'en'){
                flavor_text = entries[entry]['flavor_text'];
                console.log(n1 + ": " + flavor_text);
                
                html = 
                `<div class="card bg-info" style="width: 18rem;">
                <img src="${sprite}" class="card-img-top mx-auto" style="height:100px; width:100px" alt="pokemon sprite">
                <div class="card-body">
                <h5 class="card-title">${n1}</h5>
                <p class="card-text">${flavor_text}</p>
                </div>
                </div>`;
                
                $('#board').append(html);
                
                return;
            }
        }
    })
} 

$('button').click(getPokemon);