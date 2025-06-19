import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const scrollPosition = useScrollPosition();
  
  // Close mobile menu on location change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 ${scrollPosition > 10 ? 'bg-darkBg/95 backdrop-blur-lg' : 'bg-darkBg/80 backdrop-blur-lg'} border-b border-gray-800 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-xl font-bold">DN</span>
              </div>
              <span className="ml-2 text-xl font-inter font-bold">VORTEX</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <NavItem href="/" label="Home" currentPath={location} />
            <NavItem href="/services" label="Services" currentPath={location} />
            <NavItem href="/pricing" label="Pricing" currentPath={location} />
            <NavItem href="/courses" label="Courses" currentPath={location} />
            <NavItem href="/contact" label="Contact" currentPath={location} />
            <NavItem href="/admin" label="Admin" currentPath={location} />
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/register" className="hidden md:flex bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition duration-300 items-center">
              <span>Get Started</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <i className={`fa ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-darkBg shadow-lg">
            <MobileNavItem href="/" label="Home" />
            <MobileNavItem href="/services" label="Services" />
            <MobileNavItem href="/pricing" label="Pricing" />
            <MobileNavItem href="/courses" label="Courses" />
            <MobileNavItem href="/contact" label="Contact" />
            <MobileNavItem href="/admin" label="Admin" />
            <Link href="/register" className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium bg-primary hover:bg-primary-dark transition">
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const NavItem = ({ href, label, currentPath }: { href: string; label: string; currentPath: string }) => {
  const isActive = currentPath === href;
  
  return (
    <div className="group relative">
      <Link href={href} className={`px-3 py-2 text-sm font-medium hover:text-secondary transition ${isActive ? 'text-secondary' : 'text-white'}`}>
        {label}
      </Link>
      <div className={`nav-indicator absolute inset-x-0 w-full ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
    </div>
  );
};

const MobileNavItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link href={href} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">
      {label}
    </Link>
  );
};

export default Navbar;
