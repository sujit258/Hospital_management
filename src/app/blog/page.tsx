const posts = [
  {
    title: "Ayurvedic routines for metabolic health",
    excerpt: "Daily practices to stabilize blood sugar, improve digestion, and sustain energy.",
    readTime: "6 min"
  },
  {
    title: "Sleep, stress, and the gut",
    excerpt: "How circadian alignment and herbs like ashwagandha support the gut-brain axis.",
    readTime: "5 min"
  },
  {
    title: "Safe detox: Panchakarma principles",
    excerpt: "What to expect in a physician-led detox and who should avoid it.",
    readTime: "7 min"
  }
];

export default function BlogPage() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Insights & Articles</h1>
      <p className="mt-2 text-slate-700">SEO-ready content types support structured data for better visibility.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title} className="card p-5">
            <p className="text-xl font-semibold text-slate-900">{post.title}</p>
            <p className="mt-2 text-sm text-slate-700">{post.excerpt}</p>
            <p className="mt-3 text-xs text-slate-500">{post.readTime} read</p>
          </article>
        ))}
      </div>
    </div>
  );
}
