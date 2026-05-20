const BASE_URL = 'http://localhost:3001/tasks'

export async function getTasks() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Impossible de récupérer les tâches.')
  return res.json()
}


export async function getTaskById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error(`Tâche #${id} introuvable.`)
  return res.json()
}


export async function createTask(task) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
  if (!res.ok) throw new Error("Impossible de créer la tâche.")
  return res.json()
}


export async function updateTask(id, task) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
  if (!res.ok) throw new Error("Impossible de mettre à jour la tâche.")
  return res.json()
}


export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error("Impossible de supprimer la tâche.")
}
