import { notFound } from 'next/navigation';
import { fetchPokemonDetails, fetchPokemonList } from '@/lib/api';
import DetailsCard from '@/components/pokemon/DetailsCard';
import Breadcrumbs from '@/components/pokemon/Breadcrumbs';

export default async function PokemonDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
  const pokemon = await fetchPokemonDetails(id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs name={pokemon.name} />
      <DetailsCard pokemon={pokemon} />
    </div>
  );
}

export async function generateStaticParams() {
  const pokemonList = await fetchPokemonList();
  
  return pokemonList.slice(0, 151).map((pokemon) => ({
    id: pokemon.url.split('/').slice(-2, -1)[0],
  }));
}

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
  const pokemon = await fetchPokemonDetails(id);
  
  return {
    title: `${pokemon?.name || 'Pokémon'} | Details`,
    description: `Information about ${pokemon?.name || 'this Pokémon'}`,
    openGraph: {
      images: pokemon?.sprites?.other['official-artwork'].front_default 
        ? [pokemon.sprites.other['official-artwork'].front_default] 
        : [],
    },
  };
}