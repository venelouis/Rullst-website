import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { benchmarkMetrics, rullstFeatures } from "../data";
import { Cpu, Zap, Activity, Info, BarChart3, ShieldAlert } from "lucide-react";

export default function BenchmarkArena() {
  const [selectedMetric, setSelectedMetric] = useState(0);
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [stressProgress, setStressProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"charts" | "features">("charts");
  const [stressData, setStressData] = useState<Array<{ rullst: number; nextjs: number; axum: number; laravel: number; django: number; leptos: number }>>([]);
  
  const timerRef = useRef<number | null>(null);

  const activeMetric = benchmarkMetrics[selectedMetric];

  // Stress tests generator simulating high concurrency spikes
  const startStressTest = () => {
    if (isStressTesting) return;
    setIsStressTesting(true);
    setStressProgress(0);
    setStressData([]);

    let progress = 0;
    const interval = window.setInterval(() => {
      progress += 2;
      setStressProgress(progress);
      
      setStressData(prev => [
        ...prev.slice(-18), // keep last 18 points
        {
          rullst: 0.12 + Math.random() * 0.03, // stays incredibly flat in microseconds bounds
          leptos: 0.92 + Math.random() * 0.15 + (progress * 0.005), // stable client-side core
          axum: 0.85 + Math.random() * 0.25 + (progress * 0.008), // stable server-side core
          nextjs: 18.5 + Math.random() * 8.0 + (progress * 1.8), // spikes substantially from GC strain
          django: 38.6 + Math.random() * 12.0 + (progress * 2.4), // stalls on Python sync workers thread pools
          laravel: 45.2 + Math.random() * 15.0 + (progress * 3.1), // high CPU context switching load
        },
      ]);

      if (progress >= 100) {
        clearInterval(interval);
        setIsStressTesting(false);
      }
    }, 100);

    timerRef.current = interval;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Normalize heights based on metric max values for the bar graphs
  const getBars = () => {
    const values = [
      { name: "Rullst (Rust)", val: activeMetric.rullst, color: "from-orange-500 to-amber-500", label: "μs/ms" },
      { name: "Leptos (Rust)", val: activeMetric.leptos, color: "from-emerald-400 to-teal-500", label: "ms" },
      { name: "Rust Axum", val: activeMetric.rustAxum, color: "from-sky-400 to-blue-500", label: "ms" },
      { name: "Next.js (Node)", val: activeMetric.nextJs, color: "from-red-500 to-rose-600", label: "ms" },
      { name: "Django (Python)", val: activeMetric.django, color: "from-amber-600 to-yellow-700", label: "ms" },
      { name: "Laravel (PHP)", val: activeMetric.laravel, color: "from-purple-500 to-violet-600", label: "ms" },
    ];

    const maxVal = Math.max(...values.map(v => v.val));
    const minVal = Math.min(...values.map(v => v.val));

    return values.map(v => {
      const percentage = maxVal > 0 ? (v.val / maxVal) * 100 : 0;
      const isWinner = v.val === minVal;
      
      return {
        ...v,
        heightPercentage: Math.max(8, percentage),
        isWinner,
      };
    });
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Real-Time Performance Benchmark Arena
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          Comparing Rullst against industry titans under strict, isolated micro-instances (1 vCPU, 512MB RAM environment constraints).
        </p>
      </div>

      {/* Tabs Controller */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-900/80 p-1.5 rounded-xl border border-gray-800 flex space-x-2">
          <button
            onClick={() => setActiveTab("charts")}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "charts" ? "bg-gray-800 text-white border border-gray-700" : "text-gray-400 hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4 text-orange-400" />
            <span>Comparative Metrics</span>
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "features" ? "bg-gray-800 text-white border border-gray-700" : "text-gray-400 hover:text-white"
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Framework Feature Matrix</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "charts" ? (
          <motion.div
            key="charts"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Metric select list */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              <span className="text-xs font-mono text-orange-400 tracking-wider font-semibold uppercase mb-1">
                SELECT PERFORMANCE METRIC
              </span>
              {benchmarkMetrics.map((met, idx) => (
                <button
                   key={met.name}
                  onClick={() => {
                    setSelectedMetric(idx);
                    if (isStressTesting) setIsStressTesting(false);
                  }}
                  className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 ${
                    selectedMetric === idx
                      ? "bg-orange-500/10 border-orange-500/40 shadow-sm"
                      : "bg-gray-900/50 border-gray-800/80 hover:bg-gray-900 hover:border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className={`font-semibold text-sm ${selectedMetric === idx ? "text-orange-400" : "text-gray-200"}`}>
                      {met.name}
                    </span>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full font-mono">
                      {met.unit}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {met.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Visualizer Card */}
            <div className="lg:col-span-8 bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col self-stretch justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white flex items-center">
                      <Cpu className="w-5 h-5 mr-2 text-cyan-400" />
                      Visualizer Panel: {activeMetric.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Direct stress metrics. (Shorter bars represent superior resource optimization/speed)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400">
                      Rullst is {(activeMetric.nextJs / activeMetric.rullst).toFixed(0)}x faster than Next.js
                    </span>
                  </div>
                </div>

                {/* Graph Area */}
                <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 border-b border-gray-800 pb-2.5 px-2 relative">
                  {/* Y Axis markings */}
                  <div className="absolute left-0 bottom-4 right-0 border-t border-gray-800/30 pointer-events-none"></div>
                  <div className="absolute left-0 top-1/2 right-0 border-t border-gray-800/30 pointer-events-none"></div>
                  <div className="absolute left-0 top-1/4 right-0 border-t border-gray-800/30 pointer-events-none"></div>

                  {getBars().map((bar) => (
                    <div key={bar.name} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                      {/* Numeric Badge on Hover */}
                      <div className="absolute -top-10 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-gray-900 border border-gray-700 text-white font-mono text-xs py-1 px-2 rounded shadow z-10 whitespace-nowrap">
                        {bar.val} {activeMetric.unit}
                      </div>

                      {/* Bar volume filled */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.heightPercentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`w-full max-w-12 rounded-t-lg bg-gradient-to-t ${bar.color} ${
                          bar.isWinner ? "shadow-lg shadow-orange-500/25" : "opacity-75"
                        } flex items-end justify-center pb-2`}
                      >
                        <span className="text-[10px] font-mono font-bold text-white tracking-tight text-center px-1">
                          {bar.val}
                        </span>
                      </motion.div>

                      {/* Winning Badge indicator */}
                      {bar.isWinner && (
                        <div className="absolute top-[-22px] flex items-center bg-orange-500/25 border border-orange-500/50 rounded-full px-1.5 py-0.5 pointer-events-none animate-bounce">
                          <Zap className="w-3 h-3 text-orange-400 mr-0.5" />
                          <span className="text-[9px] font-bold text-orange-400 font-mono">BEST</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* X Axis Labels */}
                <div className="grid grid-cols-6 gap-1 pt-4 text-center">
                  {getBars().map((bar) => (
                    <div key={bar.name} className="flex flex-col">
                      <span className="text-[10px] sm:text-xs font-semibold text-gray-200 truncate">{bar.name}</span>
                      <span className="text-[9px] font-mono text-gray-400 mt-0.5">{activeMetric.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stress Test Simulation Box */}
              <div className="mt-8 border-t border-gray-800/80 pt-6">
                <div className="bg-gray-950/60 p-4 rounded-xl border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <Activity className={`w-5 h-5 mt-0.5 shrink-0 ${isStressTesting ? "text-orange-500 animate-spin" : "text-gray-400"}`} />
                    <div>
                      <h4 className="text-white text-sm font-semibold">Virtual High-Load Simulator</h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-md">
                        Stress-tests compilation and dynamic routing pipelines under 50,000 simulated concurrent requests to inspect event loop stalls.
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={startStressTest}
                      disabled={isStressTesting}
                      className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                        isStressTesting
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 cursor-not-allowed"
                          : "bg-orange-500 text-white hover:bg-orange-600 shadow shadow-orange-500/10 cursor-pointer"
                      }`}
                    >
                      {isStressTesting ? `STRESSING (${stressProgress}%)` : "RUN STRESS INJECTOR"}
                    </button>
                  </div>
                </div>

                {/* Simulated Stress Graph Lines */}
                {stressData.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 bg-black/60 p-4 rounded-xl border border-gray-800 font-mono text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[9px] text-gray-400 mb-2 border-b border-gray-800/50 pb-1.5 gap-1">
                      <span>STRESS LINELOG (ACTIVE RENDERING LATENCY IN MS)</span>
                      <span className="flex flex-wrap gap-x-2 gap-y-0.5">
                        <span className="text-orange-400">● Rullst: {stressData[stressData.length - 1].rullst.toFixed(2)}ms</span>
                        <span className="text-emerald-400 font-bold">● Leptos: {stressData[stressData.length - 1].leptos.toFixed(2)}ms</span>
                        <span className="text-sky-400">● Axum: {stressData[stressData.length - 1].axum.toFixed(2)}ms</span>
                        <span className="text-red-400">● Next.js: {stressData[stressData.length - 1].nextjs.toFixed(2)}ms</span>
                        <span className="text-amber-500">● Django: {stressData[stressData.length - 1].django.toFixed(2)}ms</span>
                        <span className="text-purple-400">● Laravel: {stressData[stressData.length - 1].laravel.toFixed(2)}ms</span>
                      </span>
                    </div>

                    {/* Canvas simulation using mini columns */}
                    <div className="h-20 flex gap-0.5 items-end overflow-hidden pb-1">
                      {stressData.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end h-full">
                          <div className="w-full flex items-end h-full relative">
                            {/* Next.js (tallest spike) */}
                            <div
                              style={{ height: `${Math.min(100, (d.nextjs / 100) * 100)}%` }}
                              className="w-full bg-red-500/20 absolute bottom-0 z-0"
                            ></div>
                            {/* Laravel */}
                            <div
                              style={{ height: `${Math.min(100, (d.laravel / 100) * 100)}%` }}
                              className="w-full bg-purple-500/25 absolute bottom-0 z-0"
                            ></div>
                            {/* Django */}
                            <div
                              style={{ height: `${Math.min(100, (d.django / 100) * 100)}%` }}
                              className="w-full bg-amber-500/25 absolute bottom-0 z-0"
                            ></div>
                            {/* Axum */}
                            <div
                              style={{ height: `${Math.min(100, (d.axum / 100) * 100)}%` }}
                              className="w-full bg-sky-500/30 absolute bottom-0 z-0"
                            ></div>
                            {/* Leptos */}
                            <div
                              style={{ height: `${Math.min(100, (d.leptos / 100) * 100)}%` }}
                              className="w-full bg-emerald-500/35 absolute bottom-0 z-1"
                            ></div>
                            {/* Rullst (super flat floor) */}
                            <div
                              style={{ height: `${Math.max(4, (d.rullst / 100) * 100)}%` }}
                              className="w-full bg-orange-500 absolute bottom-0 z-2"
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Threat analysis text */}
                    <div className="mt-2.5 flex items-start space-x-1.5 text-[10px] text-gray-400">
                      <ShieldAlert className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>
                        {stressProgress < 40
                          ? "Injecting synthetic multi-client transaction payloads. Rullst remains immune to thread locks."
                          : stressProgress < 85
                          ? "Next.js, Django and Laravel show rapid performance loss from GC pauses and interpreter task lockups. Axum/Leptos perform well, while Rullst floats optimally below sub-millisecond thresholds."
                          : "Audit Report: Rullst secures consistent response times because thread scopes require zero dynamic binding lookup or garbage collection stops."}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#090d16]/80 rounded-2xl border border-gray-800 shadow-xl overflow-hidden"
          >
            <div className="overflow-x-auto font-sans">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-900/60 border-b border-gray-800 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-gray-400">
                    <th className="p-4 sm:p-5">Technical Pillar</th>
                    <th className="p-4 sm:p-5 font-bold text-orange-400">RULLST (UNIFIED CRM)</th>
                    <th className="p-4 sm:p-5 text-gray-300">REACT (SPA)</th>
                    <th className="p-4 sm:p-5 text-gray-300">NEXT.JS (NODE)</th>
                    <th className="p-4 sm:p-5 text-gray-300">DJANGO (PYTHON)</th>
                    <th className="p-4 sm:p-5 text-gray-300">RUST AXUM</th>
                    <th className="p-4 sm:p-5 text-gray-300">LEPTOS (RUST)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50 text-xs sm:text-sm">
                  {rullstFeatures.map((feat) => (
                    <tr
                      key={feat.feature}
                      className={`hover:bg-gray-800/20 transition-colors duration-150 ${
                        feat.highlight ? "bg-orange-500/[0.015]" : ""
                      }`}
                    >
                      <td className="p-4 sm:p-5 font-semibold text-white">{feat.feature}</td>
                      <td className="p-4 sm:p-5 font-mono text-orange-400 bg-orange-500/[0.03] border-x border-orange-500/10 font-bold">
                        {feat.rullst}
                      </td>
                      <td className="p-4 sm:p-5 text-gray-400 font-mono text-xs">{feat.reactSpa}</td>
                      <td className="p-4 sm:p-5 text-gray-400 font-mono text-xs">{feat.nextJs}</td>
                      <td className="p-4 sm:p-5 text-gray-400 font-mono text-xs">{feat.django}</td>
                      <td className="p-4 sm:p-5 text-gray-400 font-mono text-xs">{feat.rustAxum}</td>
                      <td className="p-4 sm:p-5 text-gray-400 font-mono text-xs">{feat.leptos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 sm:p-5 bg-gray-900/40 border-t border-gray-800 flex items-start space-x-2 text-xs text-gray-400">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Technical Matrix Verdict:</strong> While traditional developer layouts require sacrificing speed for rapid setup (Django, Laravel, Next.js) or developer friendliness for pure raw code metrics (Actix-web, Axum), <strong>Rullst</strong> merges full-stack ActiveRecord layouts and isomorphic WASM rendering into a single declarative compiler.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
