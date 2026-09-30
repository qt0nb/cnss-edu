import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Geist, Cairo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/platform/theme-provider";
import PwaRegister from "@/components/platform/PwaRegister";
import { LangProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "CNSS-edu | Computer Networks & Security Sciences — منصة علوم الشبكات والأمن السيبراني",
  description:
    "منصة تعليمية شاملة ثنائية اللغة لعلوم الشبكات: ١٠٠ درس دقيق، ١٠٦٠ أداة، ٢٠٠ فكرة مشروع مربح، اختبارات ومراجعة ذكية ومختبر تفاعلي بالذكاء الاصطناعي — تعمل دون اتصال.",
  applicationName: "CNSS-edu",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CNSS-edu",
  },
  formatDetection: { telephone: false },
  keywords: [
    "شبكات",
    "networking",
    "CCNA",
    "OSI",
    "TCP/IP",
    "subnetting",
    "أمن الشبكات",
    "network tools",
  ],
  icons: {
    icon: [
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "CNSS-edu | علوم الشبكات والأمن السيبراني",
    description:
      "Master networking science: 100 lessons, 1060 tools, 200 monetizable ideas, quizzes & interactive lab — fully offline-capable PWA.",
    siteName: "CNSS-edu",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f0d" },
    { media: "(prefers-color-scheme: light)", color: "#059669" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the language cookie server-side so SSR HTML, <html> attrs and the
  // first client render all agree — no hydration mismatch, no AR flash for EN users.
  const cookieStore = await cookies();
  const savedLang = cookieStore.get("nm-lang")?.value;
  const initialLang = savedLang === "en" ? "en" : "ar";

  return (
    <html lang={initialLang} dir={initialLang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${cairo.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LangProvider initialLang={initialLang}>
            {children}
            <PwaRegister />
            <Toaster />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
