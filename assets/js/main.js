const pokemonList = document.getElementById("pokemonList");
const nextPageBtn = document.getElementById("nextBtn");
const prevPageBtn = document.getElementById("prevBtn");

let offset = 0;
let limit = 12;
const offsetLimit = 151;

nextPageBtn.addEventListener("click", () => {
  offset += limit;
  const offsetTotal = offset + limit;
  if (offsetTotal >= offsetLimit) {
    const newLimit = offsetLimit - offset;
    nextPageBtn.classList.add("hidden");
    window.scrollTo(0, 0);
    loadPokemonsItens(offset, newLimit);
  } else {
    window.scrollTo(0, 0);
    loadPokemonsItens(offset, limit);
  }
});

prevPageBtn.addEventListener("click", () => {
  offset -= limit;
  window.scrollTo(0, 0);
  if (nextPageBtn.classList.contains("hidden"))
    nextPageBtn.classList.remove("hidden");
  loadPokemonsItens(offset, limit);
});

function convertPokemonToPokemonModel(pokemonDetails) {
  const pokemon = new Pokemon(
    pokemonDetails.id,
    pokemonDetails.name,
    pokemonDetails.types,
    pokemonDetails.sprites.other.home.front_default
  );
  return pokemon;
}

function loadPokemonsItens(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newList = pokemons
        .map((pokemon) => {
          return `
                    <li onClick="getInfoPokemon(${pokemon.id}, '${
            pokemon.name
          }', '${
            pokemon.types
          }')" class="pokemon ${pokemon.type.toLowerCase()}">
                        <div class="pokemon-header">
                            <p class="name">${pokemon.name}</p>
                            <p class="number">#${pokemon.id}</p>
                        </div>
                        <div class="details">
                            <ol class="types">
                                ${pokemon.types
                                  .map(
                                    (type) =>
                                      `<li class="type ${type.toLowerCase()}" >${type}</li>`
                                  )
                                  .join("")}
                            </ol>
                            <img class="pokemon-img"
                                src=${pokemon.img}
                                alt=${pokemon.name}>
                        </div>
                    </li>`;
        })
        .join("");
      pokemonList.innerHTML = newList;
    })
    .catch((error) => console.error(error));
  offset == 0
    ? prevPageBtn.classList.add("hidden")
    : prevPageBtn.classList.remove("hidden");
}

function getInfoPokemon(id, name, types) {
  const newTypes = types.split(",");
  nextPageBtn.classList.add("hidden");
  prevPageBtn.classList.add("hidden");
  pokeApi
    .getInfoPokemon(id)
    .then((pokemonDetails) =>
      pokemonDetails.map((detail) => newFunction(detail))
    )
    .then((detail) =>
      detail.map((statsList) => {
        return `
                <li class="stat">
                    <p class=${statsList.name.toLowerCase()}>${
          statsList.name
        }</p>
                    <p>${statsList.stat}</p>
                </li>
            `;
      })
    )
    .then((li) => {
      let pokemon = `
            <div class="card  ${newTypes[0].toLowerCase()}">
                <div class="card-header">
                    <button onClick="back()" class="back" type="button"></button>
                    <h2 class="name">${name}</h2>
                    <p class="number">#${id}</p>
                </div>
                <div class="card-body">
                    <div class="card-details">
                        <ol class="card-types">
                            ${newTypes
                              .map((type) => {
                                return `<li class="type ${type.toLowerCase()}">${type}</li>`;
                              })
                              .join("")}
                        </ol>
                    </div>
                    <img class="card-img"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png"
                        >
                    <div class="card-info ${newTypes.join(' ').toLowerCase()}">
                        <ol class="stats">
                         ${li
                           .map(
                             (stat) => `
                        <li class="stat ${newTypes[0].toLowerCase()}">
                            ${stat}
                        </li>
                    `
                           )
                           .join("")}
                </ol>
            </div>
        </div>
    </div>`;
      pokemonList.innerHTML = pokemon;
    });

  function newFunction(detail) {
    return { name: detail.stat.name, stat: detail.base_stat };
  }
}

function back() {
  nextPageBtn.classList.remove("hidden");
  prevPageBtn.classList.add("hidden");
  loadPokemonsItens(offset, limit);
}

loadPokemonsItens(offset, limit);
