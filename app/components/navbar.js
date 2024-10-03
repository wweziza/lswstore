import { User, Menu, X } from "lucide-react";
import { useState } from "react";
const Navbar = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-3xl text-black font-bold">
            <span className="text-red-500">L</span>SW
        </div>
        <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-500 transition">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition">Games</a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition">About</a>
            <User className="text-gray-600 cursor-pointer hover:text-blue-500 transition" />
        </div>
        <div className="md:hidden text-black-200">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
        </nav>
        {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
            <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Home</a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Games</a>
            <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">About</a>
        </div>
        )}
    </header>
  );
};

export default Navbar;


