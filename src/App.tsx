/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BenchmarkArena from "./components/BenchmarkArena";
import SyntaxTour from "./components/SyntaxTour";
import OrmVisualizer from "./components/OrmVisualizer";
import MultiTenancySandbox from "./components/MultiTenancySandbox";
import RuntimeVisualizer from "./components/RuntimeVisualizer";
import CliTerminal from "./components/CliTerminal";
import BottomSection from "./components/BottomSection";
import { Zap, CircleAlert, ExternalLink } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("hero");

  const handleSetActiveTab = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      // Offset for sticky header
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Custom hook to set active tab as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "benchmarks", "syntax", "orm", "multitenancy", "runtime", "cli"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col relative selection:bg-orange-500/25 selection:text-orange-300">
      {/* Absolute Decorative Grid Pattern Background */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Global Architectural Disclaimer Banner */}
      <div className="relative z-50 bg-gradient-to-r from-red-950/40 via-orange-950/30 to-red-950/40 border-b border-orange-500/20 px-4 py-3 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2.5 text-orange-200/95">
          <CircleAlert className="w-4 h-4 text-orange-400 shrink-0 animate-pulse" />
          <p className="text-xs font-mono tracking-wide">
            <span className="text-orange-400 font-bold uppercase mr-1.5">[ARCHITECTURAL DISCLAIMER]</span>
            Please note that the technical specifications, performance benchmarks, and features presented on this landing page are part of a conceptual showcase and may contain inaccurate or simulated information. Refer to the official files for actual codebase metrics.
          </p>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <Header activeTab={activeTab} setActiveTab={handleSetActiveTab} />

      {/* Main Single Page Marketing Journey Layout */}
      <main className="flex-grow z-10">
        
        {/* HERO SECTION */}
        <div id="hero" className="scroll-mt-24">
          <Hero onExplore={handleSetActiveTab} />
        </div>

        {/* COMPILER INTERACTIVE STATS / CALLOUT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-orange-500/[0.05] via-transparent to-cyan-500/[0.03] border border-gray-800/80 p-5 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Rullst Framework (Isomorphic & Universal)</h3>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  Compiles system views directly into light native binaries and WebAssembly payloads, eliminating slow hydration loops and startup delays.
                </p>
              </div>
            </div>
            <a
              href="https://github.com/venelouis/Rullst"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-4 py-2 bg-gray-900 border border-gray-800 hover:border-gray-700 hover:text-white rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer shrink-0"
            >
              <span>View Rullst Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* BENCHMARK ARENA */}
        <div id="benchmarks" className="scroll-mt-24 border-t border-gray-900 bg-[#040812]/20">
          <BenchmarkArena />
        </div>

        {/* SYNTAX TOUR PLAYGROUND */}
        <div id="syntax" className="scroll-mt-24 border-t border-gray-900 bg-gradient-to-b from-transparent to-[#040810]/30">
          <SyntaxTour />
        </div>

        {/* ACTIVE RECORD database ORM SECTION */}
        <div id="orm" className="scroll-mt-24 border-t border-gray-900 bg-[#03060c]">
          <OrmVisualizer />
        </div>

        {/* MULTI TENANCY sandboxed isolation SECTION */}
        <div id="multitenancy" className="scroll-mt-24 border-t border-gray-900 bg-gradient-to-b from-transparent to-[#040812]/50">
          <MultiTenancySandbox />
        </div>

        {/* RUNTIME PLATFORM VISUALIZER SECTION */}
        <div id="runtime" className="scroll-mt-24 border-t border-gray-900 bg-[#030712]">
          <RuntimeVisualizer />
        </div>

        {/* CLI TERMINAL COMMANDS PREVIEW */}
        <div id="cli" className="scroll-mt-24 border-t border-gray-900 bg-[#02050b]">
          <CliTerminal />
        </div>

        {/* TECHNICAL DISCLOSURE BANNER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-6 rounded-2xl bg-gray-950 border border-gray-900 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center space-x-3.5 md:col-span-2">
              <CircleAlert className="w-6 h-6 text-orange-500 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <h4 className="text-white text-xs sm:text-sm font-semibold">Critical Architectural Note: Rullst Compilation</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Unlike Next.js and traditional React SPAs that force your client browser to compile heavy JavaScript runtimes over high-overhead engines, Rullst natively translates your entire reactive view-layer into static, sub-millisecond compiled Rust binary streams.
                </p>
              </div>
            </div>
            <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 text-center flex flex-col justify-center items-center h-full">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Average Response Acceleration</span>
              <span className="text-2xl font-bold font-display text-emerald-400 mt-1">150x Faster</span>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER & CTA CONCLUSIONS */}
      <BottomSection onNavigateTab={handleSetActiveTab} />
    </div>
  );
}
