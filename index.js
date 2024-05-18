class Pokemon {
  constructor(name) {
    this.name = name;
  }

  async getData() {
    let count = 0;
    let data;
    let pokemons = [];
    try {
      for (let i = 1; i <= 150; i++) {  // Adjusted to fetch 150 Pokémon correctly
        count++;
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
        data = await response.json();
        pokemons.push(data);
      }
    } catch (error) {
      console.error(error);
    }
    return pokemons;
  }
}

addEventListener('load', async () => {
  const loadingElement = document.querySelector('.loading');
  const pokemonContainer = document.querySelector('.pokemon-container');

  // Show loading message
  loadingElement.classList.remove('hide');

  const pokemon = new Pokemon();
  let result = await pokemon.getData();

  // Hide loading message
  loadingElement.classList.add('hide');

  let print = result.map((item) => {
    return `
      <div key=${item.id} class="pokemon-card">
        <h1>#${item.order}</h1>
        <img src="${item.sprites.front_default}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.stats[0].stat.name}: ${item.stats[0].base_stat}</p>
        <p>${item.stats[1].stat.name}: ${item.stats[1].base_stat}</p>
        <p>${item.stats[2].stat.name}: ${item.stats[2].base_stat}</p>
        <p>${item.stats[3].stat.name}: ${item.stats[3].base_stat}</p>
        <p>Type: ${item.types[0].type.name}</p>
        <p>Height: ${item.height}</p>
        <p>Weight: ${item.weight}</p>
        <div class="pokemon_hover_stats">
        <p>HP: ${item.stats[0].base_stat}</p>
        </div>
      </div>
    `;
  }).join('');

  pokemonContainer.innerHTML = print;

  // Attach each Pokémon's HTML element to the Pokémon object
  result.forEach(pokemon => {
    pokemon.element = pokemonContainer.querySelector(`[key='${pokemon.id}']`);
  });

  let searchInput = document.querySelector('.pokemon-search');

  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    result.forEach(pokemon => {
      const isVisible =
        pokemon.name.toLowerCase().includes(value) ||
        pokemon.types[0].type.name.toLowerCase().includes(value) ||
        pokemon.height.toString().includes(value) ||
        pokemon.weight.toString().includes(value);

      pokemon.element.classList.toggle("hide", !isVisible);
    });
  });
});
