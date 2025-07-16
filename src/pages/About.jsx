export default function About() {
  return (
    <div className="bg-white text-gray-800 px-4 py-16 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">About MyBlog</h1>
      <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        MyBlog is a platform built for writers, creators, and thinkers to share their ideas with the world.
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">📖 What is MyBlog?</h2>
          <p className="text-gray-700 leading-relaxed">
            MyBlog is your digital space to express ideas, tell stories, teach, learn, and grow. Whether you're writing
            for fun or building a personal brand, we give you the tools to get started and the freedom to grow.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">🚀 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Empower individuals to write fearlessly, share thoughtfully, and connect globally. We believe every voice
            matters and deserves a place on the internet.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">🌐 Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Simple and intuitive writing experience</li>
            <li>Fast and responsive performance</li>
            <li>Modern UI with full mobile support</li>
            <li>Free to use — no setup or hosting needed</li>
            <li>Control your content, always</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">🤝 Join Our Community</h2>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a student, writer, entrepreneur, or just someone with something to say — you belong here.
            <br />
            <span className="font-medium">Start your journey today.</span>
          </p>
        </div>
      </section>
    </div>
  );
}
