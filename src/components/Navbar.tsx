'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

// Définition des liens de navigation
const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/a-propos' },
  { 
    name: 'Cellules', 
    href: '/cellules',
    submenu: [
      { name: 'Rédaction', href: '/cellules/redaction' },
      { name: 'Audiovisuel', href: '/cellules/audiovisuel' },
      { name: 'Design', href: '/cellules/design' },
      { name: 'Événementiel', href: '/cellules/evenementiel' }
    ]
  },
  { name: 'Projets & Événements', href: '/projets-evenements' },
  { name: 'Yearbook', href: '/yearbook' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  
  // Effet de scroll pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fonction pour basculer le mode sombre/clair
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  // Fonction pour gérer l'ouverture/fermeture des sous-menus
  const toggleSubmenu = (index: number) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
  };

  return (
    <div className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-blue-900 dark:text-white font-bold text-2xl cursor-pointer"
              >
                Club Média <span className="text-black dark:text-blue-400">Espress</span>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Navigation desktop */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:ml-6 md:flex md:items-center md:space-x-4"
          >
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.submenu ? (
                  <>
                    <button
                      className="px-3 py-2 text-sm font-medium rounded-md text-gray-800 dark:text-gray-200 hover:text-blue-900 dark:hover:text-blue-400 flex items-center group"
                      onClick={() => toggleSubmenu(index)}
                    >
                      {link.name}
                      <motion.div
                        animate={{ rotate: activeSubmenu === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-1"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeSubmenu === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.3 }}
                          className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
                        >
                          <div className="py-1">
                            {link.submenu.map((subItem, subIndex) => (
                              <Link href={subItem.href} key={subIndex}>
                                <motion.div
                                  whileHover={{ backgroundColor: '#f3f4f6', color: '#1e3a8a' }}
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                >
                                  {subItem.name}
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-2 text-sm font-medium rounded-md text-gray-800 dark:text-gray-200 hover:text-blue-900 dark:hover:text-blue-400 relative cursor-pointer"
                    >
                      {link.name}
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 dark:bg-blue-400"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
          
          {/* Boutons d'actions */}
          <div className="flex items-center">
            {/* Toggle mode sombre/clair */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            {/* Bouton rejoindre */}
            <Link href="/rejoindre">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 hidden sm:block cursor-pointer"
              >
                Rejoindre le Club
              </motion.div>
            </Link>
            
            {/* Bouton menu mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-4 md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(index)}
                        className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {link.name}
                        <motion.div
                          animate={{ rotate: activeSubmenu === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {activeSubmenu === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-4"
                          >
                            {link.submenu.map((subItem, subIndex) => (
                              <Link href={subItem.href} key={subIndex}>
                                <motion.div
                                  whileHover={{ backgroundColor: '#f3f4f6' }}
                                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                >
                                  {subItem.name}
                                </motion.div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={link.href}>
                      <motion.div
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        {link.name}
                      </motion.div>
                    </Link>
                  )}
                </div>
              ))}
              <Link href="/rejoindre">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-900 hover:bg-blue-800 mt-4 cursor-pointer"
                >
                  Rejoindre le Club
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}