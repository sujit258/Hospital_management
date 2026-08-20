"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientSignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      hospitalCode: formData.get("hospitalCode"),
      registrationNumber: formData.get("registrationNumber"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password")
    };

    const response = await fetch("/api/auth/patient-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data?.error ?? "Unable to complete signup");
      return;
    }

    router.push("/auth/login");
  }

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-lg card p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Patient account activation</h1>
          <p className="text-sm text-slate-600">Use the registration number issued by reception to activate your portal account.</p>
        </div>

        {error ? <p className="rounded bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="hospitalCode" placeholder="Hospital code (e.g. samarthhospital)" className="w-full rounded border px-3 py-2" required />
          <input name="registrationNumber" placeholder="Registration number" className="w-full rounded border px-3 py-2" required />
          <input name="email" type="email" placeholder="Email" className="w-full rounded border px-3 py-2" required />
          <input name="phone" placeholder="Phone (optional)" className="w-full rounded border px-3 py-2" />
          <input name="password" type="password" placeholder="Create password" className="w-full rounded border px-3 py-2" required minLength={8} />
          <button className="btn-primary w-full" disabled={loading} type="submit">
            {loading ? "Activating..." : "Activate account"}
          </button>
        </form>

        <p className="text-sm text-slate-600">
          Already activated? <Link href="/auth/login" className="text-primary-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
