var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
class GamePokemon {
    constructor(quantity, fetchLinkPrefix, gameContainer) {
        this.getPokemonDetailData = (url) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url);
            const pokemonDetailData = yield response.json();
            return pokemonDetailData;
        });
        this.getPokemonDetailList = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.fetchLinkPrefix + this.quantity);
            const pokemonData = yield response.json();
            const pokemonDetailList = yield Promise.all(pokemonData.results.map((pokemon) => this.getPokemonDetailData(pokemon.url).then((data) => {
                const pokemon = {
                    id: data.id,
                    name: data.name.toUpperCase(),
                    image: data.sprites.other.dream_world.front_default,
                    type: data.types[0].type.name.toUpperCase()
                };
                return pokemon;
            })));
            return this.sufflePokemonList(pokemonDetailList.concat(pokemonDetailList));
        });
        this.changePokemonQuantity = (quantity) => {
            this.quantity = quantity;
        };
        this.sufflePokemonList = (pokemonList) => {
            let currentIndex = pokemonList.length;
            let randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [pokemonList[currentIndex], pokemonList[randomIndex]]
                    = [pokemonList[randomIndex], pokemonList[currentIndex]];
            }
            ;
            return pokemonList;
        };
        this.showPokemonList = () => {
            this.getPokemonDetailList().then((pokemonList) => {
                pokemonList.forEach((pokemonItem) => {
                    this.gameContainer.innerHTML += `
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
        };
        this.quantity = quantity;
        this.fetchLinkPrefix = fetchLinkPrefix;
        this.gameContainer = gameContainer;
    }
}
const gameContainer = document.querySelector('#app');
const gamePokemon = new GamePokemon(10, 'https://pokeapi.co/api/v2/pokemon/?limit=', gameContainer);
gamePokemon.showPokemonList();
