import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-3xl text-black font-bold">
          <span className="text-red-500">L</span>SW
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-500 transition">
            Home
          </Link>
          <Link href="/games" className="text-gray-600 hover:text-blue-500 transition">
            Games
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-500 transition">
            About
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-500 transition">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-blue-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-blue-500 transition">
              Login
            </Link>
          )}
        </div>
        <div className="md:hidden text-black-200">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <Link href="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
            Home
          </Link>
          <Link href="/games" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
            Games
          </Link>
          <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
            About
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;