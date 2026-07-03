import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, ArrowRight } from 'lucide-react';
import tlVideo from '../../assets/transfer_learning.mp4';

const NetworkLayer = ({ nodes, color, label, isFrozen, active, yOffset = 0, xOffset = 0 }) => (
  <motion.div 
    className="flex flex-col items-center gap-4 relative"
    animate={{ x: xOffset, y: yOffset }}
    transition={{ duration: 0.8, type: "spring" }}
  >
    <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{label}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', 
                  border: isFrozen ? '2px dashed var(--accent)' : '2px solid transparent', 
                  borderRadius: '8px', 
                  backgroundColor: isFrozen ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                  transition: 'all 0.5s ease' }}>
      {Array.from({ length: nodes }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: active ? [1, 1.2, 1] : 1, 
            opacity: 1,
            boxShadow: active ? `0 0 15px ${color}` : 'none'
          }}
          transition={{ 
            duration: active ? 1.5 : 0.5, 
            repeat: active ? Infinity : 0, 
            delay: i * 0.1 
          }}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid rgba(255,255,255,0.2)'
          }}
        />
      ))}
    </div>
  </motion.div>
);

const AnimationTab = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: "1. Pre-training (Source Task)", desc: "A model learns general features from a massive dataset (e.g., millions of images)." },
    { title: "2. Transfer Knowledge", desc: "We copy the early layers (which learned general features like edges) and freeze them." },
    { title: "3. Fine-tuning (Target Task)", desc: "We replace the final layer and train only it on our specific, smaller dataset." }
  ];

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>{steps[step].title}</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', minHeight: '60px' }}>
          {steps[step].desc}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '800px', marginBottom: '4rem', minHeight: '350px' }}>
        
        {/* Source Model */}
        <div style={{ display: 'flex', gap: '2rem', opacity: step === 0 ? 1 : 0.4, transition: 'opacity 0.5s' }}>
          <NetworkLayer nodes={5} color="var(--primary)" label="Layer 1 (Edges)" active={step === 0} />
          <NetworkLayer nodes={5} color="var(--primary)" label="Layer 2 (Shapes)" active={step === 0} />
          <NetworkLayer nodes={3} color="var(--secondary)" label="Output (Source)" active={step === 0} />
        </div>

        {/* Arrow representing Transfer */}
        <motion.div
          animate={{ opacity: step === 1 ? 1 : 0, scale: step === 1 ? 1 : 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--accent)' }}
        >
          <span style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Transfer</span>
          <ArrowRight size={40} />
        </motion.div>

        {/* Target Model */}
        <div style={{ display: 'flex', gap: '2rem', opacity: step > 0 ? 1 : 0, transition: 'opacity 0.5s' }}>
          {step > 0 && (
            <>
              <NetworkLayer nodes={5} color="var(--primary)" label="Frozen Layer 1" isFrozen={true} active={false} />
              <NetworkLayer nodes={5} color="var(--primary)" label="Frozen Layer 2" isFrozen={true} active={false} />
              <NetworkLayer 
                nodes={2} 
                color="var(--accent)" 
                label="New Output" 
                active={step === 2} 
                yOffset={step === 1 ? 50 : 0}
                opacity={step === 1 ? 0 : 1}
              />
            </>
          )}
        </div>

      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
        <button className="btn" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
          Previous
        </button>
        <button className="btn active" onClick={() => setStep(s => s < 2 ? s + 1 : 0)}>
          {step === 2 ? <><RotateCcw size={18} /> Restart</> : <><Play size={18} /> Next Step</>}
        </button>
      </div>

      <div style={{ marginTop: '2rem', width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Video Explanation</h3>
        <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
          <video 
            src={tlVideo}
            controls
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default AnimationTab;
