import { Pokemon, PokemonType, PokemonListResponse, TypeResponse } from './types';

export async function fetchPokemonList(
    type?: string,
    search?: string
  ): Promise<Pokemon[]> {
    try {
      let pokemonList: Pokemon[] = [];
      
      // First get Pokémon by type if specified
      if (type) {
        const typeData = await fetchPokeAPI<TypeResponse>(`/type/${type}`);
        pokemonList = typeData.pokemon.map((entry) => entry.pokemon);
      } else {
        // Otherwise get all Pokémon
        const response = await fetchPokeAPI<PokemonListResponse>('/pokemon?limit=151');
        pokemonList = response.results;
      }
  
      // Then apply search filter if specified
      if (search) {
        pokemonList = pokemonList.filter(pokemon =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())
        );
      }
  
      return pokemonList;
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      return [];
    }
  }

export async function fetchPokemonDetails(id: string): Promise<Pokemon | null> {
  try {
    return await fetchPokeAPI<Pokemon>(`/pokemon/${id}`);
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
}

export async function fetchPokemonTypes(): Promise<PokemonType[]> {
  try {
    const response = await fetchPokeAPI<{ results: PokemonType[] }>('/type');
    return response.results.filter(
      type => !['unknown', 'shadow'].includes(type.name)
    );
  } catch (error) {
    console.error('Error fetching Pokémon types:', error);
    return [];
  }
}

async function fetchPokeAPI<T>(endpoint: string): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith('/') 
    ? endpoint.slice(1) 
    : endpoint;

  const url = normalizedEndpoint.startsWith('https://')
    ? normalizedEndpoint
    : `https://pokeapi.co/api/v2/${normalizedEndpoint}`;

  const response = await fetch(url, {
    next: { 
      tags: ['pokemon-data'],
      revalidate: 86400
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}