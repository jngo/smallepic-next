import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Desktop from "@/components/Desktop";
import { getAllWindowPathSegments, resolveWindowPathSegments } from "@/lib/windowRoutes";

interface WindowPathPageProps {
  params: Promise<{
    windowPath: string[];
  }>;
}

export function generateStaticParams() {
  return getAllWindowPathSegments().map((windowPath) => ({ windowPath }));
}

export async function generateMetadata({ params }: WindowPathPageProps): Promise<Metadata> {
  const { windowPath } = await params;
  const route = resolveWindowPathSegments(windowPath);

  if (!route) {
    return {};
  }

  return {
    alternates: {
      canonical: route.canonicalPath,
    },
  };
}

export default async function WindowPathPage({ params }: WindowPathPageProps) {
  const { windowPath } = await params;
  const route = resolveWindowPathSegments(windowPath);

  if (!route) {
    notFound();
  }

  return <Desktop key={route.canonicalPath} initialPathSegments={route.pathSegments} />;
}
