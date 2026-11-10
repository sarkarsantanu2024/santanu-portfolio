import { notFound } from "next/navigation";
import caseStudies from "@/data/caseStudies.json";
import siteData from "@/data/siteData.json";
import CaseStudyArticle from "@/components/CaseStudyArticle.jsx";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.items.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }) {
  const study = caseStudies.items.find((s) => s.slug === params.slug);
  if (!study) return {};
  const title = `${study.title} — case study | Santanu Sarkar`;
  return {
    title,
    description: study.summary,
    openGraph: { type: "article", title, description: study.summary },
    twitter: { card: "summary", title, description: study.summary },
  };
}

export default function CaseStudyPage({ params }) {
  const study = caseStudies.items.find((s) => s.slug === params.slug);
  if (!study) notFound();

  return (
    <CaseStudyArticle
      study={study}
      roleStatement={caseStudies.roleStatement}
      all={caseStudies.items}
      footer={siteData.footer}
    />
  );
}
