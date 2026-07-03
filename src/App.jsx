import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, BookOpen, LineChart } from 'lucide-react';
import './App.css';

// Import CSS for KaTeX
import 'katex/dist/katex.min.css';

import AnimationTab from './components/tabs/AnimationTab';
import TheoryTab from './components/tabs/TheoryTab';
import ExamplesTab from './components/tabs/ExamplesTab';

function App() {
  const [activeTab, setActiveTab] = useState('animation');

  const tabs = [
    { id: 'animation', label: 'Concept Animation', icon: <BrainCircuit size={20} /> },
    { id: 'theory', label: 'Theory & Formulas', icon: <BookOpen size={20} /> },
    { id: 'examples', label: 'Examples & Stats', icon: <LineChart size={20} /> }
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title text-gradient">Transfer Learning</h1>
        <p className="app-subtitle">Standing on the shoulders of giant models.</p>
      </header>

      <nav className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="tab-content glass-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', minHeight: '400px' }}
          >
            {activeTab === 'animation' && <AnimationTab />}
            {activeTab === 'theory' && <TheoryTab />}
            {activeTab === 'examples' && <ExamplesTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
