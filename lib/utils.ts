export const formatDate = (date: Date): string => {
  // Utiliser les méthodes locales pour éviter les problèmes de fuseau horaire
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatDateDisplay = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getWeekNumber = (date: Date): string => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`
}

export const getCurrentWeek = (): string => {
  return getWeekNumber(new Date())
}

export const getDaysInMonth = (year: number, month: number): Date[] => {
  const days: Date[] = []
  const date = new Date(year, month, 1)
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

export const isToday = (dateString: string): boolean => {
  return formatDate(new Date()) === dateString
}

export const isThisWeek = (weekString: string): boolean => {
  return getCurrentWeek() === weekString
}

// Fonction pour obtenir le lundi de la semaine d'une date
export const getMondayOfWeek = (date: Date): Date => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Ajuster pour que lundi = 1
  const monday = new Date(d.getFullYear(), d.getMonth(), diff)
  return monday
}

// Formater une date en "DD-mois" (ex: "11-août")
export const formatWeekDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleDateString('fr-FR', { month: 'long' })
  // Convertir le nom complet du mois en abréviation
  const monthAbbr: Record<string, string> = {
    'janvier': 'janv',
    'février': 'févr',
    'mars': 'mars',
    'avril': 'avr',
    'mai': 'mai',
    'juin': 'juin',
    'juillet': 'juillet',
    'août': 'août',
    'septembre': 'sept',
    'octobre': 'oct',
    'novembre': 'nov',
    'décembre': 'déc',
  }
  return `${day}-${monthAbbr[month.toLowerCase()] || month}`
}

// Obtenir la date du lundi de la semaine actuelle au format "DD-mois"
export const getCurrentWeekDate = (): string => {
  const monday = getMondayOfWeek(new Date())
  return formatWeekDate(monday)
}

// Vérifier si une semaine (format "DD-mois") correspond à la semaine actuelle
export const isCurrentWeekDate = (weekDate: string): boolean => {
  try {
    const [day, month] = weekDate.split('-')
    const currentMonday = getMondayOfWeek(new Date())
    const currentWeekDate = formatWeekDate(currentMonday)
    return currentWeekDate === weekDate
  } catch {
    return false
  }
}

// Parser une date "DD-mois" en Date (pour le tri)
export const parseWeekDate = (weekDate: string): Date | null => {
  try {
    const [day, month] = weekDate.split('-')
    const monthMap: Record<string, number> = {
      'janvier': 0, 'janv': 0,
      'février': 1, 'févr': 1,
      'mars': 2,
      'avril': 3, 'avr': 3,
      'mai': 4,
      'juin': 5,
      'juillet': 6,
      'août': 7,
      'septembre': 8, 'sept': 8,
      'octobre': 9, 'oct': 9,
      'novembre': 10, 'nov': 10,
      'décembre': 11, 'déc': 11,
    }
    const monthIndex = monthMap[month.toLowerCase()]
    if (monthIndex === undefined) return null
    
    const currentYear = new Date().getFullYear()
    return new Date(currentYear, monthIndex, parseInt(day))
  } catch {
    return null
  }
}

