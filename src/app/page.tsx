import type { Metadata } from "next";
import DesktopApp from "@/components/DesktopApp";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <DesktopApp />;
}
