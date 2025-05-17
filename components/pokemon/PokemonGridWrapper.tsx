'use client';

import { Suspense } from 'react';
import PokemonGrid from './PokemonGrid';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { Pokemon } from '@/lib/types';

interface PokemonGridWrapperProps {
  initialPokemon: Pokemon[];
}

export default function PokemonGridWrapper({ initialPokemon }: PokemonGridWrapperProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PokemonGrid initialPokemon={initialPokemon} />
    </Suspense>
  );
}