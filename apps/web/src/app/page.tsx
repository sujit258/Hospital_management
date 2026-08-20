import Link from "next/link";
import { Building2, CalendarClock, FileText, Users, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Multi-Tenant Architecture",
    copy: "Each clinic gets its own subdomain with complete data isolation and security.",
    icon: <Building2 className="text-emerald-600" />
  },
  {
    title: "Patient Management",
    copy: "Comprehensive patient profiles with homeopathic case-taking and treatment history.",
    icon: <Users className="text-emerald-600" />
  },
  {
    title: "Appointment Scheduling",
    copy: "Real-time booking with conflict detection and automated reminders.",
    icon: <CalendarClock className="text-emerald-600" />
  },
  {
    title: "Clinical Documentation",
    copy: "SOAP notes, prescriptions with homeopathic remedies, and follow-up tracking.",
    icon: <FileText className="text-emerald-600" />
  },
  {
    title: "Role-Based Access",
    copy: "Custom roles for doctors, receptionists, and clinic administrators.",
    icon: <ShieldCheck className="text-emerald-600" />
  },
  {
    title: "Secure & Compliant",
    copy: "End-to-end encryption, audit trails, and HIPAA-inspired safeguards.",
    icon: <ShieldCheck className="text-emerald-600" />
  }
];

const benefits = [
  "Get your own clinic subdomain (yourclinic.clinik-blush.vercel.app)",
  "Complete patient and practice management",
  "Homeopathic-specific documentation tools",
  "Automated appointment reminders",
  "Prescription management with remedy database",
  "Staff management and role-based permissions"
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            <Sparkles size={16} />
            <span>Homeopathic Clinic Management SaaS</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent sm:text-6xl">
            Modern Practice Management for Homeopathic Clinics
          </h1>
          <p className="mb-10 text-xl text-slate-600">
            Launch your clinic in minutes with a complete management system. Get your own subdomain, manage patients, appointments, and prescriptions with ease.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/register" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 rounded-xl font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
            >
              Start Your Clinic
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="/features" 
              className="inline-flex items-center gap-2 border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Everything You Need to Run Your Clinic</h2>
            <p className="text-lg text-slate-600">
              A complete practice management system designed specifically for homeopathic clinics
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Why Choose Homeo Clinic?</h2>
              <p className="text-lg text-slate-600">
                Built specifically for homeopathic practitioners with features that match your workflow
              </p>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                    </div>
                    <p className="text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-xl">
              <h3 className="mb-4 text-2xl font-bold">Ready to Get Started?</h3>
              <p className="mb-6 text-emerald-100">
                Create your clinic in minutes and get your own subdomain. No credit card required for trial.
              </p>
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                Create Your Clinic
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-slate-900 p-12 text-center text-white shadow-2xl">
          <h2 className="mb-4 text-3xl font-bold">Start Managing Your Clinic Today</h2>
          <p className="mb-8 text-slate-300">
            Join hundreds of homeopathic clinics already using our platform
          </p>
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
