import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  Cpu, 
  Sliders, 
  RefreshCw,
  Search
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Dashboard() {
  const [noise, setNoise] = useState(0);
  const [income, setIncome] = useState(85000);
  const [credit, setCredit] = useState(720);
  const [loan, setLoan] = useState(250000);
  const [isPredicting, setIsPredicting] = useState(false);

  const confidence = useMemo(() => {
    let score = (income / 10000) * 5 + (credit / 850) * 60 - (loan / income) * 10;
    score = Math.min(99, Math.max(5, score));
    return Math.round(score * (1 - noise / 200));
  }, [income, credit, loan, noise]);

  const chartData = useMemo(() => {
    return [0, 20, 40, 60, 80, 100].map((val, i) => {
      const baseAcc = 98 - (noise * 0.4);
      const acc = Math.max(20, baseAcc - (i * (5 + noise * 0.15)));
      const baseEnt = 5 + (noise * 0.2);
      const ent = Math.min(95, baseEnt + (i * (10 + noise * 0.05)));
      return { name: `${val}%`, accuracy: acc, entropy: ent };
    });
  }, [noise]);

  const riskStatus = useMemo(() => {
    if (confidence >= 80) return { label: 'Low Risk', color: 'text-secondary', bg: 'bg-secondary-container/20' };
    if (confidence >= 60) return { label: 'Moderate', color: 'text-tertiary-container', bg: 'bg-tertiary-container/20' };
    return { label: 'Critical', color: 'text-error', bg: 'bg-error-container/20' };
  }, [confidence]);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Current Accuracy" 
          value="94.2%" 
          trend="+0.4% from baseline" 
          icon={<TrendingUp className="w-4 h-4" />}
          borderColor="border-primary-container"
        />
        <StatCard 
          label="Risk Level" 
          value="Minimal" 
          trend="Stable operational zone" 
          icon={<ShieldCheck className="w-4 h-4" />}
          borderColor="border-secondary"
          valueColor="text-secondary"
        />
        <StatCard 
          label="Simulations Run" 
          value="1,204" 
          trend="Last 24 hours" 
          icon={<Activity className="w-4 h-4" />}
          borderColor="border-tertiary-container"
        />
        <StatCard 
          label="Anomalies Detected" 
          value="12" 
          trend="Requires review" 
          icon={<AlertTriangle className="w-4 h-4" />}
          borderColor="border-error"
          valueColor="text-error"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls */}
        <div className="lg:col-span-4 space-y-8">
          {/* Prediction Module */}
          <section className="glass-panel p-6 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-headline font-bold text-lg text-primary">Prediction Module</h4>
              <Cpu className="text-primary/40 w-5 h-5" />
            </div>
            <div className="space-y-5">
              <InputField label="Annual Income ($)" value={income} onChange={(v) => setIncome(Number(v))} />
              <InputField label="Credit History Score" value={credit} onChange={(v) => setCredit(Number(v))} />
              <InputField label="Loan Amount ($)" value={loan} onChange={(v) => setLoan(Number(v))} />
              
              <button 
                onClick={() => { setIsPredicting(true); setTimeout(() => setIsPredicting(false), 800); }}
                className="w-full bg-primary-container text-on-primary-container font-bold py-3 rounded-lg shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-150 mt-2 flex items-center justify-center gap-2"
              >
                {isPredicting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  "Run Risk Prediction"
                )}
              </button>
            </div>
          </section>

          {/* Noise Simulation */}
          <section className="glass-panel p-6 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-headline font-bold text-lg text-tertiary-container">Noise Simulation</h4>
              <Sliders className="text-tertiary-container/40 w-5 h-5" />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-xs font-semibold text-on-surface-variant/60 uppercase tracking-widest">Model Perturbation (%)</label>
                <span className="text-tertiary-container font-bold font-headline text-lg">{noise}%</span>
              </div>
              <input 
                className="w-full h-1 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-primary-container" 
                type="range" 
                min="0" 
                max="100" 
                value={noise}
                onChange={(e) => setNoise(Number(e.target.value))}
              />
              <p className="text-[11px] text-on-surface-variant/40 leading-relaxed italic">
                Inject stochastic noise into the weighting layer to observe decision boundary degradation.
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Visualizations */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Confidence Score */}
            <section className="glass-panel p-6 rounded-xl border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="font-headline font-bold text-lg text-on-surface mb-1">Confidence Score</h4>
                <p className="text-xs text-on-surface-variant/40 mb-6 uppercase tracking-wider">AI Probability Mapping</p>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className={cn("text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full transition-colors duration-500", riskStatus.bg, riskStatus.color)}>
                      {riskStatus.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-on-surface font-headline transition-all duration-500">{confidence}%</span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-surface-highest relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 0.5 }}
                    className={cn("shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-700 ease-out relative", 
                      confidence >= 80 ? "bg-secondary" : confidence >= 60 ? "bg-tertiary-container" : "bg-error"
                    )}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-4 flex gap-4 text-[11px] text-on-surface-variant">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> 85%+ Reliable</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary-container"></span> 60-84% Warning</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-error"></span> &lt;60% Unstable</div>
              </div>
            </section>

            {/* Confusion Matrix */}
            <section className="glass-panel p-6 rounded-xl border border-white/5">
              <h4 className="font-headline font-bold text-lg text-on-surface mb-4">Confusion Matrix</h4>
              <div className="grid grid-cols-2 grid-rows-2 gap-2 text-center">
                <MatrixCell label="True Pos" value={Math.round(452 * (confidence / 100))} color="text-secondary" borderColor="border-secondary/10" />
                <MatrixCell label="False Pos" value={Math.round(12 + (noise * 0.8))} color="text-error" borderColor="border-error/10" opacity="opacity-60" />
                <MatrixCell label="False Neg" value={Math.round(8 + (noise * 0.5))} color="text-error" borderColor="border-error/10" opacity="opacity-60" />
                <MatrixCell label="True Neg" value={Math.round(730 - (noise * 2))} color="text-secondary" borderColor="border-secondary/10" />
              </div>
              <p className="mt-4 text-[10px] text-center text-on-surface-variant font-medium tracking-widest uppercase">Statistical Error Distribution</p>
            </section>
          </div>

          {/* Performance Graph */}
          <section className="glass-panel p-6 rounded-xl border border-white/5 h-[360px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-headline font-bold text-lg text-on-surface">Accuracy vs. Noise Gradient</h4>
                <p className="text-xs text-on-surface-variant/40">System vulnerability threshold analysis</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary-container">
                  <span className="w-2 h-0.5 bg-primary-container"></span> Accuracy
                </div>
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-error">
                  <span className="w-2 h-0.5 bg-error"></span> Entropy
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(218, 226, 253, 0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(218, 226, 253, 0.4)', fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(218, 226, 253, 0.4)', fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#131b2e', border: '1px solid #3b494c', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#00e5ff" 
                    strokeWidth={3} 
                    dot={false} 
                    animationDuration={1000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="entropy" 
                    stroke="#ffb4ab" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={false} 
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Stats */}
      <footer className="flex items-center justify-between text-[10px] text-on-surface-variant/50 font-mono tracking-widest pt-8 border-t border-outline-variant/10">
        <div>SYSTEM STATUS: <span className="text-secondary">OPERATIONAL</span></div>
        <div className="hidden md:block">AI RISK INTELLIGENCE • ENCRYPTED SESSION • 2024</div>
        <div className="flex gap-4">
          <span>API: v2.4.0</span>
          <span>LATENCY: 14MS</span>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, trend, icon, borderColor, valueColor = "text-on-surface" }: any) {
  return (
    <div className={cn("bg-surface-high p-6 rounded-xl border-l-4", borderColor)}>
      <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">{label}</p>
      <h3 className={cn("font-headline text-3xl font-bold mt-1", valueColor)}>{value}</h3>
      <div className="flex items-center mt-2 text-on-surface-variant/60 text-xs">
        {icon && <span className="mr-1">{icon}</span>}
        {trend}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-xs font-semibold text-on-surface-variant/60 uppercase tracking-widest mb-2">{label}</label>
      <input 
        className="w-full bg-surface-lowest border-none rounded-lg p-3 text-on-surface focus:ring-1 focus:ring-primary-container/50 transition-all" 
        type="number" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function MatrixCell({ label, value, color, borderColor, opacity = "" }: any) {
  return (
    <div className={cn("bg-surface-lowest p-4 rounded flex flex-col items-center justify-center border transition-all hover:scale-105", borderColor, opacity)}>
      <span className={cn("text-[10px] uppercase font-bold tracking-tighter", color)}>{label}</span>
      <span className="text-xl font-headline font-bold">{value}</span>
    </div>
  );
}
