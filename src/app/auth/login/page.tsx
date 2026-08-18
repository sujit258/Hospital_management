"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Stethoscope } from "lucide-react";
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
      hospitalCode: formData.get("hospitalCode"),
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
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <Stethoscope size={28} />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Sign in</h1>
          <p className="mt-1 text-sm text-slate-600">
            Universal HMS access for hospital staff and patients
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6">
          {error && (
            <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <label className="block space-y-1 text-sm">
            <span className="font-medium text-slate-700">Hospital code</span>
            <input
              name="hospitalCode"
              type="text"
              defaultValue="samarthhospital"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 lowercase focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-300"
              placeholder="samarthhospital"
            />
          </label>

          <label className="block space-y-1 text-sm">
            <span className="font-medium text-slate-700">Email</span>
            <input
              name="email"
              type="email"
              required
              autoFocus
              defaultValue="admin@samarthhospital.test"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-300"
              placeholder="you@example.com"
            />
          </label>

          <label className="block space-y-1 text-sm">
            <span className="font-medium text-slate-700">Password</span>
            <input
              name="password"
              type="password"
              required
              defaultValue="password123"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-300"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-700">Test accounts (password: <code className="text-primary-700">password123</code>):</p>
          <p>admin@samarthhospital.test — Hospital Admin</p>
          <p>reception@samarthhospital.test — Front Desk</p>
          <p>doctor@samarthhospital.test — Doctor</p>
          <p>patient@samarthhospital.test — Patient</p>
        </div>

        <p className="text-center text-sm text-slate-600">
          <Link href="/auth/patient-signup" className="text-primary-700 hover:underline">
            Activate patient account with registration number
          </Link>
        </p>

        <p className="text-center text-sm text-slate-600">
          <Link href="/" className="text-primary-700 hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
