const doctors = [
  {
    name: "Dr. Meera Nair",
    specialty: "Digestive health, women's health",
    bio: "MD (Ayurveda) with 12+ years blending classical chikitsa and lab insights."
  },
  {
    name: "Dr. Arjun Rao",
    specialty: "Musculoskeletal, sports recovery",
    bio: "Focus on joint preservation, marma, and rehab-friendly plans."
  },
  {
    name: "Dr. Kavya Menon",
    specialty: "Skin, hair, rejuvenation",
    bio: "Holistic dermatology combining lepa, nutrition, and stress care."
  }
];

export default function DoctorsPage() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Doctors & Vaidyas</h1>
      <p className="mt-2 text-slate-700">Experienced clinicians, evidence-informed protocols, compassionate care.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {doctors.map((doc) => (
          <div key={doc.name} className="card p-5">
            <p className="text-xl font-semibold text-slate-900">{doc.name}</p>
            <p className="text-sm text-primary-700">{doc.specialty}</p>
            <p className="mt-2 text-sm text-slate-700">{doc.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
