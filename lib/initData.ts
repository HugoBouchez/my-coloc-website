import { TacheSemaine } from './types'
import { getTaches, saveTaches } from './storage'

// Données initiales du tableau
const initialTaches: Omit<TacheSemaine, 'id'>[] = [
  { semaine: '05-janv', poubelles: 'Sara', commun: 'Will', cuisine: 'Nicks', frigo: 'Justine', coursesEssuies: 'Hugo', surprise: 'Amélie', vidanges: 'Dorian' },
  { semaine: '12-janv', poubelles: 'Dorian', commun: 'Sara', cuisine: 'Will', frigo: 'Nicks', coursesEssuies: 'Justine', surprise: 'Hugo', vidanges: 'Amélie' },
  { semaine: '19-janv', poubelles: 'Amélie', commun: 'Dorian', cuisine: 'Sara', frigo: 'Will', coursesEssuies: 'Nicks', surprise: 'Justine', vidanges: 'Hugo' },
  { semaine: '26-janv', poubelles: 'Hugo', commun: 'Amélie', cuisine: 'Dorian', frigo: 'Sara', coursesEssuies: 'Will', surprise: 'Nicks', vidanges: 'Justine' },
  { semaine: '02-févr', poubelles: 'Justine', commun: 'Hugo', cuisine: 'Amélie', frigo: 'Dorian', coursesEssuies: 'Sara', surprise: 'Will', vidanges: 'Nicks' },
  { semaine: '09-févr', poubelles: 'Nicks', commun: 'Justine', cuisine: 'Hugo', frigo: 'Amélie', coursesEssuies: 'Dorian', surprise: 'Sara', vidanges: 'Will' },
  { semaine: '16-févr', poubelles: 'Will', commun: 'Nicks', cuisine: 'Justine', frigo: 'Hugo', coursesEssuies: 'Amélie', surprise: 'Dorian', vidanges: 'Sara' },
  { semaine: '23-févr', poubelles: 'Sara', commun: 'Will', cuisine: 'Nicks', frigo: 'Justine', coursesEssuies: 'Hugo', surprise: 'Amélie', vidanges: 'Dorian' },
  { semaine: '02-mars', poubelles: 'Dorian', commun: 'Sara', cuisine: 'Will', frigo: 'Nicks', coursesEssuies: 'Justine', surprise: 'Hugo', vidanges: 'Amélie' },
  { semaine: '09-mars', poubelles: 'Amélie', commun: 'Dorian', cuisine: 'Sara', frigo: 'Will', coursesEssuies: 'Nicks', surprise: 'Justine', vidanges: 'Hugo' },
]

export const initializeTaches = (force: boolean = false): void => {
  if (typeof window === 'undefined') return
  
  const existingTaches = getTaches()
  
  // Si des tâches existent déjà et qu'on ne force pas, ne pas les écraser
  if (existingTaches.length > 0 && !force) {
    return
  }
  
  // Ajouter les tâches initiales avec des IDs
  const tachesWithIds: TacheSemaine[] = initialTaches.map((tache, index) => ({
    id: `init-${Date.now()}-${index}`,
    ...tache,
  }))
  
  saveTaches(tachesWithIds)
}

