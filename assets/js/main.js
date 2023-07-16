/*function convertPokemonTypesToList(pokemonTypes) {
  return  pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}*/

const pokemonList = document.getElementById("pokemonList");
const loadMoreBtn = document.getElementById("loadMore");
const limit = 12;
let offset = 0;






function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newListHtml = pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
        </ol>
        <img
          src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
      </div>
    </li>
    `).join('')
    pokemonList.innerHTML += newListHtml
  })
}

loadPokemonItens(offset, limit)

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  loadPokemonItens(offset, limit);
});

//const listItens = [];
//for (let i = 0; i < pokemons.length; i++) {
//    const pokemon = pokemons[i];
//    listItens.push(convertePokemonToList(pokemon))
//}
//console.log(listItens)
