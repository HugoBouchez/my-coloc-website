'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/taches', label: 'Tâches' },
    { href: '/repas', label: 'Repas' },
    { href: '/courses', label: 'Courses' },
    { href: '/aide', label: 'Aide' },
  ]

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="text-lg sm:text-xl font-bold">
            🏠 Ma Coloc
          </Link>
          {/* Menu desktop */}
          <div className="hidden md:flex space-x-2 lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-green-700'
                    : 'hover:bg-green-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Bouton menu mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-green-700 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-green-700 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-green-700'
                    : 'hover:bg-green-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

