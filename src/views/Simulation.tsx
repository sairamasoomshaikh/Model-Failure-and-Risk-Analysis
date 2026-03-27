import React, { useState } from 'react';
import { 
  ChevronRight, 
  Play, 
  Save, 
  Sliders, 
  Shield, 
  Maximize2, 
  RotateCcw,
  Router
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Simulation() {
  const [noise, setNoise] = useState(42);
  const [randomization, setRandomization] = useState(12);
  const [drift, setDrift] = useState('Med');

  const waveformData = Array.from({ length: 15 }, (_, i) => ({
    name: i,
    confidence: Math.random() * 60 + 20,
    drift: Math.random() * 40 + 10,
    type: Math.random() > 0.7 ? 'drift' : 'confidence'
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary-container/60 text-xs font-medium uppercase tracking-widest mb-2">
            <span>Simulations</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container">Stress Test Alpha</span>
          </div>
          <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Large Language Model Stress Test</h2>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded border border-outline-variant/30 text-on-surface text-sm font-medium hover:bg-surface-high transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
          <button className="px-6 py-2.5 rounded bg-primary-container text-on-primary-container font-bold text-sm shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-primary-container/30 active:scale-95 transition-all flex items-center gap-2">
            <Play className="w-4 h-4 fill-on-primary-container" />
            Run Simulation
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Parameter Control */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-low rounded-xl p-6 border border-outline-variant/5">
            <h3 className="font-headline font-bold text-lg text-primary-container mb-6 flex items-center gap-2">
              <Sliders className="w-5 h-5" />
              Input Perturbation
            </h3>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-on-surface-variant">Noise Injection Level</label>
                  <span className="text-xs font-mono text-primary-container bg-primary-container/10 px-2 py-0.5 rounded">0.{noise}σ</span>
                </div>
                <input 
                  className="w-full h-1 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-primary-container" 
                  type="range" 
                  value={noise}
                  onChange={(e) => setNoise(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant/40 uppercase tracking-tighter">
                  <span>Baseline</span>
                  <span>Extreme</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-on-surface-variant">Token Randomization</label>
                  <span className="text-xs font-mono text-primary-container bg-primary-container/10 px-2 py-0.5 rounded">{randomization}%</span>
                </div>
                <input 
                  className="w-full h-1 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-primary-container" 
                  type="range" 
                  value={randomization}
                  onChange={(e) => setRandomization(Number(e.target.value))}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-on-surface-variant">Semantic Drift Intensity</label>
                  <span className="text-xs font-mono text-primary-container bg-primary-container/10 px-2 py-0.5 rounded">{drift}</span>
                </div>
                <div className="flex gap-2">
                  {['Low', 'Med', 'High'].map((level) => (
                    <button 
                      key={level}
                      onClick={() => setDrift(level)}
                      className={cn(
                        "flex-1 py-2 rounded text-xs font-bold transition-all border",
                        drift === level 
                          ? "bg-primary-container/20 border-primary-container/50 text-primary-container" 
                          : "bg-surface-lowest border-outline-variant/10 hover:border-primary-container/50"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-low rounded-xl p-6 border border-outline-variant/5">
            <h3 className="font-headline font-bold text-lg text-secondary mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Model Constraints
            </h3>
            <div className="space-y-4">
              <ToggleItem label="Safety Filter Bypass" active={false} />
              <ToggleItem label="Data Exfiltration Check" active={true} />
            </div>
          </div>
        </div>

        {/* Middle Column: Visualizer */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 bg-surface-high rounded-xl relative overflow-hidden group min-h-[400px]">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00daf3 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full border border-primary-container/10 rounded-full flex items-center justify-center">
                <div className="w-2/3 h-2/3 border border-primary-container/20 rounded-full flex items-center justify-center border-dashed">
                  <div className="w-1/3 h-1/3 bg-primary-container/10 border border-primary-container/40 rounded-full flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-4 h-4 bg-primary-container rounded-full shadow-[0_0_20px_rgba(0,229,255,0.8)]"
                    ></motion.div>
                  </div>
                </div>
                {/* Decorative Points */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-error rounded-full animate-pulse shadow-[0_0_10px_#ffb4ab]"></div>
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_#4edea3]"></div>
                <div className="absolute top-1/2 right-10 w-2 h-2 bg-primary-container rounded-full"></div>
              </div>
            </div>
            <div className="absolute top-6 left-6">
              <span className="bg-surface-lowest/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-primary-container uppercase tracking-widest border border-primary-container/20">Spatial Latent Analysis</span>
            </div>
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button className="p-2 rounded-full bg-surface-lowest/60 backdrop-blur text-on-surface hover:bg-primary-container/20 transition-all">
                <Maximize2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-surface-lowest/60 backdrop-blur text-on-surface hover:bg-primary-container/20 transition-all">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mini Stats Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-low p-4 rounded-xl border border-outline-variant/5">
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase mb-1">Mean Drift</p>
              <p className="text-2xl font-headline font-bold text-primary-container">0.142</p>
              <div className="mt-2 w-full bg-surface-highest h-1 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full w-[14%]"></div>
              </div>
            </div>
            <div className="bg-surface-low p-4 rounded-xl border border-outline-variant/5">
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase mb-1">Risk Vector</p>
              <p className="text-2xl font-headline font-bold text-error">Low</p>
              <div className="mt-2 w-full bg-surface-highest h-1 rounded-full overflow-hidden">
                <div className="bg-error h-full w-[22%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Log */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="bg-surface-lowest rounded-xl flex-1 border border-outline-variant/10 flex flex-col overflow-hidden shadow-inner">
            <div className="bg-surface-highest px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-[10px] font-mono font-bold text-on-surface-variant/60">SIMULATION_LOG.SH</span>
            </div>
            <div className="p-4 font-mono text-[11px] leading-relaxed overflow-y-auto flex-1 custom-scrollbar">
              <div className="text-primary-container/70 mb-2">[INFO] Initializing risk weights... OK</div>
              <div className="text-secondary/80 mb-2">[SUCCESS] Model container attached: LLM-v4.2-PROD</div>
              <div className="text-on-surface/60 mb-2">&gt; Injecting noise tensor at layer_12...</div>
              <div className="text-on-surface/60 mb-2">&gt; Re-calculating attention heads...</div>
              <div className="text-error mb-2">[WARN] Anomaly detected in token 0xFA42</div>
              <div className="text-on-surface/60 mb-2">&gt; Stress level at 42.0%</div>
              <div className="text-on-surface/60 mb-2">&gt; Perturbation step 1/25 completed.</div>
              <div className="text-on-surface/60 mb-2">&gt; Analyzing semantic variance...</div>
              <div className="text-on-surface/60 mb-2">&gt; 0.0034 delta observed.</div>
              <div className="text-primary-container/70 mb-2 animate-pulse">[WAIT] Processing feedback loop...</div>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-xl border border-primary-container/20">
            <h4 className="text-xs font-bold text-primary-container uppercase tracking-widest mb-3">Live Feed Status</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-surface-highest flex items-center justify-center border border-outline-variant/20">
                <Router className="w-6 h-6 text-primary-container" />
              </div>
              <div>
                <p className="text-xs font-bold">Node: AWS-USE-1A</p>
                <p className="text-[10px] text-on-surface-variant">Latency: 12ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Visualization */}
      <div className="bg-surface-low rounded-xl p-6 border border-outline-variant/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline font-bold text-lg text-on-surface">Waveform Stress Analysis</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-container"></div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Confidence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error"></div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Drift</span>
            </div>
          </div>
        </div>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waveformData}>
              <Bar dataKey="confidence" radius={[2, 2, 0, 0]}>
                {waveformData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.type === 'confidence' ? '#00e5ff' : '#2d3449'} 
                    fillOpacity={entry.type === 'confidence' ? 0.6 : 1}
                  />
                ))}
              </Bar>
              <Bar dataKey="drift" radius={[2, 2, 0, 0]}>
                {waveformData.map((entry, index) => (
                  <Cell 
                    key={`cell-drift-${index}`} 
                    fill={entry.type === 'drift' ? '#ffb4ab' : '#2d3449'} 
                    fillOpacity={entry.type === 'drift' ? 0.6 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ToggleItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded bg-surface-lowest border border-outline-variant/10">
      <span className="text-sm font-medium">{label}</span>
      <div className={cn("w-10 h-5 rounded-full relative transition-colors", active ? "bg-secondary-container/50" : "bg-surface-highest")}>
        <div className={cn("absolute top-1 w-3 h-3 rounded-full transition-all", active ? "right-1 bg-white" : "left-1 bg-on-surface-variant/50")}></div>
      </div>
    </div>
  );
}
