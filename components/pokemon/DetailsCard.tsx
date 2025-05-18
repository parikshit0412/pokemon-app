import { PokemonAPIResponseType } from '@/lib/types';
import Image from 'next/image';

export default function DetailsCard({ pokemon }: { pokemon: PokemonAPIResponseType }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg max-w-sm mx-auto">
      {/* Top section - Teal background */}
      <div className="bg-teal-300 h-48 flex items-center justify-center relative">
        {pokemon.sprites?.other['official-artwork'].front_default && (
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            width={180}
            height={180}
          />
        )}
      </div>

      {/* Bottom section - Orange background */}
      <div className="bg-orange-200 pt-14 px-6 pb-6">
        {/* Name */}
        <h1 className="font-bold text-gray-900 mb-2 capitalize">
          Name: <span className="font-normal">{pokemon.name}</span>
        </h1>

        {/* Type */}
        <p className="mb-3 text-gray-800 font-semibold">
          Type:
          <span className="ml-2 font-normal">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="text-sm capitalize mr-1"
              >
                {type.type.name}
              </span>
            ))}
          </span>
        </p>

        {/* Stats */}
        <p className="mb-3 text-gray-800 font-semibold">
            Stats:
        <span className="ml-2 font-normal capitalize text-gray-700">
            {pokemon.stats.map((stat) => stat.stat.name.replace('-', ' ')).join(', ')}
        </span>
        </p>


        {/* Abilities */}
        <p className="mb-3 text-gray-800 font-semibold">
          Abilities:
          <span className="ml-2 font-normal capitalize">
            {pokemon.abilities.map((ability, i) => (
              <span key={i} className="mr-1">
                {ability.ability.name.replace('-', ' ')}
                {i < pokemon.abilities.length - 1 ? ',' : ''}
              </span>
            ))}
          </span>
        </p>

        {/* Moves */}
        <p className="text-gray-800 font-semibold">
          Some Moves:
          <span className="ml-2 font-normal capitalize">
            {pokemon.moves.slice(0, 6).map((move, i) => (
              <span key={i} className="mr-1">
                {move.move.name.replace('-', ' ')}
                {i < 5 ? ',' : ''}
              </span>
            ))}
          </span>
        </p>
      </div>
    </div>
  );
}
