import React from "react";
import { motion } from "motion/react";
import { Zap, Shield, Cpu, Flame, CheckCircle, ArrowRight } from "lucide-react";

interface HeroProps {
  onExplore: (tab: string) => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Dynamic Blur Overlays */}
      <div className="absolute top-1/4 right-0 glow-bg-primary w-[350px] h-[350px] -z-10 bg-orange-600/10 rounded-full"></div>
      <div className="absolute bottom-1/4 left-0 glow-bg-cyan w-[380px] h-[380px] -z-10 bg-cyan-500/5 rounded-full"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left Column: Visual copy & Taglines */}
        <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
          <motion.div variants={itemVariants} className="inline-flex">
            <span className="flex items-center space-x-1 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-mono font-medium text-orange-400">
              <Flame className="w-3.5 h-3.5" />
              <span>THE FUTURE OF FULL-STACK DEVELOPMENT WITH RUST</span>
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight sm:leading-none"
          >
            Written in <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Rust</span>.
            <br />
            Rendered in <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Microseconds</span>.
            <br />
            Secure by Default.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-gray-300 leading-relaxed max-w-2xl">
            Imagine combining the rapid productivity of Laravel's **ActiveRecord** and Django's structured layouts with the component-driven reactivity of **React**, built directly on top of Rust's raw, compile-time memory safety. Rullst unifies client WASM and server SSR without heavy hydration loops, bloated JavaScript bundlers, or manual SQL boilerplate.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onExplore("benchmarks")}
              className="group flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium rounded-xl hover:from-orange-500 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-orange-500/15"
            >
              <span>Explore Benchmark Arena</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => onExplore("syntax")}
              className="flex items-center justify-center space-x-2 px-6 py-3.5 border border-gray-700 bg-gray-900/40 hover:bg-gray-800 transition-colors duration-200 text-gray-200 font-medium rounded-xl"
            >
              <span>Explore Template DSL</span>
            </button>
          </motion.div>

          {/* Key Framework Pillars List */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-gray-800/80">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-medium text-sm">Isomorphic WASM Runtime</h4>
                <p className="text-xs text-gray-400 mt-1">Blazing-fast reactivity powered by client-side static Wasm compilation.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-medium text-sm">Database ActiveRecord</h4>
                <p className="text-xs text-gray-400 mt-1">Eloquent-style ergonomics coupled with strictly safe compile-time queries.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-medium text-sm">Implicit Multi-Tenancy</h4>
                <p className="text-xs text-gray-400 mt-1">Automated tenant data boundary protection scoped naturally in async thread states.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-medium text-sm">Dynamic Hot-Reloading</h4>
                <p className="text-xs text-gray-400 mt-1">Dynamically hot-swaps active routes by mounting shared libraries in milliseconds.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual Code Demonstration Box / Live Badge */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-gray-800 bg-[#090d16]/80 p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Visual Glassmorphism highlight */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-cyan-500"></div>

            {/* Simulated Editor Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-xs font-mono text-gray-400 ml-2">app/components/welcome.rullst</span>
              </div>
              <span className="text-[10px] font-mono py-0.5 px-1.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                ACTIVE RECORD DSL
              </span>
            </div>

            {/* Interactive Preview Mock */}
            <div className="space-y-4 font-mono text-xs sm:text-sm text-gray-300">
              <p className="text-purple-400">
                <span className="text-gray-500">1</span> # "Hello, World!"
              </p>
              <p className="text-orange-400">
                <span className="text-gray-500">2</span> "Written in Rust. Rendered in microseconds."
              </p>
              <p className="text-gray-400">
                <span className="text-gray-500">3</span>
              </p>
              <p className="text-cyan-400">
                <span className="text-gray-500">4</span> # "Total Active Users: " &#123;users.len()&#125;
              </p>
              <p className="text-gray-400">
                <span className="text-gray-500">5</span>
              </p>
              <p className="text-emerald-400">
                <span className="text-gray-500">6</span> #[rullst_orm::model]
              </p>
              <p className="text-yellow-400">
                <span className="text-gray-500">7</span> pub struct User &#123;
              </p>
              <p className="text-gray-200">
                <span className="text-gray-500">8</span> &nbsp;&nbsp;&nbsp;&nbsp;pub name: String,
              </p>
              <p className="text-gray-200">
                <span className="text-gray-500">9</span> &nbsp;&nbsp;&nbsp;&nbsp;pub role: String,
              </p>
              <p className="text-yellow-400">
                <span className="text-gray-500">10</span> &#125;
              </p>
            </div>

            {/* Stats display box inside layout */}
            <div className="mt-8 grid grid-cols-3 gap-3 pt-6 border-t border-gray-800">
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 text-center">
                <div className="text-xl sm:text-2xl font-bold font-display text-orange-500">0.12ms</div>
                <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-mono">Response Time</div>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 text-center">
                <div className="text-xl sm:text-2xl font-bold font-display text-cyan-400">12.4 MB</div>
                <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-mono">RAM Footprint</div>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 text-center">
                <div className="text-xl sm:text-2xl font-bold font-display text-teal-400">Zero</div>
                <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-mono">JS Hydration</div>
              </div>
            </div>
          </motion.div>

          {/* Underlay glowing decoration elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tr from-amber-600 to-orange-500 blur-2xl opacity-20 -z-10"></div>
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-500/10 blur-2xl opacity-20 -z-10"></div>
        </div>
      </motion.div>
    </section>
  );
}
