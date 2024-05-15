class Pokemon{
  constructor(name) {
    this.name = name;
  }
  async getData() {
    let count = 0;
    let data;
    let pokemons = []
    for (let i = 0; i <= 150; i++) {
      count++;
      let responce = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
      data = await responce.json();
      
      pokemons.push(data);
      
      
    }
    console.log(data);
    
    
    return pokemons
  }
}

addEventListener('load', async () => {
  const pokemon = new Pokemon();
  let result  = await pokemon.getData();
  let print =  result.map((item) => {
    return (
      `
      <div key=${item.id} class="pokemon-card">
      <h1>${item.order}</h1>
      <h2>${item.name}</h2>
      <img src="${item.sprites.front_default}" alt="${item.name}">
      <p>${item.types[0].type.name}</p>
      <p>${item.height}</p>
      <p>${item.weight}</p>
      
      </div>
      `
    )
  }).join('')

  let pokemon_container = document.querySelector('.pokemon-container')
  pokemon_container.innerHTML = print;


  

});




addEventListener('load', (data) => {
  


}
)
  





