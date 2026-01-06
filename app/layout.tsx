import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Ma Coloc - Site Collaboratif',
  description: 'Organisation des tâches, repas et courses pour la colocation',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen relative">
        {/* Image de fond */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/image-coloc.jpg')",
          }}
        />
        {/* Overlay vert clair pour le design vert/blanc */}
        <div className="fixed inset-0 z-0 bg-green-50/30" />
        
        {/* Contenu */}
        <div className="relative z-10">
          <Navigation />
          <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

