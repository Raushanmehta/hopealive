import { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogDetailSection from "@/sections/BlogDetailSection";
import siteData from "@/data/site.json";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  const posts = siteData.blog.posts;
  return posts.map((post: { href: string }) => ({
    slug: post.href.replace("/blog/", ""),
  }));
}

async function BlogArticleContent({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  return <BlogDetailSection slug={resolvedParams?.slug} />;
}

export default function BlogDetailPage({ params }: PageProps) {
  return (
    <main className="bg-[#f8f6f0]">
      <Breadcrumb pageTitle="Blog Detail" subTitle="Blog Detail" />
      <Suspense fallback={<div className="py-24 text-center text-stone-500 font-poppins">Loading article...</div>}>
        <BlogArticleContent params={params} />
      </Suspense>
    </main>
  );
}