import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Ngo - Designer, Engineer, Researcher",
  description: "Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design.",
  keywords: ["design", "engineering", "research", "product design", "UX", "digital transformation"],
  authors: [{ name: "John Ngo" }],
  creator: "John Ngo",
  metadataBase: new URL("https://smallepic.com"),
  openGraph: {
    title: "John Ngo - Designer, Engineer, Researcher",
    description: "Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design.",
    type: "website",
    url: "https://smallepic.com",
    siteName: "John Ngo Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Ngo - Designer, Engineer, Researcher",
    description: "Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design.",
    creator: "@jngo",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👋</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
