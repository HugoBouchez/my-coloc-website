import { Repas } from './types'
import { getRepas, saveRepas } from './storage'
import { formatDate, getMondayOfWeek } from './utils'

// Fonction pour migrer les repas du vendredi au lundi suivant
export const migrateFridayToMonday = (): void => {
  if (typeof window === 'undefined') return
  
  const repas = getRepas()
  let hasChanges = false
  
  const updatedRepas = repas.map((repasItem) => {
    const date = new Date(repasItem.date)
    const dayOfWeek = date.getDay() // 0 = dimanche, 5 = vendredi
    
    // Si c'est un vendredi (5), déplacer au lundi suivant (+3 jours)
    if (dayOfWeek === 5) {
      hasChanges = true
      const mondayDate = new Date(date)
      mondayDate.setDate(mondayDate.getDate() + 3) // Vendredi + 3 = Lundi
      return {
        ...repasItem,
        date: formatDate(mondayDate)
      }
    }
    
    return repasItem
  })
  
  if (hasChanges) {
    saveRepas(updatedRepas)
  }
}

// Fonction pour obtenir les repas initiaux
// Tous les 4 jours du lundi au jeudi
const getInitialRepas = (): Omit<Repas, 'id'>[] => {
  const today = new Date()
  let nextMonday = getMondayOfWeek(today)
  
  // Si aujourd'hui est déjà lundi ou après dans la semaine, commencer le lundi suivant
  if (today.getDay() > 1 || (today.getDay() === 1 && today.getHours() >= 12)) {
    nextMonday.setDate(nextMonday.getDate() + 7)
  }
  
  const cuisiniers = ['Amélie', 'Sara', 'William', 'Dorian', 'Nicks', 'Justine', 'Hugo']
  const repas: Omit<Repas, 'id'>[] = []
  
  // Générer 4 cycles (16 repas au total)
  for (let cycle = 0; cycle < 4; cycle++) {
    const startDate = new Date(nextMonday)
    startDate.setDate(startDate.getDate() + (cycle * 7)) // Tous les 7 jours (4 jours de repas + 3 jours de pause)
    
    // Lundi, mardi, mercredi, jeudi (4 jours)
    for (let day = 0; day < 4; day++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + day)
      const cuisinierIndex = (cycle * 4 + day) % cuisiniers.length
      repas.push({
        date: formatDate(date),
        cuisinier: cuisiniers[cuisinierIndex]
      })
    }
  }
  
  return repas
}

export const initializeRepas = (force: boolean = false): void => {
  if (typeof window === 'undefined') return
  
  const existingRepas = getRepas()
  
  // Migrer les repas du vendredi au lundi suivant si des repas existent
  if (existingRepas.length > 0) {
    migrateFridayToMonday()
    // Si on ne force pas, ne pas écraser les repas existants
    if (!force) {
      return
    }
  }
  
  const initialRepas = getInitialRepas()
  
  // Ajouter les repas initiaux avec des IDs
  const repasWithIds: Repas[] = initialRepas.map((repas, index) => ({
    id: `init-repas-${Date.now()}-${index}`,
    ...repas,
  }))
  
  saveRepas(repasWithIds)
}

