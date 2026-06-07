import React from "react";
import { Terminal, Shield, Zap, Database, GitBranch, Cpu, Activity } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: "hero", label: "Home", icon: Zap },
    { id: "benchmarks", label: "Benchmarks", icon: Activity },
    { id: "syntax", label: "Syntax Tour", icon: Terminal },
    { id: "orm", label: "ActiveRecord ORM", icon: Database },
    { id: "multitenancy", label: "Multi-Tenancy", icon: Shield },
    { id: "runtime", label: "Runtime Core", icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-800 bg-[#030712]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand with custom SVG Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("hero")}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 shadow-lg shadow-orange-500/20">
              {/* Custom High-Quality SVG Rullst Logo */}
              <svg
                viewBox="0 0 100 100"
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Stylized geometric 'R' merging into an orbit loop */}
                <path d="M25 80 V20 H55 C70 20, 75 35, 55 48 H25 M50 48 L75 80" />
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4" strokeDasharray="14 10" className="animate-spin" style={{ animationDuration: '24s' }} />
              </svg>
              <div className="absolute -inset-0.5 rounded-xl bg-orange-600 blur opacity-10 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold tracking-tight text-white flex items-center">
                Rullst <span className="text-xs bg-orange-500/15 text-orange-400 font-mono font-medium px-1.5 py-0.5 rounded ml-2 border border-orange-500/10">v2.0.3</span>
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-wider">MICROSECOND ENGINE</span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex space-x-1.5 bg-gray-900/60 p-1 rounded-xl border border-gray-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/10"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500 group-hover:text-white"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs font-mono text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
              <span>STABLE CORE</span>
            </span>

            <a
              href="https://github.com/venelouis/Rullst"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 px-4 py-1.5 border border-gray-700 hover:border-gray-500 bg-gray-900/40 hover:bg-gray-800 rounded-lg text-xs font-mono transition-all duration-200 text-gray-300"
            >
              <GitBranch className="w-3.5 h-3.5 text-gray-400" />
              <span>venelouis/Rullst</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
