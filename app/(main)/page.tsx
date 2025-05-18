import { Suspense } from 'react';
import { getPokemonList, getPokemonTypes } from '@/lib/api';
import FilterForm from '@/components/pokemon/FilterForm';
import LoadingSkeleton from '@/components/elements/LoadingSkeleton';
import PokemonGridWrapper from '@/components/pokemon/PokemonGridWrapper';

export default async function Home() {
  const [initialPokemon, types] = await Promise.all([
    getPokemonList(),
    getPokemonTypes()
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokémon Search</h1>
      
      <FilterForm types={types} />
      
      <Suspense fallback={<LoadingSkeleton />}>
        <PokemonGridWrapper initialPokemon={initialPokemon} />
      </Suspense>
    </main>
  );
}