import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getTaskById, updateTask } from '../api/tasksApi'

const STATUTS = ['À faire', 'En cours', 'Terminé']

export default function EditTaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm]             = useState({ titre: '', description: '', statut: 'À faire' })
  const [errors, setErrors]         = useState({})
  const [loading, setLoading]       = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError]     = useState(null)
  const [success, setSuccess]       = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true)
      setApiError(null)
      try {
        const task = await getTaskById(id)
        setForm({
          titre:       task.titre       || '',
          description: task.description || '',
          statut:      task.statut      || 'À faire',
        })
      } catch (err) {
        setApiError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTask()
  }, [id])

  const validate = () => {
    const errs = {}
    if (!form.titre.trim()) errs.titre = 'Le titre est obligatoire.'
    if (form.titre.trim().length > 100) errs.titre = 'Le titre ne doit pas dépasser 100 caractères.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)
    setApiError(null)
    try {
      await updateTask(id, {
        titre:       form.titre.trim(),
        description: form.description.trim(),
        statut:      form.statut,
      })
      setSuccess(true)
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner" />
        <p>Chargement de la tâche...</p>
      </div>
    )
  }

  return (
    <>
      <div className="page-header">
        <h1>Modifier la Tâche</h1>
        <p>Mettez à jour les informations de la tâche ci-dessous.</p>
      </div>

      <div className="form-card">
        {apiError && <div className="alert alert-error">{apiError}</div>}
        {success  && <div className="alert alert-success">Tâche mise à jour ! Redirection...</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="titre">
              Titre <span className="required">*</span>
            </label>
            <input
              id="titre"
              name="titre"
              type="text"
              className={`form-control ${errors.titre ? 'error' : ''}`}
              placeholder="Ex. : Apprendre React"
              value={form.titre}
              onChange={handleChange}
              maxLength={100}
              disabled={submitting || success}
              autoFocus
            />
            {errors.titre && (
              <p className="form-error">{errors.titre}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description{' '}
              <small style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(optionnelle)</small>
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Décrivez votre tâche..."
              value={form.description}
              onChange={handleChange}
              disabled={submitting || success}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="statut">Statut</label>
            <select
              id="statut"
              name="statut"
              className="form-control"
              value={form.statut}
              onChange={handleChange}
              disabled={submitting || success}
            >
              {STATUTS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <Link to="/" className="btn btn-ghost">
              Annuler
            </Link>
            <button
              type="submit"
              className="btn btn-warning"
              disabled={submitting || success}
            >
              {submitting ? 'Mise à jour...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}