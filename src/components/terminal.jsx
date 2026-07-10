import { useState, useRef, useEffect } from 'react'

const commands = {
  help: () => [
    'Available commands:',
    '  about      - learn more about me',
    '  skills     - see my technical skills',
    '  projects   - jump to my projects',
    '  contact    - jump to contact section',
    '  github     - open my GitHub profile',
    '  clear      - clear the terminal',
    '  whoami     - who am I?'
  ],
  about: () => [
    'Phumin So — Software Engineering Student',
    'I build full-stack web applications using React, Node.js, and MongoDB.',
    'Type "scroll about" to jump to the full section.'
  ],
  whoami: () => ['phumin@portfolio: Software Engineering Student / Full-Stack Developer'],
  skills: () => ['React, Node.js/Express, MongoDB, Java, C/C++, JavaScript (ES6+), Git, HTML/CSS'],
  github: () => {
    window.open('https://github.com/Faid00/final-project-portfolio', '_blank')
    return ['Opening GitHub...']
  },
  projects: () => {
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
    return ['Scrolling to projects...']
  },
  contact: () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    return ['Scrolling to contact...']
  }
}

function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome. Type "help" to see available commands.' }
  ])
  const [input, setInput] = useState('')
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return

    if (trimmed === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    const newEntry = { type: 'command', text: trimmed }
    let output

    if (commands[trimmed]) {
      output = commands[trimmed]()
    } else {
      output = [`command not found: ${trimmed} (type "help" for a list)`]
    }

    setHistory((prev) => [
      ...prev,
      newEntry,
      ...output.map((line) => ({ type: 'output', text: line }))
    ])
    setInput('')
  }

  return (
    <div className="fake-terminal">
      <div className="fake-terminal-header">
        <span className="status-dot"></span>
        <span className="fake-terminal-title">404: sleep not found</span>
      </div>
      <div className="fake-terminal-body" ref={bodyRef}>
        {history.map((entry, i) => (
          <div key={i} className={entry.type === 'command' ? 'terminal-line command' : 'terminal-line'}>
            {entry.type === 'command' ? `> ${entry.text}` : entry.text}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span>&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal command input"
          />
        </form>
      </div>
    </div>
  )
}

export default Terminal