import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TaskCard from '../components/TaskCard'
import { getTasks, deleteTask } from '../api/tasksApi'

const FILTERS = ['Toutes', 'À faire', 'En cours', 'Terminé']

export default function HomePage() {
  const [tasks, setTasks]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [filter, setFilter]         = useState('Toutes')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting]     = useState(false)

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [])

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteTask(deleteTarget.id)
      setTasks(prev => prev.filter(t => t.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const filtered = filter === 'Toutes'
    ? tasks
    : tasks.filter(t => t.statut === filter)

  const counts = {
    total:   tasks.length,
    todo:    tasks.filter(t => t.statut === 'À faire').length,
    doing:   tasks.filter(t => t.statut === 'En cours').length,
    done:    tasks.filter(t => t.statut === 'Terminé').length,
  }

  return (
    <>
      <div className="page-header">
        <h1>Mes Tâches</h1>
        <p>Gérez et suivez l'avancement de toutes vos tâches.</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card total">
          <span className="stat-icon"></span>
          <div>
            <div className="stat-value">{counts.total}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
        <div className="stat-card todo">
          <span className="stat-icon"></span>
          <div>
            <div className="stat-value">{counts.todo}</div>
            <div className="stat-label">À faire</div>
          </div>
        </div>
        <div className="stat-card doing">
          <span className="stat-icon"></span>
          <div>
            <div className="stat-value">{counts.doing}</div>
            <div className="stat-label">En cours</div>
          </div>
        </div>
        <div className="stat-card done">
          <span className="stat-icon"></span>
          <div>
            <div className="stat-value">{counts.done}</div>
            <div className="stat-label">Terminées</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button
            onClick={fetchTasks}
            style={{ marginLeft: 'auto', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}
          >
            Réessayer
          </button>
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <div className="filter-bar">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== 'Toutes' && (
                <span style={{ marginLeft: '0.3rem', opacity: .75 }}>
                  ({f === 'À faire' ? counts.todo : f === 'En cours' ? counts.doing : counts.done})
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="loading-wrapper">
          <div className="spinner" />
          <p>Chargement des tâches...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h3>Aucune tâche pour l'instant</h3>
          <p>Commencez par créer votre première tâche !</p>
          <Link to="/ajouter" className="btn btn-primary btn-lg">
            Créer une tâche
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h3>Aucune tâche « {filter} »</h3>
          <p>Modifiez le filtre ou créez une nouvelle tâche.</p>
          <button className="btn btn-ghost" onClick={() => setFilter('Toutes')}>
            Voir toutes les tâches
          </button>
        </div>
      ) : (
        <div className="task-grid">
          {filtered.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="overlay" onClick={() => setDeleteTarget(null)}>
          <div className="dialog" onClick={e => e.stopPropagation()}>
            <h3>Confirmer la suppression</h3>
            <p>
              Voulez-vous vraiment supprimer la tâche{' '}
              <strong>« {deleteTarget.titre} »</strong> ?
              Cette action est irréversible.
            </p>
            <div className="dialog-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Annuler
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}