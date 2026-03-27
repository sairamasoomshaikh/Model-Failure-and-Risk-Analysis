import React from 'react';
import { 
  TrendingUp, 
  Download, 
  BarChart, 
  Zap, 
  Clock,
  ChevronRight
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
import { cn } from '../lib/utils';

export function Metrics() {
  const rocData = [
    { x: 0, y: 0, baseline: 0 },
    { x: 0.1, y: 0.4, baseline: 0.1 },
    { x: 0.2, y: 0.65, baseline: 0.2 },
    { x: 0.4, y: 0.85, baseline: 0.4 },
    { x: 0.6, y: 0.92, baseline: 0.6 },
    { x: 0.8, y: 0.96, baseline: 0.8 },
    { x: 1, y: 1, baseline: 1 },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-primary-container font-headline font-bold tracking-widest text-xs uppercase block mb-2">Statistical Engine v4.2</span>
          <h3 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-4">Metrics & Performance Matrices</h3>
          <p className="text-on-surface-variant leading-relaxed">Cross-model validation and diagnostic analytics. Monitoring the observational fidelity of AI decision paths under variable noise injection and adversarial perturbation.</p>
        </div>
        <div className="flex gap-3">
          <MetricBadge label="Overall AUC" value="0.982" color="text-secondary" />
          <MetricBadge label="Avg. F1 Score" value="0.941" color="text-primary-container" />
        </div>
      </div>

      {/* Bento Grid: Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ROC/AUC Visualization */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-outline-variant/10 shadow-xl overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
                <TrendingUp className="text-primary-container w-5 h-5" />
                ROC / Precision-Recall Curves
              </h4>
              <p className="text-xs text-on-surface-variant">Performance trade-offs across all model variants</p>
            </div>
            <select className="bg-surface-lowest text-xs border border-outline-variant/20 rounded-lg px-3 py-1.5 text-on-surface focus:ring-primary-container outline-none">
              <option>Cumulative View</option>
              <option>Neural Core V1</option>
              <option>Quantum Latent B</option>
            </select>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rocData}>
                <defs>
                  <linearGradient id="colorY" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#c3f5ff" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#00e5ff" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(218, 226, 253, 0.05)" vertical={false} />
                <XAxis dataKey="x" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131b2e', border: '1px solid #3b494c', borderRadius: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="y" 
                  stroke="url(#colorY)" 
                  fill="url(#colorY)" 
                  fillOpacity={0.05} 
                  strokeWidth={3} 
                />
                <Line 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="#4edea3" 
                  strokeDasharray="8 4" 
                  strokeOpacity={0.4} 
                  dot={false} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-6 text-[10px] font-bold tracking-widest uppercase mt-4">
            <div className="flex items-center gap-2 text-primary-container">
              <span className="w-3 h-0.5 bg-primary-container"></span> Primary Model
            </div>
            <div className="flex items-center gap-2 text-secondary/60">
              <span className="w-3 h-0.5 border-t border-dashed border-secondary"></span> Baseline Ref
            </div>
          </div>
        </div>

        {/* Confidence Gauge Cluster */}
        <div className="space-y-6">
          <GaugeCard label="Precision Gauge" value={92.4} target={95.0} color="bg-gradient-to-r from-primary to-primary-container" textColor="text-primary-container" />
          <GaugeCard label="Recall Efficiency" value={88.1} target={85.0} color="bg-gradient-to-r from-secondary to-secondary-container" textColor="text-secondary" />
          
          <div className="bg-surface-high rounded-2xl p-6 border border-outline-variant/10 shadow-lg">
            <h4 className="font-headline font-bold text-sm text-on-surface-variant uppercase tracking-widest mb-4">Inference Latency</h4>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-headline font-black text-on-surface">14.2</span>
              <span className="text-sm text-on-surface-variant font-medium pb-1">ms / req</span>
            </div>
            <div className="mt-4 flex gap-1 h-2">
              <div className="flex-1 bg-secondary rounded-full opacity-20"></div>
              <div className="flex-1 bg-secondary rounded-full opacity-40"></div>
              <div className="flex-1 bg-secondary rounded-full"></div>
              <div className="flex-1 bg-surface-highest rounded-full"></div>
              <div className="flex-1 bg-surface-highest rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Confusion Matrices Comparison */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-headline font-bold text-2xl text-on-surface">Confusion Matrices Comparison</h4>
          <button className="text-primary-container text-sm font-bold flex items-center gap-1 hover:underline">
            Export Raw Tensors
            <Download className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <MatrixCard title="Neural Core V1 (Optimal)" tp={842} fp={12} fn={24} tn={711} />
          <MatrixCard title="Perturbation Test (+15% Noise)" tp={790} fp={64} fn={52} tn={683} />
          <MatrixCard title="Ghost Class Activation (Vulnerability)" tp={310} fp={542} fn={92} tn={645} />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-low rounded-2xl overflow-hidden border border-outline-variant/15 shadow-2xl">
        <div className="px-6 py-4 border-b border-outline-variant/10 bg-surface-high/50 flex justify-between items-center">
          <h4 className="font-headline font-bold text-on-surface">Precision-Recall over Noise Distribution</h4>
          <span className="px-3 py-1 bg-primary-container/10 text-primary-container text-[10px] font-bold rounded-full border border-primary-container/20">LIVE DATA</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-on-surface-variant/60 uppercase text-[10px] font-bold tracking-widest bg-surface-high/20">
                <th className="px-6 py-4">Noise Threshold (dB)</th>
                <th className="px-6 py-4">Precision</th>
                <th className="px-6 py-4">Recall</th>
                <th className="px-6 py-4">F1 Score</th>
                <th className="px-6 py-4">Entropy Shift</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              <TableRow threshold="0.0 (Clean)" precision="0.992" recall="0.988" f1="0.990" entropy="0.001" status="STABLE" statusColor="text-secondary" />
              <TableRow threshold="-5.0 dB" precision="0.975" recall="0.962" f1="0.968" entropy="0.042" status="STABLE" statusColor="text-secondary" />
              <TableRow threshold="-15.0 dB" precision="0.912" recall="0.895" f1="0.903" entropy="0.185" status="DEGRADED" statusColor="text-tertiary-container" className="bg-surface-highest/20" />
              <TableRow threshold="-25.0 dB" precision="0.745" recall="0.682" f1="0.712" entropy="0.491" status="CRITICAL" statusColor="text-error" />
              <TableRow threshold="-40.0 dB" precision="0.421" recall="0.315" f1="0.360" entropy="0.884" status="FAILURE" statusColor="text-error" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricBadge({ label, value, color }: any) {
  return (
    <div className="bg-surface-low px-4 py-3 rounded-xl border border-outline-variant/10 text-center min-w-[120px]">
      <span className="block text-xs text-on-surface-variant uppercase tracking-tighter mb-1">{label}</span>
      <span className={cn("block text-2xl font-headline font-bold", color)}>{value}</span>
    </div>
  );
}

function GaugeCard({ label, value, target, color, textColor }: any) {
  return (
    <div className="bg-surface-high rounded-2xl p-6 border border-outline-variant/10 shadow-lg">
      <h4 className="font-headline font-bold text-sm text-on-surface-variant uppercase tracking-widest mb-4">{label}</h4>
      <div className="relative h-4 w-full bg-surface-highest rounded-full overflow-hidden mb-2">
        <div className={cn("absolute inset-y-0 left-0 shadow-[0_0_15px_rgba(0,229,255,0.4)]", color)} style={{ width: `${value}%` }}></div>
      </div>
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-on-surface-variant">Target: {target}%</span>
        <span className={cn("font-bold", textColor)}>{value}%</span>
      </div>
    </div>
  );
}

function MatrixCard({ title, tp, fp, fn, tn }: any) {
  return (
    <div className="bg-surface-low rounded-2xl p-5 border border-outline-variant/15">
      <h5 className="font-headline font-bold text-on-surface-variant text-sm mb-4 border-b border-outline-variant/10 pb-2">{title}</h5>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 aspect-square">
        <div className="bg-secondary/80 flex flex-col items-center justify-center rounded-lg p-4 transition-transform hover:scale-105">
          <span className="text-[10px] uppercase font-bold text-on-secondary/60">True Pos</span>
          <span className="text-2xl font-headline font-black text-on-secondary">{tp}</span>
        </div>
        <div className="bg-error/20 flex flex-col items-center justify-center rounded-lg p-4 transition-transform hover:scale-105">
          <span className="text-[10px] uppercase font-bold text-error/60">False Pos</span>
          <span className="text-2xl font-headline font-black text-error">{fp}</span>
        </div>
        <div className="bg-error/40 flex flex-col items-center justify-center rounded-lg p-4 transition-transform hover:scale-105">
          <span className="text-[10px] uppercase font-bold text-error/60">False Neg</span>
          <span className="text-2xl font-headline font-black text-error">{fn}</span>
        </div>
        <div className="bg-secondary/60 flex flex-col items-center justify-center rounded-lg p-4 transition-transform hover:scale-105">
          <span className="text-[10px] uppercase font-bold text-on-secondary/60">True Neg</span>
          <span className="text-2xl font-headline font-black text-on-secondary">{tn}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-[10px] text-on-surface-variant font-mono">
        <span>Class: Risk Detected</span>
        <span>N = 1,589</span>
      </div>
    </div>
  );
}

function TableRow({ threshold, precision, recall, f1, entropy, status, statusColor, className }: any) {
  return (
    <tr className={cn("hover:bg-primary-container/5 transition-colors group", className)}>
      <td className="px-6 py-4 font-mono font-bold text-primary-container">{threshold}</td>
      <td className="px-6 py-4">{precision}</td>
      <td className="px-6 py-4">{recall}</td>
      <td className="px-6 py-4">{f1}</td>
      <td className="px-6 py-4 text-on-surface-variant">{entropy}</td>
      <td className="px-6 py-4 text-right"><span className={cn("font-bold text-xs", statusColor)}>{status}</span></td>
    </tr>
  );
}
