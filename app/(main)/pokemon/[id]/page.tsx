import { notFound } from 'next/navigation';
import { getPokemonDetails, getPokemonList } from '@/lib/api';
import DetailsCard from '@/components/pokemon/DetailsCard';
import Breadcrumbs from '@/components/pokemon/Breadcrumbs';

export default async function PokemonDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
  const pokemon = await getPokemonDetails(id);

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
  const pokemonList = await getPokemonList();
  
  return pokemonList.slice(0, 50).map((pokemon) => ({
    id: pokemon.url.split('/').slice(-2, -1)[0],
  }));
}

export const revalidate = 3600; // 1 hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
  const pokemon = await getPokemonDetails(id);
  
  return {
    title: `${pokemon?.name || 'Pokemon'} | Details`,
    description: `Information about ${pokemon?.name || 'this Pokemon'}`,
    openGraph: {
      images: pokemon?.sprites?.other['official-artwork'].front_default 
        ? [pokemon.sprites.other['official-artwork'].front_default] 
        : [],
    },
  };
}