"use client";

import { useState } from "react";
import { Building2, Mail, Lock, User, Phone, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: "",
    clinicSlug: "",
    clinicCode: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    adminPassword: "",
    clinicAddress: "",
    clinicCity: "",
    clinicState: "",
    clinicZip: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from clinic name
    if (name === "clinicName") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      setFormData(prev => ({ ...prev, clinicSlug: slug }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clinicName.trim()) newErrors.clinicName = "Clinic name is required";
    if (!formData.clinicSlug.trim()) newErrors.clinicSlug = "Clinic slug is required";
    if (!formData.clinicCode.trim()) newErrors.clinicCode = "Clinic code is required";
    if (!formData.adminName.trim()) newErrors.adminName = "Admin name is required";
    if (!formData.adminEmail.trim()) newErrors.adminEmail = "Admin email is required";
    if (!formData.adminPhone.trim()) newErrors.adminPhone = "Admin phone is required";
    if (!formData.adminPassword.trim()) newErrors.adminPassword = "Password is required";
    if (formData.adminPassword.length < 8) newErrors.adminPassword = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/clinics/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/auth/login?clinicCode=${formData.clinicCode}`);
      }, 3000);
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : "Registration failed" });
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/30 px-4">
        <div className="max-w-md w-full">
          <div className="rounded-2xl bg-white p-8 shadow-xl text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900">Clinic Created Successfully!</h2>
            <p className="mb-6 text-slate-600">
              Your clinic has been registered. Redirecting to login...
            </p>
            <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
              <p className="font-semibold">Your clinic subdomain:</p>
              <p className="text-lg font-mono">{formData.clinicSlug}.homeoclinic.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/30 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
            <Building2 size={32} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Create Your Clinic
          </h1>
          <p className="mt-2 text-slate-600">
            Set up your homeopathic clinic in minutes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Clinic Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Clinic Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Clinic Name *
                </label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  placeholder="e.g., Dr. Smith Homeo Clinic"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                {errors.clinicName && <p className="mt-1 text-sm text-rose-600">{errors.clinicName}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Clinic Slug (subdomain) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="clinicSlug"
                    value={formData.clinicSlug}
                    onChange={handleChange}
                    placeholder="dr-smith-clinic"
                    className="w-full rounded-l-lg border border-slate-300 border-r-0 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                  <div className="absolute right-0 top-0 flex h-full items-center rounded-r-lg bg-slate-100 px-4 text-sm text-slate-600 border border-l-0 border-slate-300">
                    .homeoclinic.com
                  </div>
                </div>
                {errors.clinicSlug && <p className="mt-1 text-sm text-rose-600">{errors.clinicSlug}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Clinic Code *
                </label>
                <input
                  type="text"
                  name="clinicCode"
                  value={formData.clinicCode}
                  onChange={handleChange}
                  placeholder="e.g., DSMITH"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                {errors.clinicCode && <p className="mt-1 text-sm text-rose-600">{errors.clinicCode}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="clinicPhone"
                  value={formData.adminPhone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </label>
                <input
                  type="text"
                  name="clinicAddress"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  City
                </label>
                <input
                  type="text"
                  name="clinicCity"
                  value={formData.clinicCity}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  State
                </label>
                <input
                  type="text"
                  name="clinicState"
                  value={formData.clinicState}
                  onChange={handleChange}
                  placeholder="NY"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Admin Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Admin Account</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  placeholder="Dr. John Smith"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                {errors.adminName && <p className="mt-1 text-sm text-rose-600">{errors.adminName}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  placeholder="admin@clinic.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                {errors.adminEmail && <p className="mt-1 text-sm text-rose-600">{errors.adminEmail}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="adminPhone"
                  value={formData.adminPhone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                {errors.adminPhone && <p className="mt-1 text-sm text-rose-600">{errors.adminPhone}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password *
                </label>
                <input
                  type="password"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  placeholder="Min 8 characters"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                {errors.adminPassword && <p className="mt-1 text-sm text-rose-600">{errors.adminPassword}</p>}
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-4 text-rose-700">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 rounded-xl font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Creating Clinic...
              </>
            ) : (
              <>
                <Building2 size={20} />
                Create Clinic
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600">
            Already have a clinic?{" "}
            <a href="/auth/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
