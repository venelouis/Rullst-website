import React, { useState } from "react";
import { Terminal, Copy, Check, Play, Square, Cpu } from "lucide-react";

interface TerminalCommand {
  cmd: string;
  name: string;
  desc: string;
  output: string;
}

export default function CliTerminal() {
  const [activeCmdIdx, setActiveCmdIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cliOutput, setCliOutput] = useState<string>("Welcome to the Rullst interactive console. Pick a command and click 'RUN COMMAND' to observe live CLI simulation.");
  const [copied, setCopied] = useState(false);

  const commands: TerminalCommand[] = [
    {
      cmd: "cargo rullst dev",
      name: "Start Dev Server (Hot)",
      desc: "Instantiates compilation pipelines and triggers dynamic dylib loading pools on port 3000.",
      output: `Rullst CLI Engine v2.0.3 Stable
Compiling project_source (librullst_blog_example) in background...
[COMPILER READY] Dynamic shared library linked in 14.2ms!
[HOT RELOAD] Listening for file modifications under src/

Server instance booting...
● SQLite connection established successfully at: sqlite://blog.db
● Active artisan scripts interceptor mapped: rullst::artisan!([])
● Dynamic tenancy routing loaded in background.

[HTTP] Listening on http://0.0.0.0:3000
Press [Ctrl+C] to gracefully detach thread loops.`,
    },
    {
      cmd: "cargo rullst artisan make:model Product",
      name: "ActiveRecord Scaffold",
      desc: "Generates structured model layouts and auto-appends reactive Rust migration schema.",
      output: `Rullst CLI Engine v2.0.3 Stable
Evaluating database schemas...
Scaffolding active record models...

● File created: src/app/product.rs
● Structure appended to schema macros registry.
● Auto-generated model mapping: Product { id: i64, tenant_id: String, name: String, sku: String }

Scaffolding DB Migrations audit:
● Migration file created: migrations/20260607_create_products_table.sql
Run 'cargo rullst db:migrate' to apply.`,
    },
    {
      cmd: "cargo rullst db:migrate",
      name: "Database Sync Migrations",
      desc: "Applies SQL migrations securely to target SQLite/PostgreSQL connectors.",
      output: `Rullst CLI Engine v2.0.3 Stable
Connecting to database: sqlite://blog.db
Inspecting internal migration ledger table...

● Running Migration: 20260607_create_products_table.sql
  - Column created: id (INTEGER PRIMARY KEY)
  - Column created: tenant_id (TEXT NOT NULL)
  - Column created: name (TEXT NOT NULL)
  - Column created: sku (TEXT NOT NULL)
  
Executing schema validation scripts...
[OK] SQLite table configuration matching rust ActiveRecord metadata in 4.5ms!`,
    },
    {
      cmd: "cargo rullst studio",
      name: "Launch Rullst Studio",
      desc: "Provides an offline-first visual panel to trace memory pools, query performance, and active threads.",
      output: `Rullst CLI Engine v2.0.3 Stable
Resolving local dashboard modules...
Starting Studio reverse proxy tunnel...

● Admin Interface served at: http://localhost:8000
● Real-time WebSocket event bus created.
● Inspecting threads: 8 Active thread pools matched.
● Database diagnostics: sqlite://blog.db (Size: 24KB - All queries optimal)

Press [Ctrl+C] to close Studio session.`,
    },
  ];

  const activeCmd = commands[activeCmdIdx];

  const runCommand = () => {
    setIsRunning(true);
    setCliOutput("Loading Cargo binaries... Synchronizing concurrent thread pools...");
    
    setTimeout(() => {
      setCliOutput(activeCmd.output);
      setIsRunning(false);
    }, 900);
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(activeCmd.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Visual Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Lightning-Fast Interactive CLI Tools
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          Harness our unified dev utility: write <span className="font-mono text-orange-400">cargo-rullst</span> on standard shells and run macro commands instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation list */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
            AVAILABLE SYSTEM COMMANDS
          </span>
          {commands.map((c, i) => (
            <button
              key={c.cmd}
              onClick={() => {
                setActiveCmdIdx(i);
                setCliOutput("Console ready. Click 'RUN COMMAND' to dispatch simulated instructions.");
              }}
              className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 ${
                activeCmdIdx === i
                  ? "bg-cyan-500/[0.03] border-cyan-500/30 shadow-sm"
                  : "bg-gray-900/40 border-gray-800 hover:bg-gray-900/80 hover:border-gray-700"
              }`}
              type="button"
            >
              <div className="flex justify-between items-center w-full">
                <span className={`font-mono text-xs font-semibold ${activeCmdIdx === i ? "text-cyan-400" : "text-gray-200"}`}>
                  {c.cmd}
                </span>
              </div>
              <span className="text-[11px] text-gray-400 mt-2 font-display leading-relaxed">
                {c.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Console view terminal */}
        <div className="lg:col-span-8 rounded-2xl border border-gray-800 bg-[#02050a]/95 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between self-stretch h-full">
          <div>
            {/* Topbar */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-900 mb-4 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                <span className="text-gray-400 ml-1">Rullst Dev Console</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={copyCommand}
                  className="p-1 px-2 hover:bg-gray-900 border border-transparent hover:border-gray-800 rounded bg-gray-950 text-gray-400 hover:text-white transition-all text-[10px]"
                  type="button"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400 inline" /> : <Terminal className="w-3.5 h-3.5 inline mr-1 text-gray-400" />}
                  <span>{copied ? "Copied!" : "Copy Command"}</span>
                </button>
                <button
                  onClick={runCommand}
                  disabled={isRunning}
                  className="p-1 px-2.5 hover:bg-emerald-950/20 border border-emerald-500/20 hover:border-emerald-500/50 rounded bg-emerald-500/10 text-emerald-400 font-bold transition-all text-[10px] flex items-center gap-1 cursor-pointer disabled:opacity-70"
                  type="button"
                >
                  {isRunning ? <Square className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3" />}
                  <span>RUN COMMAND</span>
                </button>
              </div>
            </div>

            {/* Inputs prompt line */}
            <div className="flex items-center space-x-1.5 font-mono text-xs sm:text-sm text-gray-500 mb-4 bg-gray-950 p-2.5 rounded border border-gray-900/60">
              <span className="text-orange-500">➜</span>
              <span className="text-gray-400">~/venelouis/rullst-project</span>
              <span className="text-gray-200">{activeCmd.cmd}</span>
            </div>

            {/* Simulated output logging scrolling */}
            <div className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed overflow-x-auto min-h-[190px] max-h-[290px] overflow-y-auto whitespace-pre pr-2 bg-black/40 p-4 rounded-xl border border-gray-900">
              {cliOutput}
            </div>
          </div>

          <div className="border-t border-gray-900/85 pt-4 mt-6 flex justify-between items-center text-[10px] text-gray-500 font-mono">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> CLI Core Thread: Mapped
            </span>
            <span>OS: Linux / MacOS / Windows dylib loader</span>
          </div>
        </div>
      </div>
    </div>
  );
}
