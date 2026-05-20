import { useNavigate } from 'react-router-dom'

const STATUS_CONFIG = {
  'À faire':  { cls: 'badge-todo' },
  'En cours': { cls: 'badge-doing' },
  'Terminé':  { cls: 'badge-done' },
}

export default function TaskCard({ task, onDelete }) {
  const navigate = useNavigate()
  const status = STATUS_CONFIG[task.statut] || { cls: 'badge-todo' }

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-card-title">{task.titre}</h3>
      </div>

      <p className="task-card-description">
        {task.description || <em style={{ color: 'var(--gray-400)' }}>Aucune description</em>}
      </p>

      <div className="task-card-footer">
        <span className={`badge ${status.cls}`}>
          {task.statut}
        </span>

        <div className="task-actions">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => navigate(`/modifier/${task.id}`)}
          >
            Modifier
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(task)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}