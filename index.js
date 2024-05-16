class Pokemon {
  constructor(name) {
    this.name = name;
  }

  async getData() {
    let count = 0;
    let data;
    let pokemons = [];
    for (let i = 0; i <= 150; i++) {
      count++;
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
      data = await response.json();
      pokemons.push(data);
    }
    console.log(pokemons);
    return pokemons;
  }
}

addEventListener('load', async () => {
  const pokemon = new Pokemon();
  let result = await pokemon.getData();
  let print = result.map((item) => {
    return `
      <div key=${item.id} class="pokemon-card">
      <h1>#${item.order}</h1>
      <img src="${item.sprites.front_default}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.stats[0].stat.name} ${item.stats[0].base_stat}</p>
        <p>${item.stats[1].stat.name} ${item.stats[1].base_stat}</p>
        <p>${item.stats[2].stat.name} ${item.stats[2].base_stat}</p>
        <p>${item.stats[3].stat.name} ${item.stats[3].base_stat}</p>
        <p>${item.types[0].type.name}</p>
        <p>${item.height}</p>
        <p>${item.weight}</p>
      </div>
    `;
  }).join('');

  let pokemon_container = document.querySelector('.pokemon-container');
  pokemon_container.innerHTML = print;

  // Attach each Pokémon's HTML element to the Pokémon object
  result.forEach(pokemon => {
    pokemon.element = pokemon_container.querySelector(`[key='${pokemon.id}']`);
  });

  let searchInput = document.querySelector('.pokemon-search');

  /* This code snippet is adding an event listener to the `searchInput` element, which is an input
  field for searching Pokémon. When the user types into the input field, the event listener triggers
  a function that performs the following actions for each Pokémon in the `result` array: */
  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

   /* This code snippet is part of an event listener attached to an input field used for searching
   Pokémon. When the user types into the input field, this event listener triggers a function that
   iterates over each Pokémon in the `result` array. */
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
