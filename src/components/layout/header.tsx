import Link from "next/link";
import { Stethoscope, Menu } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const nav = [
  { href: "/services" as const, label: "Services" },
  { href: "/doctors" as const, label: "Doctors" },
  { href: "/blog" as const, label: "Articles" }
];

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 shadow-sm backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary-700">
          <Stethoscope size={24} />
          <span>Universal HMS</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 hover:text-primary-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Link href="/dashboard" className="btn-ghost">
                Dashboard
              </Link>
              <span className="text-sm text-slate-600">{session.user?.name}</span>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-ghost">
                Sign in
              </Link>
              <Link href="/book" className="btn-primary">
                Book Appointment
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden" aria-label="Toggle menu">
          <Menu />
        </button>
      </div>
    </header>
  );
}
