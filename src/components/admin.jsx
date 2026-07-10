import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://final-project-backend-env.eba-wffgrtjp.ap-southeast-2.elasticbeanstalk.com/api/projects'

const emptyForm = {
  title: '',
  description: '',
  problem: '',
  technologies: '',
  imageUrl: '',
  githubUrl: '',
  liveUrl: '',
  contribution: '',
  challenges: '',
  lessonsLearned: '',
  featured: false
}

function Admin() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Failed to fetch projects')
      const data = await res.json()
      setProjects(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function startEdit(project) {
    setEditingId(project._id)
    setFormData({
      title: project.title || '',
      description: project.description || '',
      problem: project.problem || '',
      technologies: (project.technologies || []).join(', '),
      imageUrl: project.imageUrl || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      contribution: project.contribution || '',
      challenges: project.challenges || '',
      lessonsLearned: project.lessonsLearned || '',
      featured: project.featured || false
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditingId(null)
    setFormData(emptyForm)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    const payload = {
      ...formData,
      technologies: formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    }

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Failed to save project')

      await fetchProjects()
      cancelEdit()
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project? This cannot be undone.')) return

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      if (!res.ok) throw new Error('Failed to delete project')
      await fetchProjects()
    } catch (err) {
      alert(err.message)
    }
  }

  function handleLogout() {
    localStorage.removeItem('adminToken')
    navigate('/login')
  }

  return (
    <div className="admin-page">
      <nav className="navbar">
        <div className="navbar-left">
          <span className="nav-logo">phumin@portfolio:~/admin$</span>
        </div>
        <ul className="nav-links">
          <li><a href="/">home</a></li>
          <li><button className="nav-link-button" onClick={handleLogout}>logout</button></li>
        </ul>
      </nav>

      <p className="prompt-line">&gt; sudo ./manage_projects.sh</p>
      <h1>Admin Dashboard</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>

        <div className="form-group">
          <label>Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea name="description" rows="3" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Problem it solves</label>
          <textarea name="problem" rows="2" value={formData.problem} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Technologies (comma separated)</label>
          <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>GitHub URL</label>
          <input type="text" name="githubUrl" value={formData.githubUrl} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Live URL</label>
          <input type="text" name="liveUrl" value={formData.liveUrl} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Your Contribution</label>
          <textarea name="contribution" rows="2" value={formData.contribution} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Challenges</label>
          <textarea name="challenges" rows="2" value={formData.challenges} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Lessons Learned</label>
          <textarea name="lessonsLearned" rows="2" value={formData.lessonsLearned} onChange={handleChange} />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
            {' '}Featured project
          </label>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="cta-button" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId && (
            <button type="button" className="cta-button-secondary" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        <h3>Existing Projects ({projects.length})</h3>
        {loading && <p>Loading...</p>}
        {error && <p className="form-error">{error}</p>}
        {!loading && !error && projects.map((project) => (
          <div className="admin-project-row" key={project._id}>
            <div>
              <p className="admin-project-title">{project.title}</p>
              <p className="admin-project-desc">{project.description}</p>
            </div>
            <div className="admin-project-actions">
              <button onClick={() => startEdit(project)}>Edit</button>
              <button onClick={() => handleDelete(project._id)} className="danger">Delete</button>
            </div>
          </div>
        ))}
        {!loading && !error && projects.length === 0 && <p>No projects yet.</p>}
      </div>
    </div>
  )
}

export default Admin