import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { comparisonsCode } from "../data";
import { Database, Plus, RefreshCw, CheckCircle2, Code } from "lucide-react";

export default function OrmVisualizer() {
  const [activeComparison, setActiveComparison] = useState<"rullst" | "axum" | "nextjs" | "django" | "leptos">("rullst");
  const [dbPosts, setDbPosts] = useState<Array<{ id: number; tenant: string; title: string; body: string }>>([
    { id: 1, tenant: "tenant1", title: "Clean Energy Breakthrough", body: "How Stark Industries expanded the micro-grid capacity." },
    { id: 2, tenant: "tenant2", title: "Advanced Armor Plating", body: "Liquid carbon composite armor tested at Mach 4." },
  ]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newTenant, setNewTenant] = useState("tenant1");
  const [ormLog, setOrmLog] = useState<string>("ActiveRecord structures ready. Save a new record to trigger recompiled queries.");
  const [isInserting, setIsInserting] = useState(false);

  const activeSnippet = comparisonsCode[activeComparison];

  const handleSimulateInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newBody) return;

    setIsInserting(true);
    setOrmLog("Executing procedural macro dylib. Invoking ActiveRecord runtime connection pool...");

    setTimeout(() => {
      const nextId = dbPosts.length > 0 ? Math.max(...dbPosts.map(p => p.id)) + 1 : 1;
      const newPost = {
        id: nextId,
        tenant: newTenant,
        title: newTitle,
        body: newBody,
      };

      setDbPosts(prev => [newPost, ...prev]);
      setOrmLog(`EXECUTED: let mut post = Post { id: 0, tenant_id: "${newTenant}".to_string(), title: "${newTitle}".to_string(), body: "..." }; post.save().await?;\nReturned physical SQLite Insert ID: ${nextId}. Database transaction execution completed in: 0.04ms`);
      setNewTitle("");
      setNewBody("");
      setIsInserting(false);
    }, 800);
  };

  const handleResetDb = () => {
    setDbPosts([
      { id: 1, tenant: "tenant1", title: "Clean Energy Breakthrough", body: "How Stark Industries expanded the micro-grid capacity." },
      { id: 2, tenant: "tenant2", title: "Advanced Armor Plating", body: "Liquid carbon composite armor tested at Mach 4." },
    ]);
    setOrmLog("Database context reset back to original default entries.");
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono text-orange-400 tracking-wider font-semibold uppercase">
          REVOLUTIONARY DATABASE ACCESS IN RUST
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1 tracking-tight">
          Supercharged ActiveRecord ORM Orchestration
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          Bypass heavy SQL boilerplate structures and repetitive configurations. Rullst unifies models with physical connection pools, executing sub-millisecond database queries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Simulation form of ActiveRecord live */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 shadow-xl">
            <h3 className="text-lg font-bold font-display text-white mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Database className="w-5 h-5 text-orange-400 animate-pulse" />
                Active Record Simulator
              </span>
              <button
                onClick={handleResetDb}
                className="text-xs font-mono flex items-center space-x-1 px-2.5 py-1 text-gray-400 hover:text-white bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                type="button"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </h3>

            {/* Input Form */}
            <form onSubmit={handleSimulateInsert} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-gray-300 uppercase tracking-wider mb-1.5">
                  Post Header (post.title)
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Nanotechnology AI Expansion"
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl focus:border-orange-500/50 focus:outline-none text-sm text-gray-200 transition-colors placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-gray-300 uppercase tracking-wider mb-1.5">
                  Post Body (post.body)
                </label>
                <textarea
                  required
                  rows={2}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="e.g., Liquid energy storage passed thermal pressure metrics..."
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl focus:border-orange-500/50 focus:outline-none text-sm text-gray-200 transition-colors placeholder:text-gray-600 resize-none"
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-gray-300 uppercase tracking-wider mb-1.5">
                    Tenant Scope Context
                  </label>
                  <select
                    value={newTenant}
                    onChange={(e) => setNewTenant(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-xl focus:border-orange-500/50 focus:outline-none text-xs text-gray-200 transition-colors font-mono cursor-pointer"
                  >
                    <option value="tenant1">Stark Industries</option>
                    <option value="tenant2">Wayne Enterprises</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isInserting}
                    className="w-full group py-2.5 px-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-xs rounded-xl shadow shadow-orange-500/10 cursor-pointer disabled:opacity-70"
                  >
                    <Plus className="w-4 h-4 animate-bounce" />
                    <span>{isInserting ? "SAVING..." : "RUN post.save()"}</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Orm Logger Console */}
            <div className="mt-5 pt-4 border-t border-gray-800/80">
              <div className="bg-black/80 rounded-xl border border-gray-900 p-3.5 font-mono text-[11px] leading-relaxed relative">
                <span className="absolute right-3 top-3 text-[9px] text-orange-400/80 font-bold tracking-wider">
                  DYNAMIC LOG PIPELINE
                </span>
                <p className="text-gray-400 whitespace-pre-wrap">{ormLog}</p>
              </div>
            </div>
          </div>

          {/* Table simulation view */}
          <div className="bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-4 font-semibold">
                SQLITE DATABASE REGISTRY STATE
              </span>

              <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {dbPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -15, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="p-3 bg-gray-950/80 border border-gray-800/80 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div className="truncate">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[9px] font-mono text-gray-500 bg-gray-900 border border-gray-800 px-1 rounded">
                            ID: {post.id}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1.5 rounded-full ${
                              post.tenant === "tenant1"
                                ? "bg-orange-500/10 text-orange-400 border border-orange-500/50"
                                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/50"
                            }`}
                          >
                            {post.tenant}
                          </span>
                        </div>
                        <h4 className="text-xs text-white font-semibold truncate mt-1">{post.title}</h4>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 font-mono">SQLite (0.04ms)</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800/50 flex justify-between items-center text-[10px] text-gray-500">
              <span>Secure isolated storage bounds</span>
              <span>Total rows: {dbPosts.length}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Code comparing tabs */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="rounded-2xl border border-gray-800 bg-[#060a12]/90 shadow-2xl overflow-hidden flex flex-col h-full justify-between">
            <div>
              {/* Card headers comparison */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-gray-900/60 border-b border-gray-800 gap-3">
                <div className="flex items-center space-x-2.5">
                  <Code className="w-5 h-5 text-orange-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Comparative Database Syntax Analysis</h3>
                    <p className="text-[10px] text-gray-400 -mt-0.5">Full framework database configurations and query layouts compared</p>
                  </div>
                </div>

                {/* Framework Selector Tabs */}
                <div className="grid grid-cols-2 xs:flex flex-wrap gap-1 bg-gray-950 p-1.5 rounded-xl border border-gray-800">
                  <button
                    onClick={() => setActiveComparison("rullst")}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                      activeComparison === "rullst"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                    type="button"
                  >
                    Rullst
                  </button>
                  <button
                    onClick={() => setActiveComparison("axum")}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                      activeComparison === "axum"
                        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                    type="button"
                  >
                    Axum
                  </button>
                  <button
                    onClick={() => setActiveComparison("nextjs")}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                      activeComparison === "nextjs"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                    type="button"
                  >
                    Next.js
                  </button>
                  <button
                    onClick={() => setActiveComparison("django")}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                      activeComparison === "django"
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                    type="button"
                  >
                    Django
                  </button>
                  <button
                    onClick={() => setActiveComparison("leptos")}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                      activeComparison === "leptos"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                    type="button"
                  >
                    Leptos
                  </button>
                </div>
              </div>

              {/* Tab Code display details */}
              <div className="p-6 overflow-x-auto font-mono text-xs sm:text-sm text-gray-300 leading-relaxed max-h-[380px] overflow-y-auto">
                <pre>{activeSnippet.code}</pre>
              </div>
            </div>

            {/* Explanation panel */}
            <div className="bg-gray-950/60 p-5 border-t border-gray-800/80 flex items-start gap-3.5 text-xs sm:text-sm text-gray-400 leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-display mb-1">{activeSnippet.title}</strong>
                {activeSnippet.explanation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
