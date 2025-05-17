import { Suspense } from 'react';
import { fetchPokemonList, fetchPokemonTypes } from '@/lib/api';
import FilterForm from '@/components/pokemon/FilterForm';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import PokemonGridWrapper from '@/components/pokemon/PokemonGridWrapper';

export default async function Home() {
  const [initialPokemon, types] = await Promise.all([
    fetchPokemonList(),
    fetchPokemonTypes()
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