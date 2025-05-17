interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }
  
  export function Button({ children, onClick, className = '' }: ButtonProps) {
    return (
      <button
        type="button"
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }