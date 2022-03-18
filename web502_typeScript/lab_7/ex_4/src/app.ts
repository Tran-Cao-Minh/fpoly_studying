import { GamePokemon } from './GamePokemon.model';
import { User } from './User.model';

const user = new User();
const startPokemonGame = () => {
  const gameContainer: HTMLElement = document.querySelector('#app');
  gameContainer.classList.remove('d-none');

  const gamePokemon = new GamePokemon(
    10,
    'https://pokeapi.co/api/v2/pokemon/?limit=',
    gameContainer
  );
  
  gamePokemon.showPokemonList();

  const userNameText = document.querySelector('#userNameText');
  userNameText.innerHTML = user.getUserName();
};

user.login(
  document.querySelector('#login'),
  startPokemonGame
);
