import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Heart className="h-8 w-8 text-rose-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Aura</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Transparency
            </Link>
            <Link href="/create" className="bg-rose-500 text-white hover:bg-rose-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Start a Campaign
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
