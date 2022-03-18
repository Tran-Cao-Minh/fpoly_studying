interface Pokemon {
  id: number,
  name: string,
  image: string,
  type: string
};
 
export class GamePokemon {
  private quantity: number;
  private fetchLinkPrefix: string;
  private gameContainer: HTMLElement;

  constructor (
    quantity: number,
    fetchLinkPrefix: string,
    gameContainer: HTMLElement
  ) {
    this.quantity = quantity;
    this.fetchLinkPrefix = fetchLinkPrefix;
    this.gameContainer = gameContainer;
  }

  private getPokemonDetailData = async (url: string) => {
    const response: Response = await fetch(url);
    const pokemonDetailData: any = await response.json();
  
    return pokemonDetailData;
  }

  private getPokemonDetailList = async () => {
    const response: Response = await fetch(this.fetchLinkPrefix + this.quantity);
    const pokemonData: any = await response.json();
  
    const pokemonDetailList: any[] = await Promise.all(
      pokemonData.results.map(
        (pokemon: any) => this.getPokemonDetailData(pokemon.url).then((data: any) => {
          const pokemon: Pokemon = {
            id: data.id,
            name: data.name.toUpperCase(),
            image: data.sprites.other.dream_world.front_default,
            type: data.types[0].type.name.toUpperCase()
          };
          return pokemon;
        })
      )
    );
  
    return this.sufflePokemonList(pokemonDetailList.concat(pokemonDetailList));
  }

  public changePokemonQuantity = (quantity: number) => {
    this.quantity = quantity;
  }

  private sufflePokemonList = (pokemonList: any[]) => {
    let currentIndex = pokemonList.length;
    let randomIndex: number;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [pokemonList[currentIndex], pokemonList[randomIndex]]
        = [pokemonList[randomIndex], pokemonList[currentIndex]];
    };

    return pokemonList;
  }

  readonly showPokemonList = () => {
    this.getPokemonDetailList().then((pokemonList: any[]) => {
      pokemonList.forEach((pokemonItem: any)=> {
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
  }
}