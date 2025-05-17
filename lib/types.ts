export interface Pokemon {
    id: number;
    name: string;
    url: string;
    sprites: {
      front_default: string;
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
    types: {
      type: {
        name: string;
      };
    }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    abilities: {
      ability: {
        name: string;
      };
    }[];
    moves: {
      move: {
        name: string;
      };
    }[];
  }
  
  export interface PokemonType {
    name: string;
    url: string;
  }
  
  export interface PokemonListResponse {
    results: Pokemon[];
  }
  
  export interface TypeResponse {
    pokemon: {
      pokemon: Pokemon;
    }[];
  }