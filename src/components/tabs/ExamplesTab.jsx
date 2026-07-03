import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Image, MessageSquare, Bot } from 'lucide-react';

const examplesData = {
  vision: {
    id: 'vision',
    title: 'Computer Vision',
    icon: <Image size={24} />,
    description: 'Pre-training on ImageNet (millions of general images) to fine-tuning on Medical X-rays (small specific dataset).',
    color: '#8b5cf6', // primary
    chartData: Array.from({ length: 15 }, (_, i) => ({
      epoch: i + 1,
      scratch: 2.5 * Math.exp(-0.15 * i) + Math.random() * 0.2,
      transfer: 0.8 * Math.exp(-0.4 * i) + 0.1 + Math.random() * 0.05
    }))
  },
  nlp: {
    id: 'nlp',
    title: 'Natural Language Processing',
    icon: <MessageSquare size={24} />,
    description: 'Using BERT pre-trained on Wikipedia text to perform Sentiment Analysis on IMDB movie reviews.',
    color: '#ec4899', // secondary
    chartData: Array.from({ length: 10 }, (_, i) => ({
      epoch: i + 1,
      scratch: 85 - 40 * Math.exp(-0.3 * i) + Math.random() * 2, // Accuracy
      transfer: 95 - 15 * Math.exp(-0.8 * i) + Math.random() * 1 // Accuracy
    }))
  },
  robotics: {
    id: 'robotics',
    title: 'Robotics (Sim2Real)',
    icon: <Bot size={24} />,
    description: 'Training a robot arm to grasp objects in a physics Simulation, then transferring the policy to a Real-world robot.',
    color: '#06b6d4', // accent
    chartData: Array.from({ length: 20 }, (_, i) => ({
      epoch: i + 1,
      scratch: Math.min(100, 20 + 3 * i + Math.random() * 5), // Success Rate
      transfer: Math.min(100, 75 + 5 * Math.log(i + 1) + Math.random() * 2) // Success Rate
    }))
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px' }}>
        <p style={{ color: 'white', marginBottom: '0.5rem' }}>Epoch: {label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0 }}>
            {entry.name}: {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ExamplesTab = () => {
  const [activeEx, setActiveEx] = useState('vision');
  const currentExample = examplesData[activeEx];

  const yAxisLabel = activeEx === 'vision' ? 'Loss' : activeEx === 'nlp' ? 'Accuracy (%)' : 'Success Rate (%)';
  const isLoss = activeEx === 'vision';

  return (
    <div style={{ padding: '1rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        {Object.values(examplesData).map((ex) => (
          <button
            key={ex.id}
            onClick={() => setActiveEx(ex.id)}
            style={{
              background: activeEx === ex.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              border: `1px solid ${activeEx === ex.id ? ex.color : 'var(--glass-border)'}`,
              color: activeEx === ex.id ? ex.color : 'var(--text-muted)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '150px'
            }}
          >
            {ex.icon}
            <span style={{ fontWeight: '500' }}>{ex.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeEx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}
        >
          
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: '1.5rem', color: currentExample.color, marginBottom: '1rem' }}>{currentExample.title}</h3>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '2rem' }}>
              {currentExample.description}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--text-muted)' }}></div>
                <span style={{ color: 'var(--text-muted)' }}>From Scratch</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: currentExample.color }}></div>
                <span style={{ color: 'var(--text-main)' }}>Transfer Learning</span>
              </div>
            </div>
          </div>

          <div style={{ height: '400px', width: '100%', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              {isLoss ? 'Training Loss (Lower is Better)' : `Model ${yAxisLabel} (Higher is Better)`}
            </h4>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={currentExample.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="epoch" stroke="var(--text-muted)" label={{ value: 'Epochs', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)' }} />
                <YAxis stroke="var(--text-muted)" domain={isLoss ? [0, 'dataMax'] : [0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="scratch" 
                  name="From Scratch"
                  stroke="var(--text-muted)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--text-muted)', r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={2000}
                />
                <Line 
                  type="monotone" 
                  dataKey="transfer" 
                  name="Transfer Learning"
                  stroke={currentExample.color} 
                  strokeWidth={4}
                  dot={{ fill: currentExample.color, r: 4 }}
                  activeDot={{ r: 8 }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default ExamplesTab;
