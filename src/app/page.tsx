import type { Metadata } from "next";
import Desktop from "@/components/Desktop";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <Desktop />;
}
