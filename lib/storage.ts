import { Repas, TacheSemaine, CourseItem } from './types'

const STORAGE_KEYS = {
  REPAS: 'coloc_repas',
  TACHES: 'coloc_taches',
  COURSES: 'coloc_courses',
}

// Fonctions pour les repas
export const getRepas = (): Repas[] => {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.REPAS)
  return data ? JSON.parse(data) : []
}

export const saveRepas = (repas: Repas[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.REPAS, JSON.stringify(repas))
  // Déclencher un événement personnalisé pour synchroniser dans le même onglet
  window.dispatchEvent(new Event('coloc-storage-change'))
}

export const addRepas = (repas: Repas): void => {
  const repasList = getRepas()
  repasList.push(repas)
  saveRepas(repasList)
}

export const updateRepas = (id: string, updates: Partial<Repas>): void => {
  const repasList = getRepas()
  const index = repasList.findIndex(r => r.id === id)
  if (index !== -1) {
    repasList[index] = { ...repasList[index], ...updates }
    saveRepas(repasList)
  }
}

export const deleteRepas = (id: string): void => {
  const repasList = getRepas()
  const filtered = repasList.filter(r => r.id !== id)
  saveRepas(filtered)
}

// Fonctions pour les tâches
export const getTaches = (): TacheSemaine[] => {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.TACHES)
  return data ? JSON.parse(data) : []
}

export const saveTaches = (taches: TacheSemaine[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.TACHES, JSON.stringify(taches))
  // Déclencher un événement personnalisé pour synchroniser dans le même onglet
  window.dispatchEvent(new Event('coloc-storage-change'))
}

export const addTache = (tache: TacheSemaine): void => {
  const tachesList = getTaches()
  tachesList.push(tache)
  saveTaches(tachesList)
}

export const updateTache = (id: string, updates: Partial<TacheSemaine>): void => {
  const tachesList = getTaches()
  const index = tachesList.findIndex(t => t.id === id)
  if (index !== -1) {
    tachesList[index] = { ...tachesList[index], ...updates }
    saveTaches(tachesList)
  }
}

export const deleteTache = (id: string): void => {
  const tachesList = getTaches()
  const filtered = tachesList.filter(t => t.id !== id)
  saveTaches(filtered)
}

// Fonctions pour les courses
export const getCourses = (): CourseItem[] => {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEYS.COURSES)
  return data ? JSON.parse(data) : []
}

export const saveCourses = (courses: CourseItem[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses))
  // Déclencher un événement personnalisé pour synchroniser dans le même onglet
  window.dispatchEvent(new Event('coloc-storage-change'))
}

export const addCourse = (course: CourseItem): void => {
  const coursesList = getCourses()
  coursesList.push(course)
  saveCourses(coursesList)
}

export const updateCourse = (id: string, updates: Partial<CourseItem>): void => {
  const coursesList = getCourses()
  const index = coursesList.findIndex(c => c.id === id)
  if (index !== -1) {
    coursesList[index] = { ...coursesList[index], ...updates }
    saveCourses(coursesList)
  }
}

export const deleteCourse = (id: string): void => {
  const coursesList = getCourses()
  const filtered = coursesList.filter(c => c.id !== id)
  saveCourses(filtered)
}

export const clearCourses = (): void => {
  saveCourses([])
}

