import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Projects from './components/Projects'
import './App.css'
import ContactForm from './components/contactform'
import Education from './components/education'
import Admin from './components/admin'
import Login from './components/login'

function App() {
  const [isPhoneView, setIsPhoneView] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'))

  return (
    <Routes>
      <Route path="/" element={
        <div className={`terminal-theme ${isPhoneView ? 'phone-view' : 'pc-view'}`}>
          <nav className="navbar">
            <div className="navbar-left">
              <button 
                className={`view-toggle ${isPhoneView ? 'active' : ''}`}
                onClick={() => setIsPhoneView(!isPhoneView)}
                title={isPhoneView ? 'Switch to PC View' : 'Switch to Phone View'}
              >
                {isPhoneView ? 'Phone' : 'PC'}
              </button>
              <span className="nav-logo">phumin@portfolio:~$</span>
            </div>
            <ul className="nav-links">
              <li><a href="#about">about</a></li>
              <li><a href="#skills">skills</a></li>
              <li><a href="#projects">projects</a></li>
              <li><a href="#contact">contact</a></li>
              <li><a href="/login">admin</a></li>
            </ul>
          </nav>

          <section id="hero">
            <p className="prompt-line">&gt; whoami</p>
            <h1>Phumin So</h1>
            <p className="subtitle">Software Engineering Student / Full-Stack Developer</p>
            <p className="hero-desc">
              I build full-stack web applications using React, Node.js, and MongoDB,
              with a focus on clean, functional design.
            </p>
            <a href="#projects" className="cta-button">./view_projects</a>
          </section>

          <section id="about">
            <p className="prompt-line">&gt; cat about.txt</p>
            <h2>About Me</h2>
            <p className="about-text">
              I'm an undergraduate student studying Software Engineering, with coursework
              spanning full-stack web development, Java OOP, and C/C++. I enjoy building
              practical applications and learning by doing — from websites and game development to
              full-stack portfolio projects like this one.
            </p>
            <Education />
          </section>

          <section id="skills">
            <p className="prompt-line">&gt; ls skills/</p>
            <h2>Technical Skills</h2>
            <div className="skills-grid">
              <div className="skill-card">React</div>
              <div className="skill-card">Node.js / Express</div>
              <div className="skill-card">MongoDB</div>
              <div className="skill-card">Java</div>
              <div className="skill-card">C / C++</div>
              <div className="skill-card">JavaScript (ES6+)</div>
              <div className="skill-card">Git / GitHub</div>
              <div className="skill-card">HTML / CSS</div>
            </div>
          </section>

          <section id="projects-section">
            <p className="prompt-line">&gt; ls projects/</p>
            <Projects />
          </section>

          <section id="contact">
            <p className="prompt-line">&gt; ./contact_me.sh</p>
            <h2>Contact</h2>
            <p>Have a project idea or want to collaborate? Send a message and I&apos;ll get back to you.</p>
            <ContactForm />
          </section>
        </div>
      } />

      <Route path="/login" element={
        <div className="terminal-theme">
          <Login onLogin={() => setIsAuthenticated(true)} />
        </div>
      } />

      <Route path="/admin" element={
        isAuthenticated ? (
          <div className="terminal-theme">
            <Admin />
          </div>
        ) : (
          <Navigate to="/login" replace />
        )
      } />
    </Routes>
  )
}

export default App