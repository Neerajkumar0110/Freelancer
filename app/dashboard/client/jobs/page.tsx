"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, DollarSign, Clock, ChevronRight,
  ChevronLeft, Sparkles, Target, Zap,
  Globe, Lock, Check, Cpu, ShieldAlert,
  BarChart3, Plus, X, Terminal
} from "lucide-react";

/* ================= TYPES & CONSTANTS ================= */

const STEPS = [
  { id: 1, title: "Identity", icon: Terminal, desc: "Directive basics" },
  { id: 2, title: "Parameters", icon: Target, desc: "Technical scope" },
  { id: 3, title: "Payload", icon: DollarSign, desc: "Budget & Release" },
];

/* ================= MAIN COMPONENT ================= */

export default function PostJobForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: ["Next.js", "TypeScript"],
    experience: "Intermediate",
    budget: 5000,
    paymentType: "Fixed price",
    priority: "Standard",
    visibility: "Public"
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return nextStep();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Directive encrypted and broadcasted.");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* HUD HEADER */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Cpu className="text-emerald-500" size={20} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">System_Protocol: 88-Beta</span>
        </div>
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Initialize_Directive</h1>
      </div>

      {/* STEPPER GRID */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="relative group">
            <div className={`p-4 rounded-2xl border transition-all duration-500 ${
              step >= s.id ? "bg-emerald-500/5 border-emerald-500/30" : "bg-black/20 border-white/5"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  step >= s.id ? "bg-emerald-500 text-black" : "bg-white/5 text-slate-600"
                }`}>
                  {step > s.id ? <Check size={16} strokeWidth={4} /> : <s.icon size={16} />}
                </div>
                <div className="hidden md:block">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? "text-white" : "text-slate-600"}`}>{s.title}</p>
                  <p className="text-[8px] font-mono text-slate-500 uppercase">{s.desc}</p>
                </div>
              </div>
            </div>
            {step === s.id && (
              <motion.div layoutId="step-glow" className="absolute inset-0 bg-emerald-500/5 blur-xl -z-10" />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative bg-[#0F1424]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div className="space-y-6">
                <div className="group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block italic">Directive_Title</label>
                  <input
                    type="text"
                    placeholder="E.G. NEURAL_NETWORK_INTEGRATION_LEAD"
                    className="w-full bg-black/40 border-b-2 border-white/5 px-0 py-4 text-2xl font-black text-white placeholder:text-slate-800 focus:border-emerald-500 outline-none transition-all uppercase tracking-tight"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Skill_Stack_Required</label>
                  <div className="flex flex-wrap gap-2 p-3 bg-black/40 border border-white/5 rounded-2xl min-h-[60px]">
                    {formData.skills.map(skill => (
                      <span key={skill} className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {skill}
                        <X size={12} className="cursor-pointer hover:text-white" onClick={() => removeSkill(skill)} />
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add Stack Node..."
                      className="bg-transparent text-[10px] font-bold text-white outline-none px-2 uppercase"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={addSkill}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">Technical_Scope_Description</label>
                <textarea
                  rows={5}
                  placeholder="INPUT_DIRECTIVE_DETAILS_HERE..."
                  className="w-full bg-black/40 border border-white/5 rounded-3xl p-6 text-sm font-medium text-slate-300 focus:border-emerald-500/50 outline-none transition-all resize-none leading-relaxed"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Priority_Level</label>
                  <div className="flex gap-2">
                    {['Standard', 'Urgent', 'Critical'].map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFormData({...formData, priority: lvl})}
                        className={`flex-1 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                          formData.priority === lvl ? "bg-emerald-500 text-black border-emerald-500" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Experience_Required</label>
                  <select
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-black text-white uppercase tracking-widest outline-none appearance-none cursor-pointer"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  >
                    <option>Entry</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-4">Payload_Budget (USD)</label>
                    <div className="relative pt-6">
                        <input
                            type="range" min="500" max="20000" step="100"
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            value={formData.budget}
                            onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                        />
                        <div className="flex justify-between mt-4 font-mono text-[10px] text-emerald-500">
                            <span>$500</span>
                            <span className="text-xl font-black text-white tracking-tighter">${formData.budget.toLocaleString()}</span>
                            <span>$20K+</span>
                        </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400">
                        <ShieldAlert size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Escrow_Protection_Active</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium uppercase italic">
                      Funds will be held in multi-sig vault and released upon milestone verification.
                    </p>
                  </div>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-3xl p-6 space-y-4">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] border-b border-white/5 pb-4">Pre-Flight_Checklist</h3>
                    <div className="space-y-3">
                        <CheckItem label="Title Complexity Verified" checked={formData.title.length > 10} />
                        <CheckItem label="Stack Nodes Configured" checked={formData.skills.length > 0} />
                        <CheckItem label="Payload Allocation Met" checked={formData.budget > 0} />
                        <CheckItem label="Security Protocols Ready" checked={true} />
                    </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAVIGATION CONTROLS */}
        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            className={`group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-white transition ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Prev_Phase
          </button>

          <button
            type="submit"
            disabled={loading}
            className="group relative overflow-hidden bg-emerald-500 text-black px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  {step === 3 ? "Initialize_Broadcast" : "Next_Phase"}
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </div>
      </form>

      <div className="mt-8 flex justify-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="flex items-center gap-2 font-mono text-[8px] text-slate-500 uppercase tracking-widest"><Lock size={10}/> AES_256_ENCRYPTED</div>
        <div className="flex items-center gap-2 font-mono text-[8px] text-slate-500 uppercase tracking-widest"><BarChart3 size={10}/> MARKET_ANALYTICS_SYNC</div>
      </div>
    </div>
  );
}

function CheckItem({ label, checked }: { label: string; checked: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
            <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? "bg-emerald-500/20 border-emerald-500 text-emerald-500" : "border-white/10"}`}>
                {checked && <Check size={10} strokeWidth={4} />}
            </div>
        </div>
    );
}