import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DesktopApp from "@/components/DesktopApp";
import { getOpenWindowIdsForSegments } from "@/lib/window-routes";

interface CanonicalPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: CanonicalPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    alternates: {
      canonical: `/${slug.join("/")}`,
    },
  };
}

export default async function CanonicalPage({ params }: CanonicalPageProps) {
  const { slug } = await params;
  const openWindowIds = getOpenWindowIdsForSegments(slug);

  if (!openWindowIds) {
    notFound();
  }

  const targetWindowId = openWindowIds[openWindowIds.length - 1];

  return <DesktopApp initialOpenWindows={targetWindowId ? [targetWindowId] : []} />;
}
