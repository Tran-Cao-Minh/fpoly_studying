var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Pokemon;
const getPokemonData = (quantity) => __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${quantity}`);
    const pokemonData = yield response.json();
    return pokemonData;
});
const getPokemonDetailData = (url) => __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(url);
    const pokemonDetailData = yield response.json();
    return pokemonDetailData;
});
const getPokemonDetailList = (pokemonData) => __awaiter(this, void 0, void 0, function* () {
    const urlList = [];
    pokemonData.map((pokemon) => {
        urlList.push(pokemon.url);
    });
    const pokemonList = yield Promise.all(urlList.map(url => getPokemonDetailData(url).then((data) => {
        Pokemon = {
            id: data.id,
            name: data.name.toUpperCase(),
            image: data.sprites.other.dream_world.front_default,
            type: data.types[0].type.name.toUpperCase()
        };
        return Pokemon;
    })));
    return pokemonList;
});
const suffleArray = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]]
            = [array[randomIndex], array[currentIndex]];
    }
    ;
    return array;
};
(function showPokemonData(quantity) {
    const pokemonContainer = document.querySelector('#app');
    getPokemonData(quantity).then((pokemonData) => {
        getPokemonDetailList(pokemonData.results).then((pokemonList) => {
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
