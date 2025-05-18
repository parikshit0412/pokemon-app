'use client';

import { useSearchParams } from 'next/navigation';
import { usePokemon } from '@/hooks/usePokemon';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { PokemonAPIResponseType } from '@/lib/types';
import LoadingSkeleton from '@/components/elements/LoadingSkeleton';
import { EmptyState } from '@/components/elements/EmptyState';
import { Suspense } from 'react';

interface PokemonGridProps {
  initialPokemon: PokemonAPIResponseType[];
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
        title="No Pokemon found"
        description={
          type && search
            ? `No ${type} Pokemon matching "${search}"`
            : type
            ? `No ${type} Pokemon found`
            : search
            ? `No Pokemon matching "${search}"`
            : 'No Pokemon available'
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