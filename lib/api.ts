import { PokemonAPIResponseType, PokemonType, PokemonListResponse, TypeResponse } from './types';

export async function getPokemonList(
    type?: string,
    search?: string
  ): Promise<PokemonAPIResponseType[]> {
    try {
      let pokemonList: PokemonAPIResponseType[] = [];
      
      // First get Pokémon by type if specified
      if (type) {
        const typeList = await getAPI<TypeResponse>(`/type/${type}`);
        pokemonList = typeList.pokemon.map((entry) => entry.pokemon);
      } else {
        // Otherwise get all Pokémon
        const response = await getAPI<PokemonListResponse>('/pokemon?limit=50');
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

export async function getPokemonDetails(id: string): Promise<PokemonAPIResponseType | null> {
  try {
    return await getAPI<PokemonAPIResponseType>(`/pokemon/${id}`);
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
}

export async function getPokemonTypes(): Promise<PokemonType[]> {
  try {
    const response = await getAPI<{ results: PokemonType[] }>('/type');
    return response.results.filter(
      type => !['unknown', 'shadow'].includes(type.name)
    );
  } catch (error) {
    console.error('Error fetching Pokémon types:', error);
    return [];
  }
}

async function getAPI<T>(endpoint: string): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith('/') 
    ? endpoint.slice(1) 
    : endpoint;

  const url = normalizedEndpoint.startsWith('https://')
    ? normalizedEndpoint
    : `https://pokeapi.co/api/v2/${normalizedEndpoint}`;

  const response = await fetch(url, {
    cache: 'force-cache',
    next: { 
      tags: ['pokemon-data'],
      revalidate: 3600, // 1 hour
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}