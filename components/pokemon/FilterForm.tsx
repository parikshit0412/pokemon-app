'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import  useDebounce  from '@/hooks/useDebounce';
import SearchInput from '@/components/elements/SearchInput';
import TypeSelect from '@/components/elements/TypeSelect';
import { PokemonType } from '@/lib/types';
import { Suspense } from 'react';

interface FilterFormProps {
  types: PokemonType[];
}

function FilterFormContent({ types }: FilterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);
    if (selectedType) params.set('type', selectedType);
    
    router.replace(`/?${params.toString()}`);
  }, [debouncedSearchTerm, selectedType, router]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    router.replace('/');
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TypeSelect 
          types={types}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        />
        <SearchInput 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Pokemon by name..."
        />
      </div>
      
      {(selectedType || searchTerm) && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function FilterForm({ types }: FilterFormProps) {
  return (
    <Suspense>
      <FilterFormContent types={types} />
    </Suspense>
  );
}