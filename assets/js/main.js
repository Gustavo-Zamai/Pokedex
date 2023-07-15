function convertePokemonToList(pokemon) {
  return`
    <li class="pokemon">
    <span class="number">#001</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
        <li class="type">grass</li>
        <li class="type">poison</li>
      </ol>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
        alt="${pokemon.name}"
      />
    </div>
  </li>
  `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => { 
    pokemonList.innerHTML += pokemons.map(convertePokemonToList).join('');
    //const listItens = [];
    //for (let i = 0; i < pokemons.length; i++) {
    //    const pokemon = pokemons[i];
    //    listItens.push(convertePokemonToList(pokemon))
    //} 
    //console.log(listItens)
  })
  .catch((error) => console.log(error));
