export default function AidePage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">📖 Guide d&apos;utilisation</h1>
      
      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Dashboard</h2>
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          Le dashboard affiche automatiquement les informations importantes du jour :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
          <li><strong>Repas à venir</strong> : Affiche les repas d&apos;aujourd&apos;hui et de demain avec le nom du cuisinier</li>
          <li><strong>Tâches prioritaires</strong> : Liste les tâches prévues aujourd&apos;hui et cette semaine</li>
        </ul>
        <p className="text-gray-600 mt-4 text-sm italic">
          💡 Le dashboard se met à jour automatiquement. Utilisez le bouton &quot;Actualiser&quot; pour forcer une mise à jour.
        </p>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Tâches de la semaine</h2>
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          Organisez les tâches ménagères par semaine :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
          <li>Cliquez sur <strong>&quot;Ajouter une semaine&quot;</strong> pour créer une nouvelle entrée (format: YYYY-WW, ex: 2024-W15)</li>
          <li>Cliquez sur l&apos;icône ✏️ dans une cellule pour modifier son contenu</li>
          <li>La semaine en cours est mise en évidence en jaune</li>
          <li>Utilisez le bouton <strong>&quot;Supprimer&quot;</strong> pour retirer une semaine</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Repas</h2>
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          Planifiez les repas du mois :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
          <li>Cliquez sur un jour du calendrier pour ajouter ou modifier un repas</li>
          <li>Indiquez qui cuisine ce jour-là</li>
          <li>Utilisez les flèches pour naviguer entre les mois</li>
          <li>Le jour actuel est mis en évidence en bleu</li>
        </ul>
      </section>

      <section className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Courses</h2>
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          Liste collaborative des courses :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
          <li>Tapez un article dans le champ et appuyez sur <strong>&quot;Ajouter&quot;</strong> ou Entrée</li>
          <li>Cochez la case pour marquer un article comme acheté</li>
          <li>Cliquez sur ✏️ pour modifier le nom d&apos;un article</li>
          <li>Cliquez sur 🗑️ pour supprimer un article</li>
          <li>Utilisez <strong>&quot;Supprimer les articles achetés&quot;</strong> pour nettoyer la liste</li>
          <li>Utilisez <strong>&quot;Vider la liste&quot;</strong> pour tout supprimer</li>
        </ul>
      </section>

      <section className="mb-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">💾 Stockage des données</h2>
        <p className="text-gray-700">
          Toutes les données sont stockées localement dans votre navigateur. Cela signifie que :
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
          <li>Les données sont partagées entre tous les onglets ouverts</li>
          <li>Les modifications sont synchronisées en temps réel</li>
          <li>Les données persistent après fermeture du navigateur</li>
          <li>⚠️ Si vous supprimez les données du navigateur, toutes les informations seront perdues</li>
        </ul>
      </section>

      <section className="bg-yellow-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">⚠️ Important</h2>
        <p className="text-gray-700">
          Tous les utilisateurs peuvent modifier toutes les données. Faites attention à ne pas supprimer accidentellement des informations importantes !
        </p>
      </section>
    </div>
  )
}

