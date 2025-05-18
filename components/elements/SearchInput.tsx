interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  }
  
  export default function SearchInput({
    value,
    onChange,
    placeholder,
  }: SearchInputProps) {
    return (
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChange}
      />
    );
  }