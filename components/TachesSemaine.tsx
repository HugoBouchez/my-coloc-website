'use client'

import { useEffect, useState, useCallback } from 'react'
import { getTaches, addTache, updateTache, deleteTache } from '@/lib/storage'
import { TacheSemaine } from '@/lib/types'
import { getCurrentWeekDate, isCurrentWeekDate, parseWeekDate, getMondayOfWeek, formatWeekDate } from '@/lib/utils'
import { useStorageSync } from '@/hooks/useStorageSync'
import { initializeTaches } from '@/lib/initData'

const COLUMNS = [
  { key: 'poubelles', label: 'Poubelles' },
  { key: 'commun', label: 'Commun' },
  { key: 'cuisine', label: 'Cuisine' },
  { key: 'frigo', label: 'Frigo' },
  { key: 'coursesEssuies', label: 'Courses + essuies' },
  { key: 'surprise', label: 'Surprise' },
  { key: 'vidanges', label: 'Vidanges' },
]

export default function TachesSemaine() {
  const [taches, setTaches] = useState<TacheSemaine[]>([])
  const [editingCell, setEditingCell] = useState<{ id: string; column: string } | null>(null)
  const [editValue, setEditValue] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newWeekDate, setNewWeekDate] = useState('')

  const loadTaches = useCallback(() => {
    const loadedTaches = getTaches().sort((a, b) => {
      const dateA = parseWeekDate(a.semaine)
      const dateB = parseWeekDate(b.semaine)
      if (dateA && dateB) {
        return dateA.getTime() - dateB.getTime()
      }
      return a.semaine.localeCompare(b.semaine)
    })
    setTaches(loadedTaches)
  }, [])

  // Synchroniser avec les changements de localStorage
  useStorageSync(loadTaches)

  useEffect(() => {
    // Initialiser les données si elles n'existent pas
    initializeTaches()
    loadTaches()
  }, [loadTaches])

  const handleAddSemaine = () => {
    const defaultWeek = getCurrentWeekDate()
    setNewWeekDate(defaultWeek)
    setShowAddModal(true)
  }

  const handleSaveNewWeek = () => {
    if (!newWeekDate.trim()) {
      alert('Veuillez entrer une date')
      return
    }
    
    if (taches.find(t => t.semaine === newWeekDate.trim())) {
      alert('Cette semaine existe déjà!')
      return
    }

    const newTache: TacheSemaine = {
      id: Date.now().toString(),
      semaine: newWeekDate.trim(),
    }
    addTache(newTache)
    loadTaches()
    setShowAddModal(false)
    setNewWeekDate('')
  }

  const handleDateInputChange = (dateInput: string) => {
    // Si c'est une date au format YYYY-MM-DD, convertir en DD-mois
    if (dateInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const date = new Date(dateInput)
      const monday = getMondayOfWeek(date)
      setNewWeekDate(formatWeekDate(monday))
    } else {
      setNewWeekDate(dateInput)
    }
  }

  const handleEdit = (id: string, column: string, currentValue: string) => {
    setEditingCell({ id, column })
    setEditValue(currentValue || '')
  }

  const handleSave = () => {
    if (!editingCell) return

    const tache = taches.find(t => t.id === editingCell.id)
    if (tache) {
      const updates: any = { [editingCell.column]: editValue || undefined }
      updateTache(editingCell.id, updates)
      loadTaches()
    }
    setEditingCell(null)
    setEditValue('')
  }

  const handleCancel = () => {
    setEditingCell(null)
    setEditValue('')
  }

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette semaine?')) {
      deleteTache(id)
      loadTaches()
    }
  }

  const getCellValue = (tache: TacheSemaine, column: string): string => {
    const key = column as keyof TacheSemaine
    return tache[key] as string || ''
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Calendrier des tâches</h2>
        <button
          onClick={handleAddSemaine}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors shadow-md"
        >
          + Ajouter une semaine
        </button>
      </div>

      {/* Modal pour ajouter une semaine */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Ajouter une semaine</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date du lundi de la semaine
                </label>
                <input
                  type="date"
                  onChange={(e) => handleDateInputChange(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                />
                <p className="text-xs text-gray-500 mb-2">ou</p>
                <input
                  type="text"
                  value={newWeekDate}
                  onChange={(e) => setNewWeekDate(e.target.value)}
                  placeholder="Format: DD-mois (ex: 11-août)"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: DD-mois (ex: 11-août, 18-août, 25-août)
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNewWeek}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setNewWeekDate('')
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {taches.length === 0 ? (
        <p className="text-gray-500 italic text-center py-8">
          Aucune semaine ajoutée. Cliquez sur "Ajouter une semaine" pour commencer.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Semaine</th>
                {COLUMNS.map((col) => (
                  <th key={col.key} className="border border-gray-300 px-4 py-2 text-left">
                    {col.label}
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {taches.map((tache) => {
                const isCurrentWeek = isCurrentWeekDate(tache.semaine)
                return (
                  <tr
                    key={tache.id}
                    className={isCurrentWeek ? 'bg-yellow-50' : ''}
                  >
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {tache.semaine}
                      {isCurrentWeek && (
                        <span className="ml-2 text-xs bg-yellow-400 px-2 py-1 rounded">
                          Semaine en cours
                        </span>
                      )}
                    </td>
                    {COLUMNS.map((col) => {
                      const isEditing = editingCell?.id === tache.id && editingCell?.column === col.key
                      return (
                        <td 
                          key={col.key} 
                          className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            if (!isEditing) {
                              handleEdit(tache.id, col.key, getCellValue(tache, col.key))
                            }
                          }}
                        >
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 border border-gray-300 rounded px-2 py-1"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSave()
                                  if (e.key === 'Escape') handleCancel()
                                }}
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSave()
                                }}
                                className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
                              >
                                ✓
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCancel()
                                }}
                                className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span>{getCellValue(tache, col.key) || '-'}</span>
                          )}
                        </td>
                      )
                    })}
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleDelete(tache.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

