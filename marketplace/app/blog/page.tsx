import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Instagram Handle Tips, Valuation & Safety Guides",
  description: "Expert guides on buying and selling Instagram usernames. Handle valuation, transfer safety, scam red flags, and more from IDsvault.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <section style={{ background: "#14264F", padding: "3rem 0 2.5rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem,6vw,3.25rem)", color: "#fff", marginBottom: "0.75rem" }}>Blog</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "42rem", lineHeight: 1.6 }}>
            Guides on valuing, buying, and safely transferring Instagram usernames — from the broker.
          </p>
        </div>
      </section>

      <section style={{ padding: "3rem 0 5rem" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article
                  style={{
                    background: "#F5F8FC",
                    border: "1px solid #E3E9F1",
                    borderRadius: "0.875rem",
                    padding: "1.5rem",
                    height: "100%",
                    transition: "box-shadow 0.15s, border-color 0.15s",
                  }}
                  className="hover:shadow-md hover:border-[#0FA968]/30"
                >
                  <p style={{ fontSize: "0.75rem", color: "#62708A", marginBottom: "0.625rem" }}>
                    {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.375rem", color: "#14264F", lineHeight: 1.15, marginBottom: "0.625rem" }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "#62708A", lineHeight: 1.55 }}>{post.description}</p>
                  <p style={{ marginTop: "1rem", fontSize: "0.8125rem", fontWeight: 600, color: "#0FA968" }}>Read more →</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
