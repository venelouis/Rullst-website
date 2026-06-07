import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Layers, Activity, Lock, Unlock, Settings, Zap, Compass, Sparkles, RefreshCw } from "lucide-react";

interface WorkerThread {
  id: number;
  status: "IDLE" | "PROCESSING" | "STEALING";
  load: number;
  taskCount: number;
}

interface MemoryNode {
  address: string;
  variable: string;
  type: string;
  size: string;
  origin: "Stack" | "Heap" | "V8 Garbage Collector";
  color: string;
}

export default function RuntimeVisualizer() {
  const [threads, setThreads] = useState<WorkerThread[]>([
    { id: 1, status: "IDLE", load: 0, taskCount: 0 },
    { id: 2, status: "IDLE", load: 0, taskCount: 0 },
    { id: 3, status: "IDLE", load: 0, taskCount: 0 },
    { id: 4, status: "IDLE", load: 0, taskCount: 0 },
    { id: 5, status: "IDLE", load: 0, taskCount: 0 },
    { id: 6, status: "IDLE", load: 0, taskCount: 0 },
    { id: 7, status: "IDLE", load: 0, taskCount: 0 },
    { id: 8, status: "IDLE", load: 0, taskCount: 0 },
  ]);

  const [activeTasks, setActiveTasks] = useState<number>(0);
  const [memNodes, setMemNodes] = useState<MemoryNode[]>([
    { address: "0x7fff041", variable: "tenant_id", type: "String (inline)", size: "24 bytes", origin: "Stack", color: "text-orange-400 border-orange-500/30 bg-orange-500/5" },
    { address: "0x7fff048", variable: "is_secure", type: "bool", size: "1 byte", origin: "Stack", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
    { address: "0x55ff2b0", variable: "Post::body", type: "Allocated Vec", size: "148 bytes", origin: "Heap", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5" },
  ]);

  // Opt flags
  const [optLevel, setOptLevel] = useState<"3" | "S" | "0">("3");
  const [lto, setLto] = useState(true);
  const [panicMode, setPanicMode] = useState<"abort" | "unwind">("abort");
  const [activeTab, setActiveTab] = useState<"threads" | "memory" | "optimizations">("threads");
  const [metricLog, setMetricLog] = useState<string>("Tokio native multi-thread scheduler initialized. 8 logical cores matched.");

  const requestCountRef = useRef(0);

  // Simulated request dispatcher balancing tasks on Tokio Thread Pool
  const dispatchConcurrentRequests = () => {
    if (activeTasks > 0) return;
    setActiveTasks(48);
    setMetricLog("Dispatching 48 high-performance client scopes to Tokio worker pool. Initializing work-stealing task distribution...");

    // Spawn memory updates
    const randomPosts = ["Product::sku", "Router::rules", "SessionToken", "TelemetryLogger"];
    const randomPost = randomPosts[Math.floor(Math.random() * randomPosts.length)];
    const hexAddr = "0x55ff" + Math.floor(Math.random() * 4096).toString(16);
    const newAlloc: MemoryNode = {
      address: hexAddr,
      variable: `${randomPost}_hash`,
      type: "Stack Ref (Zero Heap Offset)",
      size: "32 bytes",
      origin: "Stack",
      color: "text-orange-400 border-orange-500/30 bg-orange-500/5",
    };
    setMemNodes((prev) => [newAlloc, ...prev.slice(0, 5)]);

    // Loop threads
    let completed = 0;
    const interval = setInterval(() => {
      setThreads((prevThreads) => {
        return prevThreads.map((t) => {
          const rand = Math.random();
          let status: WorkerThread["status"] = "IDLE";
          let load = 0;
          let taskCount = 0;

          if (rand > 0.5) {
            status = "PROCESSING";
            load = Math.floor(60 + Math.random() * 35);
            taskCount = Math.floor(2 + Math.random() * 4);
          } else if (rand > 0.35) {
            status = "STEALING";
            load = Math.floor(30 + Math.random() * 20);
            taskCount = 1;
          }

          return { ...t, status, load, taskCount };
        });
      });

      completed += 4;
      setActiveTasks((prev) => Math.max(0, prev - 4));

      if (completed >= 48) {
        clearInterval(interval);
        setActiveTasks(0);
        setThreads((prev) => prev.map((t) => ({ ...t, status: "IDLE", load: 0, taskCount: 0 })));
        setMetricLog("All 48 concurrent scopes compiled and written back in 0.12ms. Context returned.");
      }
    }, 150);
  };

  // Get total binary payload size based on Rust Cargo profile compiler configs
  const getCompiledSize = () => {
    let size = 180; // raw size in KB
    if (optLevel === "3") size -= 80;
    if (optLevel === "S") size -= 105;
    if (lto) size -= 32;
    if (panicMode === "abort") size -= 9;
    return size;
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono text-orange-400 tracking-wider font-semibold uppercase flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: '6s' }} />
          RUST NATIVE TOKIO EXECUTION PLATFORM
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-2">
          Interactive Rust Core Runtime & Thread Visualizer
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          Inspect how the Rullst v2.0.3 compiler architecture works under the hood. Manipulate CPU thread-stealing parameters, track static memory allocations, and adjust optimization flags live.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-900/80 p-1.5 rounded-xl border border-gray-800 flex space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab("threads")}
            className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === "threads" ? "bg-gray-800 text-white border border-gray-700" : "text-gray-400 hover:text-white"
            }`}
          >
            <Cpu className="w-4 h-4 text-orange-400" />
            <span>Tokio Thread-Pool</span>
          </button>
          <button
            onClick={() => setActiveTab("memory")}
            className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === "memory" ? "bg-gray-800 text-white border border-gray-700" : "text-gray-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Deterministic Memory</span>
          </button>
          <button
            onClick={() => setActiveTab("optimizations")}
            className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === "optimizations" ? "bg-gray-800 text-white border border-gray-700" : "text-gray-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4 text-teal-400" />
            <span>Cargo Compiler Flags</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "threads" && (
          <motion.div
            key="threads"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Thread Visualizer Left Column */}
            <div className="lg:col-span-8 bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-white font-display font-bold text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-orange-500" />
                    Tokio Worker Task Stealing Engine
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Rullst schedules network callbacks and routing contexts across multiple concurrent worker threads utilizing async primitives.
                  </p>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={dispatchConcurrentRequests}
                    disabled={activeTasks > 0}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                      activeTasks > 0
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-500 hover:to-amber-500 shadow shadow-orange-500/10 cursor-pointer"
                    }`}
                  >
                    <Zap className={`w-3.5 h-3.5 ${activeTasks > 0 ? "animate-pulse" : ""}`} />
                    <span>{activeTasks > 0 ? `PROCESSING (${activeTasks})` : "DISPATCH 48 JOBS"}</span>
                  </button>
                </div>
              </div>

              {/* Grid of Threads */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {threads.map((t) => (
                  <div
                    key={t.id}
                    className={`p-4 rounded-xl border transition-all duration-300 bg-gray-950/60 ${
                      t.status === "PROCESSING"
                        ? "border-orange-500/40 shadow-sm shadow-orange-500/5 bg-orange-950/[0.04]"
                        : t.status === "STEALING"
                        ? "border-cyan-500/30 bg-cyan-950/[0.03]"
                        : "border-gray-900"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-gray-500">CORE 0{t.id}</span>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                          t.status === "PROCESSING"
                            ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                            : t.status === "STEALING"
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>

                    {/* Gauge meter bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-mono text-gray-400">
                        <span>Load</span>
                        <span>{t.load}%</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div
                          style={{ width: `${t.load}%` }}
                          className={`h-full rounded-full transition-all duration-200 ${
                            t.status === "PROCESSING"
                              ? "bg-gradient-to-r from-orange-600 to-amber-500"
                              : "bg-cyan-500"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-gray-500">
                      <span>Tasks in Queue:</span>
                      <span className={t.taskCount > 0 ? "text-orange-400 font-bold" : "text-gray-500"}>
                        {t.taskCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic Console Log Panel */}
              <div className="mt-6 pt-5 border-t border-gray-900">
                <div className="bg-black/80 rounded-xl p-4 border border-gray-900 font-mono text-[11px] leading-relaxed relative">
                  <span className="absolute right-3 top-3 text-[9px] font-bold text-orange-400/80 tracking-widest">
                    TOKIO POOL CONSOLE
                  </span>
                  <p className="text-gray-400 whitespace-pre">{metricLog}</p>
                </div>
              </div>
            </div>

            {/* Threads Sidebar guide info */}
            <div className="lg:col-span-4 bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 shadow-xl flex flex-col justify-between self-stretch h-full">
              <div className="space-y-4">
                <h4 className="text-white font-semibold font-display text-base">Work-Stealing Scheduling</h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  In traditional scripting models (Node.js single-thread, PHP thread-per-request), worker nodes waiting on long-duration database operations stall completely.
                </p>
                <div className="p-3.5 bg-gray-950 rounded-xl border border-gray-900 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 block uppercase">
                    Rullst v2.0.3 Scheduler Features
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      <span>Implicit Work-Stealing scheduler</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      <span>Absolute asynchronous multi-threading</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      <span>Isomorphic clients bypassing V8 main-loop</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-900 mt-6 text-[10px] text-gray-500 font-mono flex justify-between items-center">
                <span>Scheduler: Multi-Core</span>
                <span>Active thread: 8 pools</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Deterministic Memory Tab */}
        {activeTab === "memory" && (
          <motion.div
            key="memory"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Deterministic Memory Panel Left Column */}
            <div className="lg:col-span-8 bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-white font-display font-bold text-lg flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    Stack & Heap Static Allocator Simulator
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Rust relies on compile-time RAII mechanics (Resource Acquisition Is Initialization), freeing memory blocks immediately as scopes close. No background Garbage Collectors.
                  </p>
                </div>
              </div>

              {/* Memory Node List visualization layout */}
              <div className="space-y-3">
                {memNodes.map((node, i) => (
                  <motion.div
                    key={node.address + i}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between justify-start gap-4 ${node.color}`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <span className="font-mono text-xs text-gray-500 py-1 px-1.5 rounded bg-black/60 border border-gray-900">
                        {node.address}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-white font-mono">{node.variable}</h4>
                        <span className="text-[10px] text-gray-400 block mt-0.5">{node.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-left sm:text-right font-mono">
                        <span className="text-xs text-gray-400 block">Scope Partition:</span>
                        <span className="text-xs text-white font-semibold">{node.origin}</span>
                      </div>
                      <div className="text-left sm:text-right font-mono">
                        <span className="text-xs text-gray-400 block">Block Weight:</span>
                        <span className="text-xs text-white font-bold">{node.size}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Memory Reset simulator button panel */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setMemNodes([
                      { address: "0x7fff041", variable: "tenant_id", type: "String (inline)", size: "24 bytes", origin: "Stack", color: "text-orange-400 border-orange-500/30 bg-orange-500/5" },
                      { address: "0x7fff048", variable: "is_secure", type: "bool", size: "1 byte", origin: "Stack", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
                      { address: "0x55ff2b0", variable: "Post::body", type: "Allocated Vec", size: "148 bytes", origin: "Heap", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5" },
                    ]);
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 border border-gray-800 hover:border-gray-700 bg-gray-900 rounded-xl text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Allocator</span>
                </button>
              </div>
            </div>

            {/* Sidebar memory guide info */}
            <div className="lg:col-span-4 bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 shadow-xl flex flex-col justify-between self-stretch h-full">
              <div className="space-y-4">
                <h4 className="text-white font-semibold font-display text-base">Zero Garbage Collection pauses</h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Languages built on V8 (NodeJS/Chrome) or VMs (Python, PHP, Java) allocate thousands of objects dynamically on heavy garbage-collector tables. Every few seconds, the engine blocks the worker threads to audit inactive memory blocks, producing microstalls and latency spikes.
                </p>
                <div className="p-3 border border-orange-500/15 rounded-xl bg-orange-500/[0.015]">
                  <strong className="text-xs font-mono text-orange-400 block font-semibold mb-1">
                    Compiled Binary Integrity
                  </strong>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    By compiling declarative scopes into native Rust, Rullst drops GC-related code packages 100% — assuring that memory footprints float stably around 12.4 MB.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-900 mt-6 text-[10px] text-gray-500 font-mono flex justify-between items-center">
                <span>Core state: STATED</span>
                <span>Audit: 100% static</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cargo optimizations playground Tab */}
        {activeTab === "optimizations" && (
          <motion.div
            key="optimizations"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Optimizations Config Panel Left Column */}
            <div className="lg:col-span-8 bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-xl">
              <h3 className="text-white font-display font-bold text-lg flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-teal-400" />
                Active cargo-compiler optimization profile [release]
              </h3>

              <div className="space-y-6">
                {/* Selector 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-mono font-medium text-gray-300 uppercase tracking-wider">
                      Compilation Opt-Level
                    </label>
                    <span className="text-[10px] text-gray-500 block mt-0.5">Control optimization loops</span>
                  </div>
                  <div className="sm:col-span-2 flex space-x-2.5 bg-gray-950 p-1 rounded-xl border border-gray-900">
                    {[
                      { val: "3", label: "Level 3 (Max speed)" },
                      { val: "S", label: "Level S (Optimize size)" },
                      { val: "0", label: "Level 0 (Debug bounds)" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setOptLevel(opt.val as any)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                          optLevel === opt.val
                            ? "bg-gray-800 text-white border border-gray-700 font-bold"
                            : "text-gray-400 hover:text-white hover:bg-gray-900"
                        }`}
                        type="button"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selector 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-mono font-medium text-gray-300 uppercase tracking-wider">
                      Link-Time Optimizations (LTO)
                    </label>
                    <span className="text-[10px] text-gray-500 block mt-0.5">Strip cross-crate boundaries</span>
                  </div>
                  <div className="sm:col-span-2 flex space-x-2.5 bg-gray-950 p-1 rounded-xl border border-gray-900">
                    <button
                      onClick={() => setLto(true)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                        lto
                          ? "bg-teal-500/10 text-teal-400 border border-teal-500/30 font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                      type="button"
                    >
                      cargo-lto = true (Enabled)
                    </button>
                    <button
                      onClick={() => setLto(false)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                        !lto
                          ? "bg-gray-800 text-white border border-gray-700 font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                      type="button"
                    >
                      Disabled
                    </button>
                  </div>
                </div>

                {/* Selector 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-mono font-medium text-gray-300 uppercase tracking-wider">
                      Panic Strategy
                    </label>
                    <span className="text-[10px] text-gray-500 block mt-0.5">Control unwind heap blocks</span>
                  </div>
                  <div className="sm:col-span-2 flex space-x-2.5 bg-gray-950 p-1 rounded-xl border border-gray-900">
                    <button
                      onClick={() => setPanicMode("abort")}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                        panicMode === "abort"
                          ? "bg-orange-500/10 text-orange-400 border border-orange-500/30 font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                      type="button"
                    >
                      panic = "abort" (No Unwind)
                    </button>
                    <button
                      onClick={() => setPanicMode("unwind")}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                        panicMode === "unwind"
                          ? "bg-gray-800 text-white border border-gray-700 font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                      type="button"
                    >
                      panic = "unwind"
                    </button>
                  </div>
                </div>
              </div>

              {/* Recompilation preview snippet block */}
              <div className="mt-8 border-t border-gray-800/80 pt-6">
                <h4 className="text-xs font-mono font-medium text-gray-300 uppercase tracking-wider mb-2">
                  Active Cargo.toml Compilation Profile Definition
                </h4>
                <div className="bg-gray-950 rounded-xl border border-gray-900 p-4 font-mono text-xs text-gray-400 leading-relaxed">
                  <span className="text-gray-500"># Generated at compile cycle</span>
                  <br />
                  <span className="text-orange-500">[profile.release]</span>
                  <br />
                  <span>opt-level = </span>
                  <strong className="text-white">{optLevel === "3" ? '"3"' : optLevel === "S" ? '"z"' : '"0"'}</strong>
                  <br />
                  <span>lto = </span>
                  <strong className="text-white">{lto ? "true" : "false"}</strong>
                  <br />
                  <span>panic = </span>
                  <strong className="text-white">"{panicMode}"</strong>
                  <br />
                  <span>codegen-units = </span>
                  <strong className="text-white">{lto ? "1" : "16"}</strong>
                </div>
              </div>
            </div>

            {/* Compiled code outputs sidebar */}
            <div className="lg:col-span-4 bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 shadow-xl flex flex-col justify-between self-stretch h-full">
              <div className="space-y-4">
                <h4 className="text-white font-semibold font-display text-base">Payload Weight Analysis</h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Traditional front-end systems package heavy virtual DOM architectures inside JavaScript bundles. Rullst compiles code into raw LLVM target layouts, resulting in extremely compressed outputs.
                </p>

                {/* Animated gauge meter */}
                <div className="bg-gray-950 p-5 rounded-xl border border-gray-900 text-center">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">
                    PRODUCED CLIENT .WASM FILE
                  </span>
                  <span className="text-3xl font-extrabold font-display text-orange-400 mt-2 block animate-pulse">
                    {getCompiledSize()} KB
                  </span>
                  <div className="w-full bg-gray-900 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div
                      style={{ width: `${(getCompiledSize() / 180) * 100}%` }}
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                    />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 mt-2 block">
                    Optimization score: {lto && optLevel !== "0" ? "EXTREME" : "DEVELOPMENT"}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-900 mt-6 text-[10px] text-gray-500 font-mono flex justify-between items-center">
                <span>Targets: wasm32-unknown</span>
                <span>Compiler: rustc stable</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
