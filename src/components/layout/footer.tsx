import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-primary-700">Universal HMS Platform</p>
          <p className="text-sm text-slate-600">Unified digital workflows for hospitals, clinics, care teams, and patients.</p>
        </div>
        <div className="flex gap-4 text-sm text-slate-600">
          <Link href="/privacy" className="hover:text-primary-700">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary-700">
            Terms
          </Link>
          <Link href="/dashboard" className="hover:text-primary-700">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
