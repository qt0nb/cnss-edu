import type { Metadata } from "next";
import { Geist, Cairo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/platform/theme-provider";

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
  title: "إتقان الشبكات | NetMastery — منصة تعلم علوم الشبكات",
  description:
    "منصة تعليمية شاملة ثنائية اللغة لعلوم الشبكات: ١٠٠ درس دقيق، ٥٠٠ أداة، ٢٠٠ فكرة مشروع مربح، اختبارات ومراجعة ذكية ومختبر تفاعلي.",
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
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "إتقان الشبكات | NetMastery",
    description:
      "Master networking science: 100 lessons, 500 tools, 200 monetizable ideas, quizzes & interactive lab.",
    siteName: "NetMastery",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${cairo.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
