'use client'

import { useEffect, useState, useCallback } from 'react'
import { getCourses, addCourse, updateCourse, deleteCourse, clearCourses } from '@/lib/storage'
import { CourseItem } from '@/lib/types'
import { useStorageSync } from '@/hooks/useStorageSync'

export default function ListeCourses() {
  const [courses, setCourses] = useState<CourseItem[]>([])
  const [newItem, setNewItem] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const loadCourses = useCallback(() => {
    const loadedCourses = getCourses().sort((a, b) => {
      if (a.achete !== b.achete) {
        return a.achete ? 1 : -1
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    setCourses(loadedCourses)
  }, [])

  // Synchroniser avec les changements de localStorage
  useStorageSync(loadCourses)

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  const handleAdd = () => {
    if (!newItem.trim()) return

    const course: CourseItem = {
      id: Date.now().toString(),
      nom: newItem.trim(),
      achete: false,
      createdAt: new Date().toISOString(),
    }
    addCourse(course)
    setNewItem('')
    loadCourses()
  }

  const handleToggle = (id: string) => {
    const course = courses.find(c => c.id === id)
    if (course) {
      updateCourse(id, { achete: !course.achete })
      loadCourses()
    }
  }

  const handleDelete = (id: string) => {
    deleteCourse(id)
    loadCourses()
  }

  const handleStartEdit = (id: string, currentNom: string) => {
    setEditingId(id)
    setEditValue(currentNom)
  }

  const handleSaveEdit = () => {
    if (editingId && editValue.trim()) {
      updateCourse(editingId, { nom: editValue.trim() })
      setEditingId(null)
      setEditValue('')
      loadCourses()
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const handleClear = () => {
    if (confirm('Êtes-vous sûr de vouloir vider toute la liste?')) {
      clearCourses()
      loadCourses()
    }
  }

  const handleClearAchetes = () => {
    if (confirm('Supprimer tous les articles achetés?')) {
      const achetés = courses.filter(c => c.achete).map(c => c.id)
      achetés.forEach(id => deleteCourse(id))
      loadCourses()
    }
  }

  const coursesAchetes = courses.filter(c => c.achete).length
  const coursesTotal = courses.length

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-6">
      {/* Formulaire d'ajout */}
      <div className="mb-4 sm:mb-6 flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd()
          }}
          placeholder="Ajouter un article..."
          className="flex-1 border border-gray-300 rounded px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-green-700 transition-colors text-sm sm:text-base"
        >
          Ajouter
        </button>
      </div>

      {/* Statistiques */}
      {coursesTotal > 0 && (
        <div className="mb-4 p-2 sm:p-3 bg-green-50 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-700">
            <span className="font-semibold">{coursesTotal - coursesAchetes}</span> article(s) à acheter
            {coursesAchetes > 0 && (
              <>
                {' • '}
                <span className="font-semibold text-green-600">{coursesAchetes}</span> article(s) acheté(s)
              </>
            )}
          </p>
        </div>
      )}

      {/* Liste */}
      {courses.length === 0 ? (
        <p className="text-gray-500 italic text-center py-8">
          La liste est vide. Ajoutez votre premier article ci-dessus!
        </p>
      ) : (
        <div className="space-y-2">
          {courses.map((course) => {
            const isEditing = editingId === course.id
            return (
              <div
                key={course.id}
                  className={`flex items-center gap-2 p-3 rounded border-2 transition-colors ${
                  course.achete
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-200 hover:border-green-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={course.achete}
                  onChange={() => handleToggle(course.id)}
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit()
                        if (e.key === 'Escape') handleCancelEdit()
                      }}
                      className="flex-1 border border-gray-300 rounded px-2 py-1"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="text-green-600 hover:text-green-800"
                    >
                      ✓
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`flex-1 ${
                        course.achete ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}
                    >
                      {course.nom}
                    </span>
                    <button
                      onClick={() => handleStartEdit(course.id, course.nom)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Boutons d'action */}
      {courses.length > 0 && (
        <div className="mt-6 flex gap-2 justify-end">
          {coursesAchetes > 0 && (
            <button
              onClick={handleClearAchetes}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Supprimer les articles achetés
            </button>
          )}
          <button
            onClick={handleClear}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Vider la liste
          </button>
        </div>
      )}
    </div>
  )
}

