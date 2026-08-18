import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Universal HMS | Multi-Tenant Hospital Platform",
  description: "Hospital website + HMS with appointments, EMR workflows, role-based access, billing, and patient portal.",
  metadataBase: new URL("https://example-hospital.local"),
  openGraph: {
    title: "Universal HMS",
    description: "Multi-tenant hospital management system with patient and admin portals.",
    url: "https://example-hospital.local",
    siteName: "Universal HMS",
    locale: "en_US",
    type: "website"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
