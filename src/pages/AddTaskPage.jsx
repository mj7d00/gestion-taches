import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createTask } from '../api/tasksApi'

const STATUTS = ['À faire', 'En cours', 'Terminé']

const initialForm = { titre: '', description: '', statut: 'À faire' }

export default function AddTaskPage() {
  const navigate = useNavigate()

  const [form, setForm]       = useState(initialForm)
  const [errors, setErrors]   = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError]     = useState(null)
  const [success, setSuccess]       = useState(false)

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
      await createTask({
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

  return (
    <>
      <div className="page-header">
        <h1>➕ Nouvelle Tâche</h1>
        <p>Remplissez le formulaire ci-dessous pour créer une nouvelle tâche.</p>
      </div>

      <div className="form-card">
        {apiError && <div className="alert alert-error">⚠️ {apiError}</div>}
        {success  && <div className="alert alert-success">✅ Tâche créée ! Redirection…</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Titre */}
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
              <p className="form-error">⚠️ {errors.titre}</p>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description <small style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(optionnelle)</small>
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Décrivez votre tâche…"
              value={form.description}
              onChange={handleChange}
              disabled={submitting || success}
              rows={4}
            />
          </div>

          {/* Statut */}
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

          {/* Actions */}
          <div className="form-actions">
            <Link to="/" className="btn btn-ghost">
              ← Annuler
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || success}
            >
              {submitting ? '⏳ Création…' : '✅ Créer la tâche'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
