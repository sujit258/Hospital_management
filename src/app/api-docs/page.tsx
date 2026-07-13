export default function ApiDocsPage() {
  return (
    <div className="container-page py-12 space-y-4">
      <h1 className="text-3xl font-semibold text-slate-900">API quickstart</h1>
      <p className="text-slate-700">Use REST endpoints for patients, appointments, and invoices.</p>
      <div className="card space-y-3 p-5">
        <p className="text-sm font-semibold text-slate-900">Patients</p>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`GET /api/patients
      POST /api/patients { name, email?, phone?, gender?, notes? }`}</pre>
      </div>
      <div className="card space-y-3 p-5">
        <p className="text-sm font-semibold text-slate-900">Appointments</p>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`GET /api/appointments
      POST /api/appointments { patientId, practitionerId, start, end, status? }`}</pre>
      </div>
      <div className="card space-y-3 p-5">
        <p className="text-sm font-semibold text-slate-900">Invoices</p>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`GET /api/invoices
      POST /api/invoices { patientId, encounterId?, amountDue, status?, items[] }`}</pre>
      </div>
    </div>
  );
}
