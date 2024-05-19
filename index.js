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
    console.log(pokemons);
    return pokemons;
  }
}

addEventListener('load', async () => {
  const loadingElement = document.querySelector('.loading');
  const pokemonContainer = document.querySelector('.pokemon-container');

/* The code snippet `loadingElement.classList.remove('hide');` is showing a loading message on the
webpage. It is targeting an HTML element with the class "loading" and removing the "hide" class from
it. This action makes the loading message visible to the user by displaying the element that was
initially hidden using the "hide" class. */
  // Show loading message
  loadingElement.classList.remove('hide');

 /* `const pokemon = new Pokemon();` is creating a new instance of the `Pokemon` class. This line of
 code initializes a new object named `pokemon` based on the `Pokemon` class constructor. The
 `Pokemon` class defines properties and methods that can be accessed and used by this newly created
 object. This instance can then be used to call methods and access properties defined within the
 `Pokemon` class, such as the `getData` method in this case. */
  const pokemon = new Pokemon();

 /* `let result = await pokemon.getData();` is calling the `getData` method asynchronously on the
 `pokemon` object. */
  let result = await pokemon.getData();

/* The code snippet `loadingElement.classList.add('hide');` is hiding the loading message on the
webpage. It targets an HTML element with the class "loading" and adds the "hide" class to it. By
adding the "hide" class, the loading message element is hidden from the user interface, effectively
removing it from view. This action is typically performed after the data fetching or processing is
complete, indicating that the loading process has finished and the content is ready to be displayed. */
  // Hide loading message
  loadingElement.classList.add('hide');

  /* This code snippet is using the `map` function on the `result` array to iterate over each item
  (which represents a Pokémon object) in the array and create a new array of formatted HTML strings
  for each Pokémon. Here's a breakdown of what it's doing: */
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
        <div  hide class="pokemon_hover_stats hide">
        <p>HP: ${item.stats[0].base_stat}</p>
        <p>HP: ${item.stats[0].base_stat}</p><img src="${item.sprites.front_default}" alt="${item.name}">
        </div>
      </div>
    `;
  }).join('');

  /* `pokemonContainer.innerHTML = print;` is setting the inner HTML content of the `pokemonContainer`
  element to the value stored in the `print` variable. */
  pokemonContainer.innerHTML = print;

  // Attach each Pokémon's HTML element to the Pokémon object
  result.forEach(pokemon => {
    pokemon.element = pokemonContainer.querySelector(`[key='${pokemon.id}']`);

   /* The code snippet you provided is adding a hover event listener to each Pokémon element in the
   HTML. When a user hovers over a Pokémon card, this event listener triggers a function that
   selects the element with the class "pokemon_hover_stats" inside the hovered Pokémon card and
   removes the "hide" class from it. This action makes the additional stats section visible when the
   user hovers over a Pokémon card. */
    // Add hover event listeners
    pokemon.element.addEventListener('mouseenter', () => {
      pokemon.element.querySelector('.pokemon_hover_stats').classList.remove('hide');
    });

    /* The code snippet you provided is adding an event listener to the `mouseleave` event on each
    Pokémon element in the HTML. When a user moves the cursor away from a Pokémon card, this event
    listener triggers a function that selects the element with the class "pokemon_hover_stats"
    inside the Pokémon card that the cursor is leaving and adds the "hide" class to it. */
    pokemon.element.addEventListener('mouseleave', () => {
      pokemon.element.querySelector('.pokemon_hover_stats').classList.add('hide');
    });
  });

  

  /* `let searchInput = document.querySelector('.pokemon-search');` is selecting the HTML element with
  the class "pokemon-search" from the document. This line of code is assigning the selected element
  to the variable `searchInput`, which can then be used to interact with the search input element in
  the JavaScript code. */
  let searchInput = document.querySelector('.pokemon-search');

  /* This code snippet is adding an event listener to the `input` event on the search input element
  with the class "pokemon-search". When the user types into the search input field, this event
  listener triggers a function that performs the following actions for each Pokémon in the `result`
  array: */
 /* This code snippet is adding an event listener to the `input` event on the search input element with
 the class "pokemon-search". When the user types into the search input field, this event listener
 triggers a function that iterates over each Pokémon in the `result` array. */
  searchInput.addEventListener("input", e => {
    /* `const value = e.target.value.toLowerCase();` is a line of code that retrieves the current value
    entered into an input field and converts it to lowercase. Here's a breakdown of what it does: */
    const value = e.target.value.toLowerCase();

   /* This code snippet is iterating over each Pokémon object in the `result` array and performing the
   following actions for each Pokémon: */
    result.forEach(pokemon => {
      const isVisible =
        pokemon.name.toLowerCase().includes(value) ||
        pokemon.order == Number(value);
      pokemon.element.classList.toggle("hide", !isVisible);
    });
  });
});
