'use client';

import { useSearchParams } from 'next/navigation';
import { usePokemon } from '@/hooks/usePokemon';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { Pokemon } from '@/lib/types';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { Suspense } from 'react';

interface PokemonGridProps {
  initialPokemon: Pokemon[];
}

function PokemonGridContent({ initialPokemon }: PokemonGridProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || '';
  
  const { pokemonList, loading, error } = usePokemon({
    type,
    search,
    initialData: initialPokemon
  });

  if (loading) return <LoadingSkeleton />;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  
  if (!pokemonList.length) {
    return (
      <EmptyState 
        title="No Pokémon found"
        description={
          type && search
            ? `No ${type} Pokémon matching "${search}"`
            : type
            ? `No ${type} Pokémon found`
            : search
            ? `No Pokémon matching "${search}"`
            : 'No Pokémon available'
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default function PokemonGrid({ initialPokemon }: PokemonGridProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PokemonGridContent initialPokemon={initialPokemon} />
    </Suspense>
  );
}