/*function convertPokemonTypesToList(pokemonTypes) {
  return  pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}*/



function convertePokemonToList(pokemon) {
  return`
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>
      <img
        src="${pokemon.photo}"
        alt="${pokemon.name}"
      />
    </div>
  </li>
  `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => { 
  const newListHtml =  pokemons.map(convertePokemonToList).join('');
  pokemonList.innerHTML = newListHtml
    //const listItens = [];
    //for (let i = 0; i < pokemons.length; i++) {
    //    const pokemon = pokemons[i];
    //    listItens.push(convertePokemonToList(pokemon))
    //} 
    //console.log(listItens)
  })
