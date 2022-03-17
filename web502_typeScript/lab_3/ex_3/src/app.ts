let Pokemon: {
  id: number,
  name: string,
  image: string,
  type: string
};

const getPokemonData = async (quantity: number) => {
  const response: Response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${quantity}`
  );
  const pokemonData: any = await response.json();

  return pokemonData;
};

const getPokemonDetailData = async (url: string) => {
  const response: Response = await fetch(url);
  const pokemonDetailData: any = await response.json();

  return pokemonDetailData;
};

const getPokemonDetailList = async (pokemonData: any) => {
  const urlList: string[] = [];
  pokemonData.map((pokemon: any) => {
    urlList.push(pokemon.url);
  });

  const pokemonList = await Promise.all(
    urlList.map(
      url => getPokemonDetailData(url).then((data: any) => {
        Pokemon = {
          id: data.id,
          name: data.name.toUpperCase(),
          image: data.sprites.other.dream_world.front_default,
          type: data.types[0].type.name.toUpperCase()
        };
        return Pokemon;
      })
    )
  );

  return pokemonList;
};

const suffleArray = (array: any[]) => {
  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]]
      = [array[randomIndex], array[currentIndex]];
  };

  return array;
};

(function showPokemonData(quantity: number): void {
  const pokemonContainer: HTMLElement = document.querySelector('#app');

  getPokemonData(quantity).then((pokemonData: any) => {
    getPokemonDetailList(pokemonData.results).then((pokemonList: any[]) => {
      const inGamePokemonList = suffleArray(pokemonList.concat(pokemonList));
      
      inGamePokemonList.forEach(pokemonItem => {
        pokemonContainer.innerHTML += `
          <div class="pokemon-item rounded"
            title="Name: ${pokemonItem.name} - Type: ${pokemonItem.type}"
          >
            <div class="pokemon-id text rounded">
              ${pokemonItem.id}
            </div>
            <div class="pokemon-img">
              <img src="${pokemonItem.image}" alt="${pokemonItem.name}">
            </div>
          </div>
        `;
      });
    });
  });
})(10);



