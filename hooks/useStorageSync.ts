'use client'

import { useEffect } from 'react'

export function useStorageSync(callback: () => void) {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | Event) => {
      // Pour les événements StorageEvent (entre onglets), vérifier la clé
      if (e instanceof StorageEvent) {
        if (e.key?.startsWith('coloc_')) {
          callback()
        }
      } else {
        // Pour les événements personnalisés (même onglet), toujours déclencher
        callback()
      }
    }

    // Écouter les changements de localStorage (entre onglets)
    window.addEventListener('storage', handleStorageChange)
    // Écouter aussi les événements personnalisés (même onglet)
    const customEventName = 'coloc-storage-change'
    window.addEventListener(customEventName, handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(customEventName, handleStorageChange)
    }
  }, [callback])
}

