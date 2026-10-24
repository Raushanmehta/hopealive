import Breadcrumb from "@/components/common/Breadcrumb";
import ProjectDetailSection from "@/sections/ProjectDetailSection";
import siteData from "@/data/site.json";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

function getProjectBySlug(slug?: string) {
  const projects =
    ((siteData.projects as any)?.projectsList ||
      (siteData.projects as any)?.items ||
      []) as any[];
  const normalizedId = (slug || "").toLowerCase().trim();
  return (
    projects.find((p) => {
      const pId = (p.id || "").toLowerCase();
      const pHref = (p.href || "").toLowerCase();
      return (
        pId === normalizedId ||
        pId === `project-${normalizedId}` ||
        pId.replace("project-", "") === normalizedId ||
        pHref.endsWith(`/${normalizedId}`) ||
        pHref.endsWith(`/${normalizedId.replace("project-", "")}`)
      );
    }) || projects[0]
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams?.slug);
  return {
    title: `${project?.subtitle || project?.title || "Project Detail"} | HopeAlive Foundation`,
    description:
      project?.description ||
      "Explore HopeAlive Foundation humanitarian project initiatives.",
  };
}

export async function generateStaticParams() {
  const projects =
    (siteData.projects as any).projectsList ||
    (siteData.projects as any).items ||
    [];
  const slugs: { slug: string }[] = [];
  projects.forEach((p: any) => {
    const slug = p.href.replace("/project/", "").replace("/projects/", "").trim();
    if (slug) slugs.push({ slug });
    if (p.id) {
      slugs.push({ slug: p.id });
      slugs.push({ slug: p.id.replace("project-", "") });
    }
  });
  return slugs;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams?.slug);

  return (
    <main className="bg-[#f8f6f0]">
      <Breadcrumb
        pageTitle={project?.title || "Project Detail"}
        subTitle={project?.category || "Projects"}
      />
      <ProjectDetailSection projectId={resolvedParams?.slug} data={project} />
    </main>
  );
}