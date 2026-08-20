import Link from "next/link";
import { Building2, CalendarClock, FileText, Users, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Zap, Lock, Globe, Heart, Activity, Menu, X } from "lucide-react";

const features = [
  {
    title: "Multi-Tenant Architecture",
    copy: "Each clinic gets its own subdomain with complete data isolation and security.",
    icon: <Globe className="text-emerald-600" />
  },
  {
    title: "Patient Management",
    copy: "Comprehensive patient profiles with homeopathic case-taking and treatment history.",
    icon: <Users className="text-emerald-600" />
  },
  {
    title: "Smart Scheduling",
    copy: "AI-powered appointment booking with conflict detection and automated reminders.",
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
    title: "Enterprise Security",
    copy: "End-to-end encryption, audit trails, and HIPAA-inspired safeguards.",
    icon: <Lock className="text-emerald-600" />
  }
];

const stats = [
  { value: "500+", label: "Clinics Onboarded" },
  { value: "50K+", label: "Patients Managed" },
  { value: "100K+", label: "Appointments Booked" },
  { value: "99.9%", label: "Uptime SLA" }
];

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Homeopathic Practitioner",
    clinic: "Natural Health Clinic",
    content: "This platform transformed how I manage my practice. The homeopathic-specific features are exactly what I needed."
  },
  {
    name: "Dr. Michael Chen",
    role: "Clinic Director",
    clinic: "Holistic Wellness Center",
    content: "The multi-tenant architecture gave us our own branded subdomain while keeping everything secure and organized."
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <Heart size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Homeo Clinic
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-600 hover:text-emerald-600 transition-colors">Features</Link>
              <Link href="#benefits" className="text-slate-600 hover:text-emerald-600 transition-colors">Benefits</Link>
              <Link href="#testimonials" className="text-slate-600 hover:text-emerald-600 transition-colors">Testimonials</Link>
              <Link href="/auth/login" className="text-slate-600 hover:text-emerald-600 transition-colors">Login</Link>
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 rounded-lg font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
            <button className="md:hidden p-2">
              <Menu size={24} className="text-slate-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-50"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white border border-emerald-200 px-6 py-3 text-sm font-medium text-emerald-700 shadow-sm">
              <Sparkles size={16} />
              <span>Trusted by 500+ homeopathic clinics worldwide</span>
            </div>
            
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight">
              Modern Practice Management
              <span className="block mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                for Homeopathic Clinics
              </span>
            </h1>
            
            <p className="mb-10 text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Launch your clinic in minutes with a complete management system. Get your own subdomain, manage patients, appointments, and prescriptions with ease.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 rounded-xl font-semibold text-white shadow-xl shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Zap size={20} />
                Start Your Clinic Free
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="#features" 
                className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
              >
                See How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 mb-4">
                <Activity size={16} />
                <span>Powerful Features</span>
              </div>
              <h2 className="mb-4 text-4xl md:text-5xl font-bold text-slate-900">
                Everything You Need to Run Your Clinic
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                A complete practice management system designed specifically for homeopathic clinics
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="group rounded-3xl bg-white p-8 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl group-hover:shadow-2xl transition-shadow">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 mb-4">
                    <Heart size={16} />
                    <span>Why Choose Us</span>
                  </div>
                  <h2 className="mb-4 text-4xl md:text-5xl font-bold text-slate-900">
                    Built for Homeopathic Practitioners
                  </h2>
                  <p className="text-xl text-slate-600">
                    Every feature designed with your specific workflow in mind
                  </p>
                </div>
                
                <div className="space-y-6">
                  {[
                    "Get your own clinic subdomain (yourclinic.clinik-blush.vercel.app)",
                    "Complete patient and practice management",
                    "Homeopathic-specific documentation tools",
                    "Automated appointment reminders",
                    "Prescription management with remedy database",
                    "Staff management and role-based permissions"
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="text-slate-700 font-medium pt-1">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-10 text-white shadow-2xl">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                      <Sparkles size={16} />
                      <span>Start Free Trial</span>
                    </div>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold">Ready to Transform Your Practice?</h3>
                  <p className="mb-8 text-emerald-100 text-lg leading-relaxed">
                    Create your clinic in minutes and get your own subdomain. No credit card required. Start your 14-day free trial today.
                  </p>
                  <Link 
                    href="/register" 
                    className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-xl font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors shadow-xl"
                  >
                    Create Your Clinic Now
                    <ArrowRight size={20} />
                  </Link>
                  <p className="mt-6 text-sm text-emerald-200">
                    ✓ No credit card required &nbsp; ✓ 14-day free trial &nbsp; ✓ Cancel anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 mb-4">
                <Sparkles size={16} />
                <span>Success Stories</span>
              </div>
              <h2 className="mb-4 text-4xl md:text-5xl font-bold text-slate-900">
                Loved by Homeopathic Practitioners
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                See what clinic owners are saying about their experience
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100">
                  <div className="mb-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <p className="text-lg text-slate-700 mb-6 leading-relaxed italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-600">{testimonial.role}, {testimonial.clinic}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-6 py-3 text-sm font-medium text-emerald-300 mb-8 backdrop-blur-sm border border-emerald-500/30">
              <Zap size={16} />
              <span>Limited Time Offer</span>
            </div>
            
            <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Start Managing Your Clinic Today
            </h2>
            <p className="mb-10 text-xl text-slate-300 max-w-2xl mx-auto">
              Join hundreds of homeopathic clinics already using our platform. Start your free trial now.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-10 py-5 rounded-xl font-semibold text-white shadow-2xl shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="#features" 
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 px-10 py-5 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <Heart size={16} />
              </div>
              <span className="text-lg font-bold text-white">Homeo Clinic</span>
            </div>
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Homeo Clinic. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="#" className="hover:text-emerald-400 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
