import Link from "next/link";
import { CalendarClock, FileHeart, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";

const highlights = [
  {
    title: "Personalized Ayurveda",
    copy: "Physician-led plans that blend classical Ayurveda with modern diagnostics.",
    icon: <FileHeart className="text-primary-600" />
  },
  {
    title: "Same-day Appointments",
    copy: "Real-time slot visibility and instant confirmations via SMS/email.",
    icon: <CalendarClock className="text-primary-600" />
  },
  {
    title: "Continuity of Care",
    copy: "Track visits, prescriptions, labs, and invoices in one secure portal.",
    icon: <HeartPulse className="text-primary-600" />
  },
  {
    title: "Safe & Compliant",
    copy: "Role-based access, audit trails, and encrypted records by default.",
    icon: <ShieldCheck className="text-primary-600" />
  }
];

const services = [
  "Digestive wellness (Agni balance)",
  "Stress, sleep, and mental clarity",
  "Women's health & hormonal balance",
  "Musculoskeletal & joint care",
  "Skin, hair, and rejuvenation",
  "Metabolic health & weight reset"
];

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-white to-primary-50/40">
      <section className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <span className="badge">Ayurveda, made modern</span>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Holistic hospital care with real-time booking and patient-first workflows.
          </h1>
          <p className="text-lg text-slate-700">
            Book with specialist vaidyas, get personalized herbal plans, and keep every visit, prescription, and invoice in one portal.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/book" className="btn-primary">
              Book an appointment
            </Link>
            <Link href="/services" className="btn-ghost">
              Explore services
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Sparkles className="text-primary-600" size={18} />
            <span>ISO-grade clinic | HIPAA-inspired safeguards | Digital prescriptions</span>
          </div>
        </div>
        <div className="card p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Why families choose us</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
                <div className="mb-2 flex items-center gap-2">
                  {item.icon}
                  <p className="font-semibold text-slate-900">{item.title}</p>
                </div>
                <p className="text-sm text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid gap-6 py-12 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-semibold text-slate-900">Conditions we treat</h3>
          <p className="mt-2 text-sm text-slate-600">
            Consultations include prakriti analysis, lifestyle guidance, and lab interpretation when needed.
          </p>
        </div>
        <div className="lg:col-span-2 grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service} className="card p-4 text-slate-800">
              <p className="font-medium">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mb-16 grid gap-6 rounded-2xl bg-white p-8 shadow-sm lg:grid-cols-2">
        <div className="space-y-3">
          <p className="badge">For administrators</p>
          <h3 className="text-2xl font-semibold text-slate-900">Admin dashboard and CRM</h3>
          <p className="text-sm text-slate-700">
            Manage patient records, appointments, invoices, prescriptions, and site content. Real-time updates with role-based access for front-desk, physicians, and billing teams.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Patient 360: visits, SOAP notes, attachments, medications</li>
            <li>Billing & payments with exportable invoices and taxes</li>
            <li>Content CMS for pages, testimonials, and blog posts</li>
            <li>Appointment calendar with confirmations and reminders</li>
          </ul>
          <div className="flex gap-4 pt-2">
            <Link href="/dashboard" className="btn-primary">
              View admin demo
            </Link>
            <Link href="/api-docs" className="btn-ghost">
              API docs
            </Link>
          </div>
        </div>
        <div className="card space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Today</p>
              <p className="text-xl font-semibold text-slate-900">Appointments</p>
            </div>
            <span className="badge">Live</span>
          </div>
          <div className="space-y-3">
            {["09:00 - Dr. Meera", "11:00 - Dr. Arjun", "15:30 - Dr. Kavya"].map((slot) => (
              <div key={slot} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-800">
                <span>{slot}</span>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-primary-700">Confirmed</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
