"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Stethoscope, Mail, Lock, Building2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      clinicCode: formData.get("clinicCode"),
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 mb-4">
            <Stethoscope size={32} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Homeo Clinic
          </h1>
          <p className="mt-2 text-slate-600">
            Sign in to access your clinic dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 space-y-6 border border-slate-100">
          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Building2 size={16} className="text-slate-400" />
                Clinic Code
              </label>
              <input
                name="clinicCode"
                type="text"
                defaultValue="samarthhospital"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm lowercase focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 bg-slate-50 focus:bg-white"
                placeholder="samarthhospital"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Mail size={16} className="text-slate-400" />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                autoFocus
                defaultValue="admin@samarthhospital.test"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 bg-slate-50 focus:bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Lock size={16} className="text-slate-400" />
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                defaultValue="password123"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 bg-slate-50 focus:bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200 shadow-lgshadow-emerald-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Test Accounts */}
        <div className="mt-6 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Test Accounts (password: <code className="text-emerald-600 font-mono">password123</code>)
          </p>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>admin@samarthhospital.test — Clinic Admin</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <span>reception@samarthhospital.test — Receptionist</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              <span>doctor@samarthhospital.test — Doctor</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>patient@samarthhospital.test — Patient</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm text-slate-600">
            <Link href="/auth/patient-signup" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors">
              Activate patient account with registration number →
            </Link>
          </p>
          <p className="text-sm text-slate-600">
            <Link href="/" className="text-slate-500 hover:text-slate-700 transition-colors">
              ← Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
