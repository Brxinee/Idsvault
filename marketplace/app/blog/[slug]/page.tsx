import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: { title: post.meta.title, description: post.meta.description, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <section style={{ background: "#14264F", padding: "3rem 0 2.5rem" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/blog" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", display: "inline-block", marginBottom: "1.25rem" }}>← All articles</Link>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.875rem,5vw,3rem)", color: "#fff", lineHeight: 1.05, marginBottom: "0.75rem" }}>
            {post.meta.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
            {new Date(post.meta.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            {" · "} IDsvault Broker Desk · Hyderabad
          </p>
        </div>
      </section>

      <article style={{ padding: "3rem 0 5rem" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose">
            <MDXRemote source={post.content} />
          </div>

          <div style={{ marginTop: "3rem", borderTop: "1px solid #E3E9F1", paddingTop: "2rem" }}>
            <p style={{ fontSize: "0.875rem", color: "#62708A", marginBottom: "1rem" }}>
              Ready to buy or sell a handle?
            </p>
            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
              <Link href="/buy-instagram-usernames" style={{ background: "#0FA968", color: "#fff", padding: "0.625rem 1.25rem", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.875rem" }}>
                Browse Listings
              </Link>
              <Link href="/how-it-works" style={{ background: "#F5F8FC", color: "#14264F", padding: "0.625rem 1.25rem", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.875rem", border: "1px solid #E3E9F1" }}>
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
