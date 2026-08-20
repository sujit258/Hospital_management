const offerings = [
  {
    title: "Panchakarma",
    body: "Detoxification programs tailored to prakriti with medical oversight.",
    duration: "7-21 days"
  },
  {
    title: "Chronic care",
    body: "Protocols for metabolic, autoimmune, and inflammatory conditions.",
    duration: "Monthly plans"
  },
  {
    title: "Lifestyle & nutrition",
    body: "Dinacharya and ritucharya guidance with habit coaching.",
    duration: "Weekly check-ins"
  },
  {
    title: "Women's health",
    body: "Cycle support, prenatal/postnatal care, and hormonal balance.",
    duration: "Custom"
  }
];

export default function ServicesPage() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Services</h1>
      <p className="mt-2 text-slate-700">Clinical Ayurveda with diagnostics, prescriptions, and follow-ups.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {offerings.map((item) => (
          <div key={item.title} className="card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold text-slate-900">{item.title}</p>
              <span className="badge">{item.duration}</span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
