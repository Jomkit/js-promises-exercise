
class pokemonAsync{
    constructor(){
        this.base = "https://pokeapi.co/api/v2";
    }
    async randomPokemon(){
        let res = await axios.get(`${this.base}/pokemon?limit=1400`);
        let rnd = Math.floor(Math.random() * res.data.count);
        let randomPokemon = await axios.get(res.data.results[rnd].url);
        // console.log(randomPokemon.data);
        return randomPokemon.data;
    }
    async putPokemonOnPage(){
        let pokemon = await this.randomPokemon();
        let flavor_text = await axios.get(pokemon.species.url); 
        let sprite = pokemon.sprites['front_default'];
        let name = pokemon.name;
        let entries = flavor_text.data.flavor_text_entries;

        // console.log(pokemon.name, pokemon.sprites['front_default']);
        // console.log(flavor_text.data.flavor_text_entries[2]);

        for(let entry in entries){
            if(entries[entry]['language']['name'] == 'en'){
                let text = entries[entry]['flavor_text'];
                // console.log(name + ": " + text);
                
                let html = 
                `<div class="card bg-info" style="width: 18rem;">
                <img src="${sprite}" class="card-img-top mx-auto" style="height:100px; width:100px" alt="pokemon sprite">
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${text}</p>
                </div>
                </div>`;
                
                $('#board').append(html);
                
                return;
            }
        }

    }
    async thrice(){
        for(let i=0; i < 3; i++){
            await this.putPokemonOnPage();
        }
    }
}

let pa = new pokemonAsync();
$('button').click(async () => {pa.thrice()});   