import React from "react";
import { GitBranch, Flame, Shield, ArrowUpRight, CircleAlert } from "lucide-react";

interface BottomSectionProps {
  onNavigateTab: (tab: string) => void;
}

export default function BottomSection({ onNavigateTab }: BottomSectionProps) {
  return (
    <footer className="relative bg-[#02050a] border-t border-gray-900 pt-16 pb-12 overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] glow-bg-primary opacity-20 -z-10 bg-orange-600/30 rounded-full"></div>
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] glow-bg-cyan opacity-20 -z-10 bg-cyan-400/20 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Call To Action Card */}
        <div className="bg-gradient-to-tr from-[#0a0f1d] to-[#040810] border border-gray-800 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden mb-16 shadow-2xl">
          <div className="absolute -inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-cyan-500"></div>

          <div className="max-w-2xl mx-auto">
            <span className="flex items-center space-x-1 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-mono font-medium text-orange-400 w-fit mx-auto mb-6">
              <Flame className="w-3.5 h-3.5" />
              <span>RULLST ISOMORPHIC DEVELOPMENT FRAMEWORK</span>
            </span>

            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Ready to Develop Without Performance Bounds?
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
              Rullst redefines modern web architectures by merging isomorphic client WASM execution with safe thread-local multi-tenancy. Write standard Rust with the productivity of dynamic, high-level languages.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/venelouis/Rullst"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-orange-500 bg-orange-500/10 hover:bg-orange-500 hover:text-white transition-all text-orange-400 font-semibold rounded-xl text-sm"
              >
                <span>Official GitHub Repository</span>
                <GitBranch className="w-4 h-4 ml-1 animate-pulse" />
              </a>
              <button
                onClick={() => onNavigateTab("syntax")}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-200 hover:text-white transition-all rounded-xl text-sm cursor-pointer"
                type="button"
              >
                <span>Explore Compiled Syntax</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Informative Footer grids */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-900 text-xs sm:text-sm text-gray-400">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
              <span className="text-white font-display font-bold tracking-tight text-lg">Rullst</span>
            </div>
            <p className="leading-relaxed max-w-sm text-gray-400 text-xs sm:text-sm">
              A pioneering open-source framework authored by engineer <strong>vene louis</strong>. Dedicated to unifying isomorphic client WASM execution with absolute microsecond ActiveRecord models natively inside Rust.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold font-display tracking-wider mb-3.5 uppercase text-xs">Structure Navigator</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTab("benchmarks")} className="hover:text-white font-mono transition-colors cursor-pointer">⚡ Benchmark Arena</button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("syntax")} className="hover:text-white font-mono transition-colors cursor-pointer">➜ Compiled Rust Syntax</button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("orm")} className="hover:text-white font-mono transition-colors cursor-pointer font-semibold">◆ ActiveRecord Workspace</button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("multitenancy")} className="hover:text-white font-mono transition-colors cursor-pointer">🛡 SaaS Multi-Tenancy Sandbox</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold font-display tracking-wider mb-3.5 uppercase text-xs">Enterprise Shield Protocol</h4>
            <div className="bg-cyan-500/[0.015] border border-cyan-500/10 p-3.5 rounded-xl">
              <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 font-bold">
                <Shield className="w-3.5 h-3.5" /> ACTIVE SHIELD GUARDIAN
              </span>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                All variables initialized via multitenant::TENANT_CONTEXT are isolated inside tokio-runtime task-local bounds, preventing cross-tenant security vulnerabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Global Architectural Disclaimer Banner */}
        <div className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-red-950/20 via-orange-950/15 to-red-950/20 border border-orange-500/20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
            <CircleAlert className="w-5 h-5 text-orange-400 shrink-0 animate-pulse" />
            <p className="text-xs font-mono tracking-wide text-orange-200/90 leading-relaxed max-w-4xl">
              <span className="text-orange-400 font-bold uppercase mr-2">[ARCHITECTURAL DISCLAIMER]</span>
              Please note that the technical specifications, performance benchmarks, and features presented on this landing page are part of a conceptual showcase and may contain inaccurate or simulated information. Refer to the official files for actual codebase metrics.
            </p>
          </div>
        </div>

        {/* License & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-xs gap-4">
          <span>
            © 2026 Rullst Open-Source Framework. Released under Apache-2.0.
          </span>
          <span className="flex items-center gap-1 font-mono">
            Crafted for <strong className="text-gray-300">venelouis Rullst Project</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
