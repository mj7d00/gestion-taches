import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AddTaskPage from './pages/AddTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ajouter" element={<AddTaskPage />} />
          <Route path="/modifier/:id" element={<EditTaskPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© 2025 Gestion de Tâches — MSID 2025-2026</p>
      </footer>
    </div>
  )
}

export default App
