import { useState } from 'react'
import BuggyEffectLoop from './caso1-useEffect/BuggyEffectLoop.jsx';
import FixedEffectLoop from './caso1-useEffect/FixedEffectLoop.jsx';
import BuggyRerender from './caso2-too-many-rerenders/BuggyRerender.jsx';
import FixedRerender from './caso2-too-many-rerenders/FixedRerender.jsx';
import './App.css'

function App() {
  const [case1Mode, setCase1Mode] = useState('fixed'); // 'fixed' o 'buggy' puede ser cualquier estado
  const [case2Mode, setCase2Mode] = useState('fixed'); // 'fixed' o 'buggy' puede ser cualquier estado

  return (
    
     <div className="app">
      <h1>Taller de Bucles Infinitos en React</h1>

      <section className="case-section">
        <h2>Caso 1 · Bucle infinito mediante useEffect</h2>
        <div className="toggle-buttons">
          <button
            className={case1Mode === 'fixed' ? 'active' : ''}
            onClick={() => setCase1Mode('fixed')}
          >
            Ver versión corregida
          </button>
          <button
            className={case1Mode === 'buggy' ? 'active danger' : 'danger'}
            onClick={() => setCase1Mode('buggy')}
          >
            Ver versión con error
          </button>
        </div>
        {case1Mode === 'fixed' ? <FixedEffectLoop /> : <BuggyEffectLoop />}
      </section>

      <section className="case-section">
        <h2>Caso 2 · Error "Too many re-renders"</h2>
        <div className="toggle-buttons">
          <button
            className={case2Mode === 'fixed' ? 'active' : ''}
            onClick={() => setCase2Mode('fixed')}
          >
            Ver versión corregida
          </button>
          <button
            className={case2Mode === 'buggy' ? 'active danger' : 'danger'}
            onClick={() => setCase2Mode('buggy')}
          >
            Ver versión con error
          </button>
        </div>
        {case2Mode === 'fixed' ? <FixedRerender /> : <BuggyRerender />}
      </section>
    </div>

  );
}

export default App
