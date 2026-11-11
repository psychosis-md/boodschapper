import type { Metadata, Viewport } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s · Boodschapper",
    default: "Boodschapper",
  },
  description:
    "Compare grocery prices across stores and shop smarter on a student budget.",
  applicationName: "Boodschapper",
};

// Never set maximumScale or userScalable: pinch zoom must keep working
// (accessibility.md, "Text size and zoom").
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffbf6" },
    { media: "(prefers-color-scheme: dark)", color: "#17100c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
        >
          Skip to main content
        </a>

        <header className="border-b">
          <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-4">
            <Link
              href="/"
              className="-mx-2 flex min-h-11 items-center rounded-lg px-2 text-lg font-bold tracking-tight"
            >
              Boodschapper
            </Link>
            {/*
              Navigation goes here once the team has fixed the top-level labels
              from the card sort (requirements.md, "Information architecture"):
              a bottom tab bar on phones, the same items up here on desktop.
            */}
          </div>
        </header>

        <main
          id="main"
          tabIndex={-1}
          className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 outline-none md:py-10"
        >
          {children}
        </main>

        <footer className="border-t">
          <p className="mx-auto w-full max-w-5xl px-4 py-4 text-sm text-muted-foreground">
            Prototype for a TU Delft course project. Stores, prices and bonuses
            shown here are demo data, not real store prices.
          </p>
        </footer>
      </body>
    </html>
  );
}
