'use client';

import { Suspense } from 'react';
import PokemonGrid from './PokemonGrid';
import LoadingSkeleton from '@/components/elements/LoadingSkeleton';
import { PokemonAPIResponseType } from '@/lib/types';

interface PokemonGridWrapperProps {
  initialPokemon: PokemonAPIResponseType[];
}

export default function PokemonGridWrapper({ initialPokemon }: PokemonGridWrapperProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PokemonGrid initialPokemon={initialPokemon} />
    </Suspense>
  );
}