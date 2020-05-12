const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');
console.log(id);

if(id.length < 1 || isNaN(id) || id < 1 || id === null){
    window.location.replace("https://faiisll.github.io/pokedex/");
}

const setDataPokemon = async () =>{
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    data = await data.json();
    let stat = '';
    let type = '';

    //set image
    document.getElementById('img').innerHTML = await `<img src="${data.sprites.front_default}" class="rounded-circle bg-dark">`;

    // set name
    document.getElementById('name').innerHTML = await data.name;

    //set type
    data.types.map(t => type = type + `<a href="#" class="btn btn-sm btn-primary">${t.type.name}</a>`);
    document.getElementById('type').innerHTML = await type;

    //set stats
    data.stats.map(t => stat = stat + `<div class="col-4 col-md-1"><span class="heading">${t.base_stat}</span><span class="description">${t.stat.name}</span></div>`);
    document.getElementById('stat').innerHTML = await stat;

};

const setDescPokemon = async () => {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    data = await data.json();
    let desc = [];
    let str = '';

    desc = await data.flavor_text_entries.filter(dt => dt.language.name === 'en');
    for(let i = 0 ; i < 2 ; i++){
        str = await str + `${desc[i].flavor_text} `;
    }
    document.getElementById('desc').innerHTML = await str;
    //console.log(await desc);
}

setTimeout(async () =>{
    await setDataPokemon();
    await setDescPokemon();
}, 1);