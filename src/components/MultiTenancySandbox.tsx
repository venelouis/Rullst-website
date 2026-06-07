import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { tenantSandboxStore } from "../data";
import { ShieldCheck, ShieldAlert, Key, Lock, Unlock } from "lucide-react";

export default function MultiTenancySandbox() {
  const [selectedTenant, setSelectedTenant] = useState<"tenant1" | "tenant2">("tenant1");
  const [isHacking, setIsHacking] = useState(false);
  const [attackLog, setAttackLog] = useState<string | null>(null);
  const [activeConsoleLog, setActiveConsoleLog] = useState<string>(
    "Tenant isolation bounds online. Thread task scoped state active for 'tenant1'."
  );

  const activeTenantData = tenantSandboxStore.find(t => t.id === selectedTenant)!;

  const handleTenantChange = (tenantId: "tenant1" | "tenant2") => {
    setSelectedTenant(tenantId);
    setAttackLog(null);
    setActiveConsoleLog(
      `CONTEXT_CHANGED: multitenant::TENANT_CONTEXT thread-scoped context moved to "${tenantId}".\nAll ActiveRecord database operations will implicitly filter physical queries with a "tenant_id = '${tenantId}'" constraint.`
    );
  };

  const simulateHpeAttack = () => {
    setIsHacking(true);
    setAttackLog("Initiating multi-tenant scanning exploit... Attacking Horizontal Privilege Escalation vector...");
    
    setTimeout(() => {
      setAttackLog(
        `[ATTACK_BLOCKED]: Cross-tenant access attempt intercepted by Rullst ORM.\nSecurity Alert: Thread execution context blocked unauthorized lookup on foreign rows inside SQLite database.\nRullst context engine successfully isolated the hacker thread.`
      );
      setActiveConsoleLog(
        `SECURITY_ALERT: External malicious intrusion attempt mitigated in 0.02ms. Zero rows leaked to unauthorized socket channels.`
      );
      setIsHacking(false);
    }, 1500);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono text-cyan-400 tracking-wider font-semibold uppercase">
          NATIVE SAAS BOUNDARY PROTECTION
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1 tracking-tight">
          Zero-Boilerplate SaaS Tenant Isolation
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          Prevent critical horizontal privilege escalation data leaks. Rullst injects database-level filtering constraints implicitly with thread-local async task scopes, guaranteeing bulletproof security without repetitive manual filters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left column: Admin tenant panel switcher */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="bg-[#090d16]/80 rounded-2xl border border-gray-800 p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold font-mono text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-cyan-400" />
              SaaS Identity Provider
            </h3>

            {/* Switchers button */}
            <div className="flex flex-col space-y-3">
              {[
                { id: "tenant1", name: "Stark Industries", badge: "Tenant 1 Active" },
                { id: "tenant2", name: "Wayne Enterprises", badge: "Tenant 2 Active" },
              ].map((tenant) => {
                const isActive = selectedTenant === tenant.id;
                return (
                  <button
                    key={tenant.id}
                    onClick={() => handleTenantChange(tenant.id as "tenant1" | "tenant2")}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                      isActive
                        ? "bg-[#ea580c]/10 border-orange-500/40 shadow shadow-orange-500/5 text-white"
                        : "bg-gray-900/40 border-gray-800/80 hover:bg-gray-900/80 hover:border-gray-700 text-gray-300"
                    }`}
                    type="button"
                  >
                    <div>
                      <span className="text-xs font-semibold block">{tenant.name}</span>
                      <span className="text-[10px] font-mono text-gray-400 mt-1">{tenant.badge}</span>
                    </div>
                    {isActive ? (
                      <Unlock className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Threat simulator block */}
            <div className="pt-4 border-t border-gray-800/80">
              <button
                onClick={simulateHpeAttack}
                disabled={isHacking}
                className="w-full py-2.5 px-4 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-500/30 hover:border-red-500/50 text-red-400 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer disabled:opacity-75"
                type="button"
              >
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                <span>{isHacking ? "INJECTING EXPLOIT..." : "SIMULATE HPE ATTACK"}</span>
              </button>
            </div>
          </div>

          {/* Under-panel console block */}
          <div className="bg-gray-950/80 rounded-2xl border border-gray-900 p-5 font-mono text-[11px] leading-relaxed flex-1 flex flex-col justify-between min-h-[140px]">
            <div>
              <span className="text-[9px] font-bold text-cyan-400 block mb-2 tracking-wider">
                RULLST INSTANCE TELEMETRY
              </span>
              <p className="text-gray-400 whitespace-pre-wrap">{activeConsoleLog}</p>
            </div>
            <div className="pt-3 border-t border-gray-900/40 mt-4 flex justify-between text-[10px] text-gray-600 font-mono">
              <span>Security State: SECURE</span>
              <span>Scope ID: THREAD_TASK_8</span>
            </div>
          </div>
        </div>

        {/* Right column: Content View Dashboard (Isolated stark or wayne industries logs) */}
        <div className="lg:col-span-8 bg-[#040810]/95 rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div>
            {/* Topbar of internal tenant dashboard */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-gray-800">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-600/15 border border-orange-500/30 flex items-center justify-center text-orange-500 font-bold">
                  R
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white font-display">Isomorphic Client Workspace</h3>
                  <p className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Implicit Scope: {selectedTenant} ORM Enforce
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono bg-gray-900 text-gray-400 px-2 py-1 rounded border border-gray-800">
                ACTIVE CREDENTIAL: SECURE_SESSION_BOUND
              </span>
            </div>

            {/* Simulated Workspace panel content */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {activeTenantData.posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-xl border border-gray-800 bg-gray-950/40 flex flex-col h-full justify-between"
                  >
                    <div>
                      <h4 className="text-white text-sm font-bold font-display">{post.title}</h4>
                      <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">{post.body}</p>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 mt-4 block self-start">
                      AUDIT_HASH: ENCR_TENANT_SEC_RECORD_{post.id}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Secret Enterprise data data */}
            <div className="bg-orange-500/[0.02] border border-orange-500/10 rounded-xl p-4 flex items-start gap-4 mt-2">
              <Lock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">
                  SaaS Secret Partition (Cryptographically Encrypted)
                </span>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  {activeTenantData.secretContent}
                </p>
              </div>
            </div>
          </div>

          {/* Firewall Threat Alerts overlay */}
          <AnimatePresence>
            {attackLog && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="mt-6 p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-xs sm:text-sm text-red-400 flex items-start gap-3"
              >
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 animate-bounce text-red-500" />
                <div>
                  <strong className="block font-semibold uppercase text-[10px] tracking-wider mb-1">
                    RULLST ACTIVE CONTEXT FIREWALL
                  </strong>
                  <p className="whitespace-pre-wrap font-mono leading-relaxed text-xs">{attackLog}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
