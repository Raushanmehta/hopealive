import { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogDetailSection from "@/sections/BlogDetailSection";
import { site } from "@/data";
import { BlogPostItem } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

function getPostBySlug(slug?: string): BlogPostItem | undefined {
  const posts = (((site.blog as any)?.blogPosts || []) as BlogPostItem[]);
  const normalizedSlug = (slug || "").toLowerCase().trim();
  return (
    posts.find((p) => {
      const pId = (p.id || "").toLowerCase();
      const pHref = (p.href || "").toLowerCase();
      return (
        pId === normalizedSlug ||
        pHref.endsWith(`/${normalizedSlug}`) ||
        pHref.replace("/blog/", "") === normalizedSlug
      );
    }) || posts[0]
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const post = getPostBySlug(resolvedParams?.slug);
  return {
    title: `${post?.title || "Blog Story"} | HopeAlive Foundation`,
    description:
      post?.excerpt ||
      "HopeAlive Foundation field dispatches and human interest stories.",
  };
}

export async function generateStaticParams() {
  const posts = (site.blog as any).blogPosts || [];
  return posts.map((post: { href: string; id?: string }) => ({
    slug: post.href ? post.href.replace("/blog/", "") : post.id,
  }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const post = getPostBySlug(resolvedParams?.slug);

  return (
    <main className="bg-[#f8f6f0]">
      <Breadcrumb
        pageTitle={post?.category || "Blog Detail"}
        subTitle="Field Stories"
      />
      <Suspense
        fallback={
          <div className="py-24 text-center text-stone-500 font-poppins">
            Loading article...
          </div>
        }
      >
        <BlogDetailSection slug={resolvedParams?.slug} data={post} />
      </Suspense>
    </main>
  );
}