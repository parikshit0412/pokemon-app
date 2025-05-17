import Link from 'next/link';

export default function Breadcrumbs({ name }: { name: string }) {
  return (
    <nav className="mb-6 flex items-center text-sm">
      <Link href="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-600 capitalize">{name}</span>
    </nav>
  );
}