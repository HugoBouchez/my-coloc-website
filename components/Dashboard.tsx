'use client'

import { useEffect, useState, useCallback } from 'react'
import { getRepas, getTaches, updateRepas } from '@/lib/storage'
import { Repas, TacheSemaine } from '@/lib/types'
import { formatDate, formatDateDisplay, getCurrentWeek, isToday, isThisWeek, isCurrentWeekDate } from '@/lib/utils'
import { useStorageSync } from '@/hooks/useStorageSync'
import Link from 'next/link'

// Liste des personnes de la coloc
const PERSONNES_COLOC = ['Sara', 'Will', 'Nicks', 'Justine', 'Hugo', 'Amélie', 'Dorian', 'William']

export default function Dashboard() {
  const [repasAujourdhui, setRepasAujourdhui] = useState<Repas | null>(null)
  const [repasDemain, setRepasDemain] = useState<Repas | null>(null)
  const [tachesAujourdhui, setTachesAujourdhui] = useState<TacheSemaine[]>([])
  const [tachesCetteSemaine, setTachesCetteSemaine] = useState<TacheSemaine[]>([])

  const loadData = useCallback(() => {
    const today = formatDate(new Date())
    const tomorrow = formatDate(new Date(Date.now() + 86400000))
    const currentWeek = getCurrentWeek()

    const repas = getRepas()
    const repasAuj = repas.find(r => isToday(r.date))
    const repasDem = repas.find(r => r.date === tomorrow)

    setRepasAujourdhui(repasAuj || null)
    setRepasDemain(repasDem || null)

    const taches = getTaches()
    const tachesAuj = taches.filter(t => isCurrentWeekDate(t.semaine))
    const tachesSem = taches.filter(t => isCurrentWeekDate(t.semaine))

    setTachesAujourdhui(tachesAuj)
    setTachesCetteSemaine(tachesSem)
  }, [])

  // Synchroniser avec les changements de localStorage
  useStorageSync(loadData)

  useEffect(() => {
    loadData()
    // Recharger toutes les minutes pour mettre à jour automatiquement
    const interval = setInterval(loadData, 60000)
    // Recharger quand la fenêtre redevient visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadData()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [loadData])

  return (
    <div className="space-y-8">
      {/* Bouton de rafraîchissement */}
      <div className="flex justify-end">
        <button
          onClick={loadData}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
        >
          🔄 Actualiser
        </button>
      </div>

      {/* Repas à venir */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">🍽️ Repas à venir</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Repas aujourd'hui */}
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <h3 className="font-semibold text-lg mb-2">Aujourd'hui</h3>
            {repasAujourdhui ? (
              <div>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Date:</span> {formatDateDisplay(repasAujourdhui.date)}
                </p>
                <p className="text-gray-700 mb-3">
                  <span className="font-medium">Cuisine:</span> {repasAujourdhui.cuisinier}
                </p>
                <div className="mt-3 mb-3">
                  <p className="font-medium text-sm mb-2">Qui mange ?</p>
                  <div className="space-y-1">
                    {PERSONNES_COLOC.map((personne) => {
                      const isPresent = repasAujourdhui.personnesPresentes?.includes(personne) || false
                      return (
                        <label key={personne} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isPresent}
                            onChange={(e) => {
                              const nouvellesPersonnes = e.target.checked
                                ? [...(repasAujourdhui.personnesPresentes || []), personne]
                                : (repasAujourdhui.personnesPresentes || []).filter(p => p !== personne)
                              updateRepas(repasAujourdhui.id, { personnesPresentes: nouvellesPersonnes })
                              loadData()
                            }}
                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm">{personne}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
                <Link
                  href="/repas"
                  className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                >
                  Modifier le repas
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 italic">Aucun repas prévu aujourd'hui</p>
                <Link
                  href="/repas"
                  className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Ajouter un repas
                </Link>
              </div>
            )}
          </div>

          {/* Repas demain */}
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <h3 className="font-semibold text-lg mb-2">Demain</h3>
            {repasDemain ? (
              <div>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Date:</span> {formatDateDisplay(repasDemain.date)}
                </p>
                <p className="text-gray-700 mb-3">
                  <span className="font-medium">Cuisine:</span> {repasDemain.cuisinier}
                </p>
                <div className="mt-3 mb-3">
                  <p className="font-medium text-sm mb-2">Qui mange ?</p>
                  <div className="space-y-1">
                    {PERSONNES_COLOC.map((personne) => {
                      const isPresent = repasDemain.personnesPresentes?.includes(personne) || false
                      return (
                        <label key={personne} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isPresent}
                            onChange={(e) => {
                              const nouvellesPersonnes = e.target.checked
                                ? [...(repasDemain.personnesPresentes || []), personne]
                                : (repasDemain.personnesPresentes || []).filter(p => p !== personne)
                              updateRepas(repasDemain.id, { personnesPresentes: nouvellesPersonnes })
                              loadData()
                            }}
                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm">{personne}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
                <Link
                  href="/repas"
                  className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                >
                  Modifier le repas
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 italic">Aucun repas prévu demain</p>
                <Link
                  href="/repas"
                  className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Ajouter un repas
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tâches prioritaires */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">✅ Tâches prioritaires</h2>
        {tachesCetteSemaine.length > 0 ? (
          <div>
            <h3 className="font-semibold text-lg mb-4 text-green-600">Tâches de la semaine ({tachesCetteSemaine[0]?.semaine})</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PERSONNES_COLOC.map((personne) => {
                // Trouver toutes les tâches assignées à cette personne cette semaine
                const tachesPersonne: Array<{ tache: string; label: string }> = []
                
                tachesCetteSemaine.forEach((tache) => {
                  const labels: Record<string, string> = {
                    poubelles: '🗑️ Poubelles',
                    commun: '🏠 Commun',
                    cuisine: '🍳 Cuisine',
                    frigo: '❄️ Frigo',
                    coursesEssuies: '🛒 Courses + essuies',
                    surprise: '🎁 Surprise',
                    vidanges: '💧 Vidanges',
                  }
                  
                  Object.entries(tache)
                    .filter(([key]) => key !== 'id' && key !== 'semaine')
                    .filter(([, value]) => value === personne)
                    .forEach(([key, value]) => {
                      tachesPersonne.push({
                        tache: key,
                        label: labels[key] || key
                      })
                    })
                })

                return (
                  <div key={personne} className="bg-green-50 border border-green-200 rounded p-3">
                    <h4 className="font-semibold text-base mb-2 text-green-700">{personne}</h4>
                    {tachesPersonne.length > 0 ? (
                      <div className="space-y-1">
                        {tachesPersonne.map((item) => (
                          <div key={item.tache} className="text-sm text-gray-700">
                            {item.label}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">Aucune tâche</p>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-4">
              <Link
                href="/taches"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
              >
                Voir toutes les tâches
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 italic">Aucune tâche prévue cette semaine</p>
            <Link
              href="/taches"
              className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Ajouter des tâches
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

