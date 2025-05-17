import { useState, useEffect } from 'react';
import { fetchPokemonList } from '@/lib/api';
import { Pokemon } from '@/lib/types';

interface UsePokemonProps {
  type?: string;
  search?: string;
  initialData: Pokemon[];
}

export function usePokemon({ type, search, initialData }: UsePokemonProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonList(type, search);
        setPokemonList(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have filter criteria, otherwise use initialData
    if (type || search) {
      loadPokemon();
    } else {
      setPokemonList(initialData);
    }
  }, [type, search, initialData]);

  return { 
    pokemonList: type || search ? pokemonList : initialData, 
    loading, 
    error 
  };
}