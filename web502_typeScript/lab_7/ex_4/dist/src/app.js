import { GamePokemon } from './GamePokemon.model.js';
import { User } from './User.model.js';
var user = new User();
var startPokemonGame = function () {
    var gameContainer = document.querySelector('#app');
    gameContainer.classList.remove('d-none');
    var gamePokemon = new GamePokemon(10, 'https://pokeapi.co/api/v2/pokemon/?limit=', gameContainer);
    gamePokemon.showPokemonList();
    var userNameText = document.querySelector('#userNameText');
    userNameText.innerHTML = user.getUserName();
};
user.login(document.querySelector('#login'), startPokemonGame);
