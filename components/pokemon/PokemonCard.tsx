import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/lib/types';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const id = pokemon.url.split('/').slice(-2, -1)[0];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-4 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            fill
            className="object-contain"
          />
        </div>
        
        <div className="text-start">
          <h3 className="text-xl font-bold text-gray-800 capitalize mt-1">
            {pokemon.name}
          </h3>
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
        <Link
          href={`/pokemon/${id}`}
          className="flex items-center justify-end space-x-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <span>Details</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}