export default function BookPage() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Book an appointment</h1>
      <p className="mt-2 text-slate-700">Share your concern and pick a slot. Our team will confirm in real time.</p>
      <form className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="text-slate-700">Full name</span>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="name" placeholder="Riya Sharma" />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-700">Email</span>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="email" placeholder="you@example.com" />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-700">Phone</span>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="phone" placeholder="+91" />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-700">Concern</span>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="concern" placeholder="Digestive discomfort" />
        </label>
        <label className="space-y-1 text-sm md:col-span-2">
          <span className="text-slate-700">Notes</span>
          <textarea className="w-full rounded-lg border border-slate-300 px-3 py-2" rows={3} placeholder="Share symptoms, lab reports, preferences" />
        </label>
        <button className="btn-primary md:col-span-2" type="button">
          Submit request
        </button>
      </form>
    </div>
  );
}
