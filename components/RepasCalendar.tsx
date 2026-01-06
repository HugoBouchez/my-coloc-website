'use client'

import { useEffect, useState, useCallback } from 'react'
import { getRepas, addRepas, updateRepas, deleteRepas } from '@/lib/storage'
import { Repas } from '@/lib/types'
import { formatDate, formatDateDisplay, getDaysInMonth, isToday } from '@/lib/utils'
import { useStorageSync } from '@/hooks/useStorageSync'
import { initializeRepas, migrateFridayToMonday } from '@/lib/initRepas'

export default function RepasCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [repas, setRepas] = useState<Repas[]>([])
  const [editingRepas, setEditingRepas] = useState<Repas | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalDate, setModalDate] = useState<string>('')
  const [modalCuisinier, setModalCuisinier] = useState('')

  const loadRepas = useCallback(() => {
    setRepas(getRepas())
  }, [])

  // Synchroniser avec les changements de localStorage
  useStorageSync(loadRepas)

  useEffect(() => {
    // Migrer les repas du vendredi au lundi suivant
    migrateFridayToMonday()
    // Initialiser les données si elles n'existent pas
    initializeRepas()
    loadRepas()
  }, [loadRepas])

  const handleMonthChange = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1))
  }

  const handleDayClick = (date: Date) => {
    const dateStr = formatDate(date)
    const existingRepas = repas.find(r => r.date === dateStr)
    
    if (existingRepas) {
      setEditingRepas(existingRepas)
      setModalDate(dateStr)
      setModalCuisinier(existingRepas.cuisinier)
    } else {
      setEditingRepas(null)
      setModalDate(dateStr)
      setModalCuisinier('')
    }
    setShowModal(true)
  }

  const handleSave = () => {
    if (!modalDate || !modalCuisinier.trim()) {
      alert('Veuillez remplir tous les champs')
      return
    }

    if (editingRepas) {
      updateRepas(editingRepas.id, {
        date: modalDate,
        cuisinier: modalCuisinier.trim(),
      })
    } else {
      const newRepas: Repas = {
        id: Date.now().toString(),
        date: modalDate,
        cuisinier: modalCuisinier.trim(),
      }
      addRepas(newRepas)
    }
    
    loadRepas()
    setShowModal(false)
    setEditingRepas(null)
  }

  const handleDelete = () => {
    if (editingRepas && confirm('Êtes-vous sûr de vouloir supprimer ce repas?')) {
      deleteRepas(editingRepas.id)
      loadRepas()
      setShowModal(false)
      setEditingRepas(null)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingRepas(null)
    setModalDate('')
    setModalCuisinier('')
  }

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
  const monthName = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  
  // Calculer le jour de la semaine du premier jour (0 = dimanche, 1 = lundi, etc.)
  // On ajuste pour que lundi = 0
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7 // Convertir dimanche=0 à lundi=0
  const emptyDays = Array(firstDayOfWeek).fill(null)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Contrôles du mois */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => handleMonthChange(-1)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors shadow-md"
        >
          ← Mois précédent
        </button>
        <h2 className="text-2xl font-bold capitalize">{monthName}</h2>
        <button
          onClick={() => handleMonthChange(1)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors shadow-md"
        >
          Mois suivant →
        </button>
      </div>

      {/* Calendrier */}
      <div className="grid grid-cols-7 gap-2">
        {/* En-têtes des jours */}
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
          <div key={day} className="font-semibold text-center py-2 bg-gray-100 rounded">
            {day}
          </div>
        ))}

        {/* Jours vides au début */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="min-h-24 border-2 border-transparent rounded p-2" />
        ))}

        {/* Jours du mois */}
        {days.map((day) => {
          const dateStr = formatDate(day)
          const repasDuJour = repas.find(r => r.date === dateStr)
          const isTodayDate = isToday(dateStr)

          return (
            <div
              key={dateStr}
              onClick={() => handleDayClick(day)}
              className={`min-h-24 border-2 rounded p-2 cursor-pointer transition-colors ${
                isTodayDate
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold mb-1">
                {day.getDate()}
                {isTodayDate && <span className="ml-1 text-xs text-green-600">(Aujourd&apos;hui)</span>}
              </div>
              {repasDuJour && (
                <div className="text-sm text-gray-700 mt-1">
                  <div className="font-medium">🍽️ {repasDuJour.cuisinier}</div>
                </div>
              )}
              {!repasDuJour && (
                <div className="text-xs text-gray-400 mt-1">Cliquer pour ajouter</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Modal pour ajouter/modifier */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">
              {editingRepas ? 'Modifier le repas' : 'Ajouter un repas'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={modalDate}
                  onChange={(e) => setModalDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Qui cuisine</label>
                <input
                  type="text"
                  value={modalCuisinier}
                  onChange={(e) => setModalCuisinier(e.target.value)}
                  placeholder="Nom du cuisinier"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  {editingRepas ? 'Modifier' : 'Ajouter'}
                </button>
                {editingRepas && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Supprimer
                  </button>
                )}
                <button
                  onClick={handleCloseModal}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

