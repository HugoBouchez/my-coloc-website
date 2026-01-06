export interface Repas {
  id: string
  date: string // Format: YYYY-MM-DD
  cuisinier: string
  personnesPresentes?: string[] // Liste des personnes qui mangent ce jour
}

export interface TacheSemaine {
  id: string
  semaine: string // Format: "YYYY-WW" (année-semaine)
  poubelles?: string
  commun?: string
  cuisine?: string
  frigo?: string
  coursesEssuies?: string
  surprise?: string
  vidanges?: string
}

export interface CourseItem {
  id: string
  nom: string
  achete: boolean
  createdAt: string
}

